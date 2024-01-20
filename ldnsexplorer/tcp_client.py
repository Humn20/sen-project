import socket


# Transfer the file to the server
def send_report():
    try:
        host = '192.5.110.93'
        port = 45321

        client_socket = socket.socket()
        client_socket.connect((host, port))
        message = 'post'

        client_socket.send(message.encode())

        # Will only transfer te output file to the server
        message = open('output.txt').read()

        client_socket.send(message.encode())
        data = client_socket.recv(4096).decode()

        print(data)

        client_socket.close()
    except ConnectionRefusedError:
        print('Failed to transfer the report.')


# Get config file (domains) from server
def get_config() -> list:
    try:
        host = '192.5.110.93'
        port = 45321

        client_socket = socket.socket()
        client_socket.connect((host, port))

        message = 'get'

        client_socket.send(message.encode())
        data = client_socket.recv(4096).decode()

        if data == 'Exception':
            print('\nFailed to get configuration file from server (Server Side Error).\n')
            client_socket.close()
            exit()

        domains_rec = data.split(",")
        domains = []

        for domain in domains_rec:
            if domain != '' and domain != '\n':
                domains.append(domain)

        message = 'success'
        client_socket.send(message.encode())

        client_socket.close()

        return domains
    except ConnectionRefusedError:
        print('\nFailed to get configuration file from server (Connection Refused Error).\n')
        exit()
