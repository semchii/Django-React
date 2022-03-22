from django.db import models


class Group(models.Model):
    group_id = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=100)
    group_description = models.TextField(max_length=500)

    objects = models.Manager()

    def __str__(self):
        return self.group_name

    class Meta:
        verbose_name = 'Group'
        verbose_name_plural = 'Groups'


class Member(models.Model):
    username = models.CharField(max_length=30)
    group = models.CharField(max_length=50)
    date_joined = models.DateField(auto_now_add=True)

    objects = models.Manager()

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'Member'
        verbose_name_plural = 'Members'
