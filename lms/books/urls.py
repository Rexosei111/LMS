from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path("", views.BookList.as_view(), name="Book List view"),
    path("recent", views.RecentBooks.as_view()),
    path("<int:pk>", views.GetBook.as_view()),
    path("<int:book_pk>/reviews", views.GetReviews.as_view()),
    path("<int:book_pk>/reviews/new", views.AddBookReview),
    path("preview/<str:isbn>", views.get_book_preview, name="preview")
]

urlpatterns = format_suffix_patterns(urlpatterns)