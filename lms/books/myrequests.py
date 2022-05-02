from datetime import datetime
import requests
import os
from dotenv import load_dotenv

load_dotenv

key = os.getenv("GOOGLE_BOOKS_KEY")
url = "https://www.googleapis.com/books/v1/volumes"

def get_book_data(isbn: str):
    try:
        response = requests.get(url, {"q": f"isbn:{isbn}","key": key})
        data = response.json()["items"][0]
        volumeInfo = data["volumeInfo"]
        accessInfo = data["accessInfo"]
        return volumeInfo, accessInfo                                                             
    except ConnectionError:
        print(f"Unable to retrieve data")
        return None
    
def get_date(date_string: str):
    try:
        date = datetime.strptime(date_string, "%Y-%m-%d").date()
        return date
    except Exception:
        return None