from django.contrib import admin
from .models import User
from lms.admin import admin_site
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group

# Register your models here.


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ["email", "first_name", "phone_number"]
    search_fields = ["email", "first_name", "last_name", "phone_number"]

    def save_model(self, request, obj, form, change):
        print(obj)
        obj.password = make_password(obj.password)
        super().save_model(request, obj, form, change)


admin_site.register(User, CustomUserAdmin)
admin_site.register(Group)
