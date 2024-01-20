import dns
import dns.resolver
import time

'''
This file find the ip address and DNS delay of queries of the url using different DNS resolver.
'''

# In the case the DNS resolver not working, that specific server will be skipped
used_DNS: str


# Query the specific resolver
def create_resolver(nameserve: str) -> dns.resolver.Resolver:
    global used_DNS
    my_resolver = dns.resolver.Resolver()

    if nameserve == 'local_resolver':
        # Default server should be local resolver
        used_DNS = 'local_resolver'
    else:
        try:
            my_resolver.nameservers = [nameserve]
            used_DNS = nameserve
        except:
            used_DNS = 'undefined'
            print(nameserve, ' is not a correct IP address')
            exit()

    return my_resolver


# Measure the delay and query the ip address
def get_delay_respond(domain_url: str, resolver: str, ip_addresses: set) -> (str, float, str):
    global used_DNS
    dns_resolver = create_resolver(resolver)

    try:
        stime = time.perf_counter()
        result = dns_resolver.resolve(domain_url, 'A')
        etime = time.perf_counter()
        delay = (etime - stime) * 1000
    except:
        used_DNS = 'undefined'
        print('Cannot get dns record using', resolver, 'for ip address', domain_url)
        return used_DNS, 0, ''

    for ipval in result:
        ip_addresses.add(ipval.to_text())

    return used_DNS, delay, ip_addresses

