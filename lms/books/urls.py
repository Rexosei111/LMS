from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path("books", views.BookList.as_view(), name="Book List view"),
    path("books/<str:isbn>", views.GetBook.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)