from datetime import timezone
from django.db import models
from django.conf import settings

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
    isbn = models.CharField(
        max_length=15,
        help_text="13 Character ISBN number (https://www.isbn-international.org/content/what-isbn)",
    )
    author = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    summary = models.CharField(
        max_length=500, help_text="Enter brief description of the book"
    )
    language = models.ForeignKey(
        Language, on_delete=models.SET_NULL, null=True, blank=True
    )
    genre = models.ManyToManyField(Genre)
    available_copies = models.IntegerField()
    added_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={"is_staff": True},
    )

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
