from lms.admin import admin_site
from django.contrib import admin

from .forms import BookForm, IssuedDetailForm
from .models import Book, Genre, IssuedDetail, Language

# Register your models here.


class BookAdmin(admin.ModelAdmin):
    form = BookForm
    list_display = ["title", "author", "available_copies", "date_added"]
    filter_horizontal = ["genre"]
    autocomplete_fields = ["language"]
    readonly_fields = ["added_by"]
    search_fields = ["title", "genre__name", "author", "isbn", "language__name"]
    list_filter = ["author", "genre__name"]
    # list_editable = ["available_copies"]

    fieldsets = (
        (None, {"fields": ["fetch_data", "title", "author", "isbn", "available_copies"]}),
        ("Other", {"fields": [("publisher", "published_date"), "image_link", ("shelf_number", "page_count"),"language", "genre"]}),
    )

    def save_model(self, request, obj, form, change):
        obj.added_by = request.user
        super().save_model(request, obj, form, change)


class CustomIssuedDetailsAdmin(admin.ModelAdmin):
    form = IssuedDetailForm
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


class CustomGenreAdmin(admin.ModelAdmin):
    list_display = ["name", "number_of_books"]


class CustomLanguageAdmin(admin.ModelAdmin):
    search_fields = ["name"]


admin_site.register(Book, BookAdmin)
admin_site.register(Genre, CustomGenreAdmin)
admin_site.register(Language, CustomLanguageAdmin)
admin_site.register(IssuedDetail, CustomIssuedDetailsAdmin)
