import json
import requests


def handler(event, context):
    handler_response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Credentials": True,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Origin": "*",
        },
    }
    r = requests.get("http://34.127.79.39:18292/GET")
    handler_response["statusCode"] = r.status_code
    handler_response["body"] = json.loads(r.content.decode('utf-8'))
    return handler_response