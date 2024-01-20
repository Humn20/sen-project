from . import tcp_client
from . import measure_tcp
from . import measure_dns
from . import find_local_resolver
import matplotlib.pyplot as plt

'''
Script for measuring CDN performance on different DNS resolver
'''
def dns_resolver_measure():

    # Start of the script

    # Constant
    SPACE = '          '
    DUPLICATE_TRIAL = 5
    CDNS = ['akamai', 'cloudflare', 'edgecast', 'fastly']

    input_resolvers: list
    input_domains: list
    customized_resolvers = []
    customized_domains = []
    resolvers = ['local_resolver', '8.8.8.8', '1.1.1.1', '208.67.222.222', '9.9.9.9']
    domains = {}
    transfer_allowed = True
    cdn_map = {}
    cdn_map_tcp_delay_count = {}
    cdn_map_tcp_delay = {}
    progress = 0

    print('Please carefully read the READ ME file before using the script!\n')

    domain_extra_has = input(
        'Do you have extra domains that you would like to test besides our standard test samples[y/n]:\n')

    if domain_extra_has == 'YES' or domain_extra_has == 'y' or domain_extra_has == 'yes' or domain_extra_has == 'Y':
        domain_finish = input('Have you added all desired domains for testing[y/n]: \n')

        if not (domain_finish == 'YES' or domain_finish == 'y' or domain_finish == 'yes' or domain_finish == 'Y'):
            exit('Please add all desired domains first.')

        try:
            with open('domains.txt') as f:
                customized_domains = f.read().splitlines()
        except:
            raise Exception(
                'Please change filename or file structure for domains.txt according to README.')

    resolver_extra_has = input(
        '\nDo you have extra resolvers that you would like to test besides our standard test samples[y/n]:\n')

    if resolver_extra_has == 'YES' or resolver_extra_has == 'y' or resolver_extra_has == 'yes' or resolver_extra_has == 'Y':
        resolver_finish = input('Have you added all desired resolvers for testing[y/n]: \n')

        if not (
                resolver_finish == 'YES' or resolver_finish == 'y' or resolver_finish == 'yes' or resolver_finish == 'Y'):
            exit('Please add all desired resolvers first.')

        try:
            with open('resolvers.txt') as f:
                customized_resolvers = f.read().splitlines()
        except:
            raise Exception(
                'Please change filename or file structure for resolver.txt according to README.')

    transfer_agreement = input('\nDo you agree to share the result of the measurement shared with us[y/n]: \n')

    if not (
            transfer_agreement == 'YES' or transfer_agreement == 'y' or transfer_agreement == 'yes' or transfer_agreement == 'Y'):
        print('The result will not be shared.')
        transfer_allowed = False

    print('\nWelcome to DNS Measurement script, the script has started running...')

    for cus_resolver in customized_resolvers:
        if cus_resolver != '' and cus_resolver != '\n':
            resolvers.append(cus_resolver)

    input_domains = tcp_client.get_config()
    cdn_index_count = 0

    for cus_domain in customized_domains:
        if cus_domain != '' and cus_domain != '\n':
            input_domains.append(cus_domain)

    # domains: [[domain1: [resolver1: [ip], [dns_delay], [tcp_delay], [resolver used]]], ], index inside domains is resolver
    for domain in input_domains:
        if domain != '':
            domains[domain] = [[], [], [], []]

            if cdn_index_count < 10:
                cdn_map[domain] = CDNS[0]
            elif cdn_index_count < 15:
                cdn_map[domain] = CDNS[1]
            elif cdn_index_count < 20:
                cdn_map[domain] = CDNS[2]
            elif cdn_index_count < 25:
                cdn_map[domain] = CDNS[3]
            else:
                cdn_map[domain] = domain

            cdn_index_count += 1

    # Init the cdn maps for each CDN based on domains we have
    for domain in cdn_map.keys():
        cdn_map_tcp_delay[cdn_map[domain]] = {}
        cdn_map_tcp_delay_count[cdn_map[domain]] = {}

        for resolver in resolvers:
            cdn_map_tcp_delay[cdn_map[domain]][resolver] = 0
            cdn_map_tcp_delay_count[cdn_map[domain]][resolver] = 0

    # Total measurements need to do
    total = len(domains.keys())

    '''
    Query DNS and Measure TCP connection for each domain name using all resolvers
    '''
    for domain in domains.keys():
        for resolver in resolvers:
            # DNS delay measurement
            ip_addresses = set()
            cur_dns_delay = []

            # Cached DNS result first
            used_resolver, dns_delay_pre, ip_addresses = measure_dns.get_delay_respond(domain, resolver, ip_addresses)

            if used_resolver == 'undefined':
                domains[domain][3].append('undefined')
                progress += 1
                continue

            # Do five measurement and take avg for DNS delay
            for i in range(DUPLICATE_TRIAL):
                used_resolver_r, dns_delay_r, ip_r = measure_dns.get_delay_respond(domain, resolver, ip_addresses)
                cur_dns_delay.append(dns_delay_r)

            # Get median of five queries
            sorted_dns_delay = sorted(cur_dns_delay)
            domains[domain][1].append(sorted_dns_delay[int(len(sorted_dns_delay) / 2)])
            domains[domain][0].append(ip_addresses)
            domains[domain][3].append(used_resolver)

            # TCP delay measurement
            cur_tcp_delay = []
            cum_tcp_delay = 0

            # Do five measurement and take avg for TCP delay for each ip addresses
            for ip_address in ip_addresses:
                for i in range(DUPLICATE_TRIAL):
                    tcp_delay_r = measure_tcp.connect(domain, ip_address)
                    cur_tcp_delay.append(tcp_delay_r)

                cur_tcp_delay = sorted(cur_tcp_delay)
                cum_tcp_delay += cur_tcp_delay[int(len(cur_tcp_delay) / 2)]

            domains[domain][2].append(cum_tcp_delay / len(ip_addresses))

        progress += 1
        print('Current progress:', progress, '/', total, 'domains')

    # Output report file
    output_file = open("output.txt", "a+")

    # This will write the local resolver address to the output file
    local_resolver_address = find_local_resolver.find_local_resolver()
    output_file.write(local_resolver_address)
    output_file.write('\nresolver' + SPACE + 'DNS_delay' + SPACE + 'DNS_returned_IP' + SPACE + 'TCP_handshake_delay\n')

    # Generate Report
    for domain in domains.keys():
        output_file.write('%' + domain + '-' + cdn_map[domain] + '\n')

        for resolver_index in range(len(resolvers)):
            used_resolver = domains[domain][3][resolver_index]

            if used_resolver == 'undefined':
                output_file.write(resolvers[resolver_index] + 'cannot resolve this domain name')
                output_file.flush()
                continue

            output_file.write(used_resolver + SPACE)

            cdn_map_tcp_delay[cdn_map[domain]][used_resolver] += domains[domain][2][resolver_index]
            cdn_map_tcp_delay_count[cdn_map[domain]][used_resolver] += 1

            output_file.write(
                str(domains[domain][1][resolver_index]) + SPACE + str(domains[domain][0][resolver_index]) + SPACE +
                str(domains[domain][2][resolver_index]))
            output_file.write('\n')
            output_file.flush()

    if transfer_allowed:
        tcp_client.send_report()

    # Calculate the average delay for each CDN by total_delays_of_domains_in_that_CDN / number_of_domains_in_that_CDN
    for cdn in cdn_map_tcp_delay.keys():
        for resolver in resolvers:
            if cdn == CDNS[0]:
                cdn_map_tcp_delay[cdn][resolver] = cdn_map_tcp_delay[cdn][resolver] / cdn_map_tcp_delay_count[cdn][
                    resolver]
            elif cdn == CDNS[1]:
                cdn_map_tcp_delay[cdn][resolver] = cdn_map_tcp_delay[cdn][resolver] / cdn_map_tcp_delay_count[cdn][
                    resolver]
            elif cdn == CDNS[2]:
                cdn_map_tcp_delay[cdn][resolver] = cdn_map_tcp_delay[cdn][resolver] / cdn_map_tcp_delay_count[cdn][
                    resolver]
            elif cdn == CDNS[3]:
                cdn_map_tcp_delay[cdn][resolver] = cdn_map_tcp_delay[cdn][resolver] / cdn_map_tcp_delay_count[cdn][
                    resolver]

    print("\n------------ OUTPUT ----------------\n")

    # Recommend best resolver for each CDN
    for cdn in cdn_map_tcp_delay.keys():
        picked_resolver = pick_resolver(cdn_map_tcp_delay[cdn])
        print('For', cdn, 'the recommend resolver is: ', picked_resolver)
        output_file.write('\nFor ' + cdn + 'we recommend resolver: ' + picked_resolver)
        output_file.flush()

    output_file.close()

    # Plot the graph based on local resolver increasing order
    cdn_map_tcp_delay_sorted = sorted(cdn_map_tcp_delay.items(), key=lambda k: k[1]['local_resolver'])

    x = []
    colors = ['b', 'g', 'r', 'c', 'm', 'y', 'k']
    color_index = 0

    for cdn_delay in cdn_map_tcp_delay_sorted:
        x.append(cdn_delay[0])

    for resolver in resolvers:
        y_sub = []

        for cdn_index in range(len(cdn_map_tcp_delay_sorted)):
            y_sub.append(cdn_map_tcp_delay_sorted[cdn_index][1][resolver])

        plt.plot(x, y_sub, 's-', color=colors[color_index % 7], label=resolver)
        color_index += 1

    plt.xlabel('CDN')
    plt.ylabel('TCP Connection Delay')
    plt.legend(loc='best')
    plt.title('TCP Handshake Delay')
    plt.show()


# Pick the resolver for display order
def pick_resolver(delay_map: dict) -> str:
    delay_map_sorted = sorted(delay_map.items(), key=lambda k: k[1])
    picked_resolver = delay_map_sorted[0][0]
    return picked_resolver


def execute():
    dns_resolver_measure()