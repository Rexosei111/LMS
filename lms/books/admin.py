from lms.admin import admin_site
from django.contrib import admin

from .forms import BookForm, BorrowedBooks, BorrowedBooksForm
from .models import Book, BorrowedBooks, Language, BookReview, RecommendedBook

# Register your models here.


class BookAdmin(admin.ModelAdmin):
    form = BookForm
    list_display = ["title", "author", "available_copies", "average_rating"]
    autocomplete_fields = ["language"]
    readonly_fields = ["added_by"]
    search_fields = ["title", "author", "isbn", "language__name"]
    list_filter = ["author"]

    fieldsets = (
        (None, {"fields": ["fetch_data", "title", "author", "isbn", "available_copies"]}),
        ("Other", {"fields": [("publisher", "published_date"), "summary", "image_link", ("shelf_number", "page_count"),"language", "embeddable", "average_rating", "category"]}),
    )

    def save_model(self, request, obj, form, change):
        obj.added_by = request.user
        super().save_model(request, obj, form, change)


class CustomBorrowedBooksAdmin(admin.ModelAdmin):
    form = BorrowedBooksForm
    readonly_fields = ["issued_by"]
    autocomplete_fields = ["book", "student"]
    list_display = ["book", "student", "deadline"]
    search_fields = [
        "book__title",
        "student__index_number",
        "student__email",
        "student__first_name",
        "issued_by__email",
        "issued_by__first_name",
    ]
    list_filter = ["issued_date", "deadline"]

    def save_model(self, request, obj, form, change):
        obj.issued_by = request.user
        super().save_model(request, obj, form, change)


class CustomReviewAdmin(admin.ModelAdmin):
    list_display = ["email", "book", "rating"]


class CustomLanguageAdmin(admin.ModelAdmin):
    search_fields = ["name"]
    
class CustomRecommendBookAdmin(admin.ModelAdmin):
    list_display = ["title", "author"]
    search_fields = ["title", "author", "recommended_by"] 



admin_site.register(Book, BookAdmin)
admin_site.register(Language, CustomLanguageAdmin)
admin_site.register(BookReview, CustomReviewAdmin)
admin_site.register(BorrowedBooks, CustomBorrowedBooksAdmin)
admin_site.register(RecommendedBook, CustomRecommendBookAdmin)
