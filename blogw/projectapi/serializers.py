#from django.contrib.auth.models import User, Group
from blogwapp.models import Project,Blog
from rest_framework import serializers


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
  #blogs = serializers.HyperlinkedRelatedField(many=True, view_name='projectapi:blog-detail', read_only=True)
  blogs = serializers.StringRelatedField(many=True)
  num_blogs = serializers.IntegerField()
  last_modif = serializers.DateTimeField()
  class Meta:
    model = Project
    fields = ['id', 'name', 'creat_date', 'description', 'blogs' , 'num_blogs','last_modif'] 


class BlogSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Blog
    fields = ['id', 'text']

