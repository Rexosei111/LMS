from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    # path("students", views.BookList.as_view(), name="Book List view"),
    path("register", views.RegisterStudent)
]

urlpatterns = format_suffix_patterns(urlpatterns)