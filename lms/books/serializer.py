from .models import Book, IssuedDetail
from rest_framework import serializers

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "title", "author", "image_small_thumbnail", "page_count"]
        
class BookDetailSerializer(serializers.ModelSerializer):
    language = serializers.StringRelatedField()
    # genre = serializers.StringRelatedField()
    class Meta:
        model = Book
        exclude = ["added_by", "fetch_data", "date_added"]