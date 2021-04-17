from django.shortcuts import render

# Create your views here.
#from django.contrib.auth.models import User, Group
from rest_framework import viewsets,generics
from rest_framework import permissions
from projectapi.serializers import ProjectSerializer, BlogSerializer, BlogProjectSerializer
from blogwapp.models import Project,Blog
from django.db.models import Count,Max
from datetime import datetime,timezone
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.db.models import Q

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Project.objects.all().order_by('-creat_date')
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
      
      queryset = Project.objects.all()

      
      if self.request.query_params.keys():
        text = self.request.query_params.get('text')
        queryset = Project.objects 
        if text:
          queryset = queryset.filter(Q(name__icontains=text) | Q(description__icontains=text) )

      #return queryset.order_by('-creat_date')

      return queryset.annotate(
          num_blogs=Count('blogs'),
          last_modif =  Max('blogs__creat_date')
      ).order_by('-update_date')



class BlogViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Blog.objects.all().order_by('-creat_date')
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
      queryset = Blog.objects.all()

      if self.request.query_params.keys():
        projectid = self.request.query_params.get('project_id')
        text = self.request.query_params.get('text')
        queryset = Blog.objects 
        if projectid:
          queryset = queryset.filter(project__id=projectid)

        if text:
          queryset = queryset.filter(text__icontains=text)

      return queryset.order_by('-creat_date')


