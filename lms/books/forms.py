from django import forms
from .models import Book, BorrowedBooks


class BorrowedBooksForm(forms.ModelForm):
    class Meta:
        model = BorrowedBooks
        fields = "__all__"
        # exclude = ["issued_by"]


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = "__all__"
        exclude = ["added_by"]
