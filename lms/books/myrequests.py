from datetime import datetime
import os
import requests
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GOOGLE_BOOKS_KEY")
url = "https://www.googleapis.com/books/v1/volumes"

def get_book_data(isbn: str):
    try:
        response = requests.get(url, {"q": f"isbn:{isbn}","key": key})
        data = response.json()
        items = data.get("items", None)
        if(items is None):
            return (None, None)

        volumeInfo = items[0].get("volumeInfo", None)
        accessInfo = items[0].get("accessInfo", None)
        return (volumeInfo, accessInfo)
    except ConnectionError:
        print("Unable to retrieve data")
        return (None, None)

def get_date(date_string: str):
    if(date_string is None):
        return None
    try:
        date = datetime.strptime(date_string, "%Y-%m-%d").date()
        return date
    except Exception:
        return None
