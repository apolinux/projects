#from django.contrib.auth.models import User, Group
from blogwapp.models import Project,Blog
from rest_framework import serializers
from django.utils.timezone import now
from rest_framework.reverse import reverse
class BlogSerializer(serializers.HyperlinkedModelSerializer):
  project_id = serializers.IntegerField()
  creat_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)
  url_delete_blog = serializers.SerializerMethodField()
  url = serializers.HyperlinkedIdentityField(
        view_name='blogwapp:blog-detail',read_only=True) 
  url_update = serializers.HyperlinkedIdentityField(
        view_name='blogwapp:blog-update',read_only=True)       
  class Meta:
    model = Blog
    fields = ['id', 'text', 'project_id','creat_date','url_delete_blog','url','url_update'] 

  def get_url_delete_blog(self,obj):
    request = self.context.get('request')
    blog_url = reverse('projectapi:blog-detail',kwargs={'pk':obj.id})
    return request.build_absolute_uri(blog_url)  

class BlogProjectSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Blog 
    fields = ['id','text','creat_date','update_date']


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
  num_blogs = serializers.IntegerField(read_only=True)
  last_modif = serializers.DateTimeField(read_only=True)
  days_ago = serializers.SerializerMethodField()
  last_blog = BlogSerializer(read_only=True)
  url = serializers.HyperlinkedIdentityField(
        #view_name='projectapi:project-detail',read_only=True) 
        view_name='blogwapp:project-detail',read_only=True) 
  url_blogs = serializers.SerializerMethodField()
  creat_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)
  url_new_blog = serializers.SerializerMethodField()
  url_project_delete = serializers.SerializerMethodField()
  url_update = serializers.HyperlinkedIdentityField(
        view_name='blogwapp:project-update',read_only=True) 
  
  class Meta:
    model = Project
    fields = ['url','id', 'name', 'creat_date', 'description', 'num_blogs','last_modif','days_ago', 'last_blog','url_blogs','url_new_blog','update_date','url_project_delete','url_update'] 
  
  def get_url_blogs(self,obj):
    request = self.context.get('request')
    blog_url = reverse('projectapi:blog-list') + '?project_id=' + str(obj.id)
    return request.build_absolute_uri(blog_url)

  def get_url_new_blog(self,obj):
    request = self.context.get('request')
    blog_url = reverse('projectapi:blog-list')
    return request.build_absolute_uri(blog_url)  

  def get_url_project_delete(self,obj):
    request = self.context.get('request')
    blog_url = reverse('projectapi:project-detail',kwargs={'pk':obj.id})
    return request.build_absolute_uri(blog_url)    

  def get_days_ago(self,obj):
    try:
      if obj.last_modif is None:
        days_ago= ''
      else:
        days=(now() - obj.last_modif).days
        if days == 0 :
          days_ago = 'Hoy'
        else:
          days_ago = 'Hace ' + str(days) + 'dias'  
    except:
      days_ago = ''

    return days_ago    




