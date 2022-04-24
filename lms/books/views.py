from datetime import datetime
from rest_framework import generics, filters
from .serializer import BookDetailSerializer, BookSerializer, Book

class BookList(generics.ListAPIView):
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "author", "isbn", "genre__name"]

    def get_queryset(self):
        queryset = Book.objects.all().order_by("-date_added")
        search_query = self.request.query_params.get("search")
        if(search_query is not None):
            filters = {
                "author": queryset.filter(author__icontains=search_query),
                "title": queryset.filter(title__icontains=search_query),
                "isbn": queryset.filter(isbn__iexact=search_query),
                "genre": queryset.filter(genre__name__icontains=search_query)
            }
            pub_date = self.request.query_params.get("pub_date")
            
            try:
                date = datetime.strptime(pub_date, "%m/%d/%Y")
            except Exception:
                date = None
            filter = self.request.query_params.get("filter", None)
            queryset = filters[filter]
            if(date is not None): 
                queryset = queryset.filter(published_date__gte=date)
        return queryset
    
class RecentBooks(generics.ListAPIView):
    queryset = Book.objects.all().order_by("-date_added")[:8]
    serializer_class = BookSerializer

class GetBook(generics.RetrieveAPIView):
    serializer_class = BookDetailSerializer
    lookup_field = "pk"
    queryset = Book.objects.all()