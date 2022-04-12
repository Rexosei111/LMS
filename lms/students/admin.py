from lms.admin import admin_site
from django.contrib import admin

from .models import Programme, Student

# Register your models here.


class CustomStudentAdmin(admin.ModelAdmin):
    list_display = ["index_number", "email", "level", "programme"]
    search_fields = ["first_name", "last_name", "programme", "index_number", "email"]
    list_filter = ["programme", "level"]


class CustomProgrammeAdmin(admin.ModelAdmin):
    list_display = ["name", "number_of_students"]


admin_site.register(Student, CustomStudentAdmin)
admin_site.register(Programme, CustomProgrammeAdmin)
