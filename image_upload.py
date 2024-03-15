import base64
import requests
import sys

def upload_image(file_path):
    """
    Uploads an image file to a server.

    Args:
        file_path (str): The path to the image file.

    Returns:
        dict: The JSON response from the server.
    """
    file_name = file_path.split('/')[-1]

    file_encoded = None
    with open(file_path, "rb") as image_file:
        file_encoded = base64.b64encode(image_file.read()).decode('utf-8')

    r_json = { 'name': file_name, 'type': 'image', 'isPublic': True, 'data': file_encoded, 'parentId': sys.argv[3] }
    r_headers = { 'X-Token': sys.argv[2] }

    r = requests.post("http://0.0.0.0:5000/files", json=r_json, headers=r_headers)
    return r.json()

# Example usage:
# response = upload_image('/path/to/image.jpg')
# print(response)
