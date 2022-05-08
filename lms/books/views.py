from datetime import datetime
from rest_framework import generics, filters
from .serializer import AddReviewSerializer, BookDetailSerializer, BookSerializer, Book, ReviewSerializer, BookReview
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.permissions import AllowAny
class BookList(generics.ListAPIView):
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "author", "isbn", "category"]

    def get_queryset(self):
        queryset = Book.objects.all().order_by("-date_added")
        search_query = self.request.query_params.get("search")
        if(search_query is not None):
            search_query = search_query.strip()
            filters = {
                "author": queryset.filter(author__icontains=search_query),
                "title": queryset.filter(title__icontains=search_query),
                "isbn": queryset.filter(isbn__iexact=search_query),
                "category": queryset.filter(category__icontains=search_query)
            }
            pub_date = self.request.query_params.get("pub_date")
            
            try:
                date = datetime.strptime(pub_date, "%m/%d/%Y")
            except Exception:
                date = None
            filter = self.request.query_params.get("filter", None)
            if(filter): queryset = filters[filter]
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
    
class GetReviews(generics.ListAPIView):
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        print("Im called")
        queryset = BookReview.objects.filter(book__pk=self.kwargs.get("book_pk")).order_by("-reviewed_at")
        return queryset
    

@api_view(["POST"])
@permission_classes([AllowAny])
@parser_classes([JSONParser])
def AddBookReview(request, book_pk):
    data = request.data
    print(data)
    serialzer = AddReviewSerializer(data={**data, "book": book_pk})
    if serialzer.is_valid():
        review = serialzer.save()
        return Response(status=200)
    else:
        return Response(serialzer.errors, 400)