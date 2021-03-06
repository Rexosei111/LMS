from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from .myrequests import get_book_data, get_date
from students.models import Student
from typing import Iterable

# Create your models here.

class ListField(models.TextField):
    """
    A custom Django field to represent lists as comma separated strings
    """

    def __init__(self, *args, **kwargs):
        self.token = kwargs.pop('token', ',')
        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()
        kwargs['token'] = self.token
        return name, path, args, kwargs

    def to_python(self, value):

        class SubList(list):
            def __init__(self, token, *args):
                self.token = token
                super().__init__(*args)

            def __str__(self):
                return self.token.join(self)

        if isinstance(value, list):
            return value
        if value is None:
            return SubList(self.token)
        return SubList(self.token, value.split(self.token))

    def from_db_value(self, value, expression, connection):
        return self.to_python(value)

    def get_prep_value(self, value):
        if not value:
            return
        assert(isinstance(value, Iterable))
        return self.token.join(value)

    def value_to_string(self, obj):
        value = self.value_from_object(obj)
        return self.get_prep_value(value)

class Language(models.Model):
    name = models.CharField(
        max_length=200,
        unique=True,
        help_text="Enter the book's natural language (e.g. English, French, Japanese etc.)",
    )

    def __str__(self):
        return self.name


class Book(models.Model):
    fetch_data = models.BooleanField(default=True)
    isbn = models.CharField(
        max_length=17,
        unique=True,
        help_text="13 Character ISBN number (https://www.isbn-international.org/content/what-isbn)",
    )
    author = models.CharField(max_length=100, null=True, blank=True)
    title = models.CharField(max_length=200)
    summary = models.TextField(help_text="Enter brief description of the book", null=True, blank=True
    )
    language = models.ForeignKey(
        Language, on_delete=models.SET_NULL, null=True, blank=True
    )
    publisher = models.CharField(max_length=100, null=True, blank=True)
    published_date = models.DateField(null=True, blank=True)
    page_count = models.PositiveIntegerField(null=True, blank=True)
    available_copies = models.PositiveIntegerField(null=True, blank=True)
    image_link = models.URLField(null=True, blank=True)
    embeddable = models.BooleanField(null=True, blank=True)
    image_small_thumbnail = models.URLField(null=True, blank=True)
    average_rating = models.FloatField(null=True, blank=True)
    shelf_number = models.PositiveIntegerField(null=True, blank=True)
    date_added = models.DateField(auto_now_add=True, null=True)
    category = ListField(null=True, blank=True)
    added_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={"is_staff": True},
    )

    def clean(self) -> None:
        # number = "".join(self.isbn.split("-"))
        if (self.isbn): number =  "".join(self.isbn.split("-"))
        else: number =  None
        if(self.fetch_data):
            if (number and len(number) in [10, 13]):
                volumeInfo, accessInfo = get_book_data(self.isbn)

                if(volumeInfo is None):
                    raise ValidationError("Unable to retrieve book data. This may be due to non-existence of a book with this ISBN")
                else:
                    pub_date = get_date(volumeInfo.get("publishedDate", None))
                    author = volumeInfo.get("authors", None)
                    self.author = author[0] if author else None
                    self.title = volumeInfo.get("title", self.title)
                    self.publisher = volumeInfo.get("publisher", self.publisher)
                    self.published_date =  pub_date
                    self.page_count = volumeInfo.get("pageCount", self.page_count)
                    self.summary = volumeInfo.get("description", self.summary)
                    self.image_link = volumeInfo["imageLinks"]["thumbnail"] or None
                    self.embeddable = accessInfo.get("embeddable", None)
                    self.average_rating = volumeInfo.get("averageRating", 0.0)
                    self.category = volumeInfo.get("categories", self.category)
                    self.image_small_thumbnail = volumeInfo["imageLinks"]["smallThumbnail"] or None



            else:
                raise ValidationError(
                {
                    "isbn": "Invalid Isbn"
                }
            )
        return super().clean()
    def __str__(self):
        return self.title


class BorrowedBooks(models.Model):
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
    student = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True)
    issued_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={"is_staff": True},
    )
    issued_date = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()

    def __str__(self):
        return f"{self.student} - {self.book}"

RATING = (
    (0, "0"),
    (1, "1"),
    (2, "2"),
    (3, "3"),
    (4, "4"),
    (5, "5")
)
class BookReview(models.Model):
    email = models.EmailField(unique=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(null=True, help_text="Rate this book on the scale of 1 - 5", choices=RATING)
    review = models.TextField(null=True)
    reviewed_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.email
    
class RecommendedBook(models.Model):
    title = models.CharField(max_length=100, blank=False, null=False, help_text="Title of the book")
    author = models.CharField(max_length=200, null=True, blank=True, help_text="Author of this book")
    isbn = models.CharField(max_length=17, blank=True, null=True)
    recommended_by = models.EmailField(null=False, blank=False)
    phone_number = models.CharField(max_length=12, blank=True, null=True)
    recommended_at = models.DateField(auto_now_add=True)
    
    def clean(self) -> None:
        if (self.isbn): number =  "".join(self.isbn.split("-"))
        else: number =  None
        if(number and (len(number) != 10 or len(number) != 13)):
            raise ValidationError({
                "isbn": "Invalid ISBN number"
            })
        
        return super().clean()
    
    def __str__(self):
        return self.title