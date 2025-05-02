from django.db import models

# Create your models here.
class Guestbook(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=20)
    writer = models.CharField(max_length=10)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    password = models.CharField(max_length=10)

    def __str__(self): # 표준 파이썬 클래스 메서드, 사람이 읽을 수 있는 문자열을 반환하도록 함
        return self.writer
