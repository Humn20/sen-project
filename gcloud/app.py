import dns
import dns.resolver
import time
from flask import Flask, request, jsonify
import datetime
from flask_cors import CORS, cross_origin

'''
This file find the ip address and DNS delay of queries of the url using different DNS resolver.
'''
global_map = {}
index = 0
temp_map = {}
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
def get_delay_respond(domain_url: str, resolver: str):
    dns_resolver = create_resolver(resolver)

    try:
        stime = time.perf_counter()
        result = dns_resolver.resolve(domain_url, 'A')
        etime = time.perf_counter()
        delay = (etime - stime) * 1000
    except:
        return -1

    return delay


resolvers = ['8.8.8.8', '1.1.1.1', '208.67.222.222', '9.9.9.9']
CDNS = ['google', 'cloudflare', 'opendns', 'quad9']
domains = ['google.com', 'apple.com', 'adobe.com']

@app.route('/GET', methods=['GET'])
@cross_origin()
def single_get():
    global temp_map
    global global_map
    local_map = {}
    for s, p in zip(resolvers, CDNS):
        local_map[p] = {}
        for g in domains:
            x = get_delay_respond(g, s)
            local_map[p][g] = x

    temp_map = local_map
    index = datetime.datetime.now()
    global_map[str(index)] = temp_map
    return jsonify(temp_map)

@app.route('/GETHISTORY', methods=['GET'])
@cross_origin()
def all_get():
    return jsonify(global_map)

if __name__ == '__main__':
    app.run(debug=False, port=18292, host='0.0.0.0')






