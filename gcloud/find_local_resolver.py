import os


# Find the 'real' IP address of the local resolver
# check if the local resolver is using other company's resolver service
def find_local_resolver():
    command = 'dig TXT +short whoami.ds.akahelp.net'
    local_resolver_address = os.popen(command).read()
    return local_resolver_address
