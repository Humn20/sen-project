import os


# find TCP connection delay in ms
def connect(remote_hostname: str, remote_ip: str) -> float:
    command = 'curl -H "Host: {}" {} -s -o output -w \'%{}\''
    command = command.format(remote_hostname, remote_ip, '{time_connect}')
    time_str = os.popen(command).read()
    connect_time = float(time_str) * 1000
    return connect_time



