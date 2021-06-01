from django.db import models


class Note(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    file = models.FileField('Изображение', blank=True)
    code = models.TextField()
    owner = models.ForeignKey('auth.User', related_name='notes', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created']
