import urllib3
import json
import logging

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    try:
        # Make request to external server
        http = urllib3.PoolManager()
        r = http.request('GET', "http://34.127.79.39:18293/chart-data")

        # Ensure response object is defined before accessing attributes
        status_code = r.status if r else 500
        body = json.loads(r.data.decode(
            'utf-8')) if r and r.data else {"message": "Internal Server Error"}
    except Exception as e:
        # Log error using proper logging
        logger.error(f'Error occurred during Lambda execution: {e}')

        # Set error response
        status_code = 500
        body = {"message": "Internal Server Error"}

    # Return response
    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Credentials": True,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(body)
    }
