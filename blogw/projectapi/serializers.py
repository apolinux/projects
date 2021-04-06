#from django.contrib.auth.models import User, Group
from blogwapp.models import Project,Blog
from rest_framework import serializers
from django.utils.timezone import now
from rest_framework.reverse import reverse
class BlogSerializer(serializers.HyperlinkedModelSerializer):
  #url = serializers.HyperlinkedIdentityField(
  #      view_name='projectapi:blog-detail',read_only=True) 
  #project=serializers.IntegerField()
  project_id = serializers.IntegerField()
  creat_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)
  
  class Meta:
    model = Blog
    fields = ['id', 'text', 'project_id','creat_date'] #,'project']


class BlogProjectSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Blog 
    fields = ['id','text','creat_date']

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
  #blogs = serializers.HyperlinkedRelatedField(many=True, view_name='projectapi:blog-detail', read_only=True)
  #blogs = serializers.StringRelatedField(many=True)
  num_blogs = serializers.IntegerField()
  last_modif = serializers.DateTimeField()
  days_ago = serializers.SerializerMethodField()
  last_blog = BlogSerializer()
  url = serializers.HyperlinkedIdentityField(
        view_name='projectapi:project-detail',read_only=True) 
  url_blogs = serializers.SerializerMethodField()
  creat_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)

  class Meta:
    model = Project
    fields = ['url','id', 'name', 'creat_date', 'description', 'num_blogs','last_modif','days_ago', 'last_blog','url_blogs'] 
  
  def get_url_blogs(self,obj):
    request = self.context.get('request')
    blog_url = reverse('projectapi:blog-list') + '?project_id=' + str(obj.id)
    return request.build_absolute_uri(blog_url)

  def get_days_ago(self,obj):
    if not obj.last_modif :
      return 0
    return (now() - obj.last_modif).days




