from lms.admin import admin_site
from django.contrib import admin

from .models import Programme, Student

# Register your models here.


class CustomStudentAdmin(admin.ModelAdmin):
    list_display = ["index_number", "email", "level", "programme"]
    search_fields = ["index_number", "first_name", "last_name", "programme", "email"]
    list_filter = ["programme", "level"]
    autocomplete_fields = ["programme"]


class CustomProgrammeAdmin(admin.ModelAdmin):
    list_display = ["name", "number_of_students"]
    search_fields = ["name"]


admin_site.register(Student, CustomStudentAdmin)
admin_site.register(Programme, CustomProgrammeAdmin)
