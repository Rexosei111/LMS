from django.shortcuts import render
from rest_framework import generics, filters
from .serializer import BookDetailSerializer, BookSerializer, Book
from rest_framework.decorators import api_view

class BookList(generics.ListAPIView):
    queryset = Book.objects.all().order_by("-date_added")
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "author", "isbn"]

    def get_queryset(self):
        # queryset = super(ContactListView, self).get_queryset()
        user = self.request.user
        queryset = Book.objects.all()
        return queryset
    
class RecentBooks(generics.ListAPIView):
    queryset = Book.objects.all().order_by("-date_added")[:8]
    serializer_class = BookSerializer

class GetBook(generics.RetrieveAPIView):
    serializer_class = BookDetailSerializer
    lookup_field = "pk"
    queryset = Book.objects.all()