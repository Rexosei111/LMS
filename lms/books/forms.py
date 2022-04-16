from django import forms
from .models import Book, IssuedDetail


class IssuedDetailForm(forms.ModelForm):
    class Meta:
        model = IssuedDetail
        fields = "__all__"
        # exclude = ["issued_by"]


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = "__all__"
        exclude = ["added_by"]
