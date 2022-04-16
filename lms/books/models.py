from datetime import datetime
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from .myrequests import get_book_data, get_date
from students.models import Student

# Create your models here.


class Genre(models.Model):
    name = models.CharField(
        max_length=200,
        unique=True,
        help_text="Enter a book genre (e.g. Science Fiction, French Poetry etc.)",
    )

    def number_of_books(self):
        return Book.objects.filter(genre__pk=self.pk).count()

    def __str__(self):
        return self.name


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
        max_length=20,
        help_text="13 Character ISBN number (https://www.isbn-international.org/content/what-isbn)",
    )
    author = models.CharField(max_length=100, null=True, blank=True)
    title = models.CharField(max_length=200)
    summary = models.CharField(
        max_length=500, help_text="Enter brief description of the book"
    )
    language = models.ForeignKey(
        Language, on_delete=models.SET_NULL, null=True, blank=True
    )
    genre = models.ManyToManyField(Genre, blank=True)
    publisher = models.CharField(max_length=100, null=True, blank=True)
    published_date = models.DateField(null=True, blank=True)
    page_count = models.PositiveIntegerField(null=True, blank=True)
    available_copies = models.PositiveIntegerField(null=True, blank=True)
    image_link = models.URLField(null=True, blank=True)
    image_small_thumbnail = models.URLField(null=True, blank=True)
    shelf_number = models.PositiveIntegerField(null=True, blank=True)
    added_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={"is_staff": True},
    )

    def clean(self) -> None:
        number = "".join(self.isbn.split("-"))
        if(self.fetch_data):
            if len(number) in [10, 13]:
                data = get_book_data(self.isbn)
                pub_date = get_date(data["publishedDate"])
                if(data):
                    author = data.get("authors", None)
                    self.author = author[0] if author else None
                    self.title = data["title"] or self.title
                    self.publisher = data["publisher"] or None
                    self.published_date =  pub_date
                    self.page_count = data.get("pageCount", None)
                    self.summary = data["description"] or None
                    self.image_link = data["imageLinks"]["thumbnail"] or None
                    self.image_small_thumbnail = data["imageLinks"]["smallThumbnail"] or None
                    
                else:
                    raise ValidationError("Unable to retrieve book data")
            else:
                raise ValidationError(
                {
                    "isbn": "Invalid Isbn"
                }
            )
        return super().clean()
    def __str__(self):
        return self.title


class IssuedDetail(models.Model):
    book = models.ForeignKey(Book, on_delete=models.DO_NOTHING)
    student = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
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
