from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager
from django.conf import settings

GENDERS = (("MALE", "Male"), ("FEMALE", "Female"))


class User(AbstractUser):
    username = None
    email = models.EmailField(verbose_name="Email Address", unique=True)
    phone_number = models.CharField(max_length=12)
    gender = models.CharField(max_length=6, choices=GENDERS, null=True, blank=True)
    # hostel_name = models.ForeignKey(
    #     Hostel, on_delete=models.SET_NULL, null=True, blank=True, to_field="name", related_name="students")
    # room_number = models.ForeignKey(
    #     Room, on_delete=models.SET_NULL, null=True, blank=True, related_name="occupants")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["phone_number"]

    objects = UserManager()

    class Meta:
        verbose_name = "staff"

    # def save(self, *args, **kwargs):
    #     index_number = normalize_index_number(self.index_number)
    #     self.index_number = index_number
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.email
