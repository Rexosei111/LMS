from .models import Book, BookReview
from rest_framework import serializers

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "title", "author", "image_small_thumbnail", "page_count"]
        
class BookDetailSerializer(serializers.ModelSerializer):
    language = serializers.StringRelatedField()
    class Meta:
        model = Book
        exclude = ["added_by", "fetch_data", "date_added"]
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReview
        exclude = ["book"]
        
class AddReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReview
        exclude = ["reviewed_at"]