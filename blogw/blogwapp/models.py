import datetime 
from django.db import models
from django.utils import timezone
from django.urls import reverse

# Create your models here.

class Project(models.Model):
  name = models.CharField(max_length=200)
  title = models.CharField(max_length=200)
  creat_date= models.DateTimeField('date created', default=timezone.now)
  description = models.CharField(max_length=2000)

  def __str__(self):
    return self.name

  def was_published_recently(self):
    return self.creat_date >= timezone.now() - datetime.timedelta(days=1)  

  @property
  def last_blog(self):
    return self.blogs.last()  

class Blog(models.Model):
  project = models.ForeignKey(Project, related_name='blogs',on_delete=models.CASCADE)
  creat_date = models.DateTimeField('date created', default=timezone.now)
  text = models.CharField(max_length=200)

  def __str__(self):
    return self.text

  def last_blog(self):
    return self.pub_date >= timezone.now() - datetime.timedelta(days=1)  

