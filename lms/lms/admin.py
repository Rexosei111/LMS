from django.contrib import admin

class CustomAdminSite(admin.AdminSite):
    site_header = "LMS Administration"
    site_title = "Library Management Administration"
    
admin_site = CustomAdminSite(name="myadmin")