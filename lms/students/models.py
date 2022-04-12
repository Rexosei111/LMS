from django.db import models

# Create your models here.
class Programme(models.Model):
    name = models.CharField(max_length=30)

    def number_of_students(self):
        return Student.objects.filter(programme__pk=self.pk).count()

    def __str__(self):
        return self.name


LEVELS = (
    (100, "First Year"),
    (200, "Second Year"),
    (300, "Third Year"),
    (400, "Final Year"),
)


class Student(models.Model):
    index_number = models.CharField(max_length=15, unique=True)
    first_name = models.CharField(max_length=15, blank=False)
    last_name = models.CharField(max_length=15, null=True, blank=True)
    programme = models.ForeignKey(
        Programme, on_delete=models.SET_NULL, null=True, blank=True
    )
    level = models.IntegerField(default=100, choices=LEVELS)
    email = models.EmailField(unique=True, blank=False, null=False)
    phone_number = models.CharField(max_length=12)

    def __str__(self):
        return self.index_number
