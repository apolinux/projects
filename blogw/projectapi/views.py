from django.shortcuts import render

# Create your views here.
#from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from projectapi.serializers import ProjectSerializer, BlogSerializer
from blogwapp.models import Project,Blog
from django.db.models import Count,Max
from datetime import datetime,timezone

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Project.objects.all().order_by('-creat_date')
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.annotate(
            num_blogs=Count('blogs'),
            last_modif =  Max('blogs__creat_date')
        )


class BlogViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticated]


def date_diff_in_seconds(dt2, dt1):
  timedelta = dt2 - dt1
  return timedelta.days * 24 * 3600 + timedelta.seconds

def days_from_seconds(seconds):
  minutes, seconds = divmod(seconds, 60)
  hours, minutes = divmod(minutes, 60)
  days, hours = divmod(hours, 24)
  return days
	# return (days, hours, minutes, seconds)  

def diffdays(dt1,dt2):
  return days_from_seconds(date_diff_in_seconds(dt2,dt1))

def diffdaysnow(dt1):
  print('date',dt1)
  if dt1 == '' :
    return ''
  dt2 = datetime.now(timezone.utc)
  return days_from_seconds(date_diff_in_seconds(dt2,dt1))   