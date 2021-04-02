from django.http import HttpResponse
from .models import Blog,Project
from django.template import loader 
from django.http import HttpResponseRedirect,JsonResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.views.generic import TemplateView,View
from django.db.models import Count,Max
from django.core import serializers
from json import dumps 
#from rest_framework import viewsets
#from rest_framework import permissions
#from blogwapp.serializers import ProjectSerializer, BlogSerializer


class IndexView(generic.ListView):
    template_name = 'blogwapp/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Project.objects.annotate(num_blogs=Count('blogs')).annotate(max_date=Max('blogs__creat_date'))
        #.annotate(last_blog)
        #.order_by('-creat_date')[:5]



"""class JsonResponseMixin(object):
    " ""
    Return json
    " ""
    def render_to_response(self, context):
        #queryset = self.model.objects.all()
        data = serializers.serialize('json', [])
        return HttpResponse(data, content_type='application/json')
"""
class JSONResponseMixin:
    """
    A mixin that can be used to render a JSON response.
    """
    def render_to_json_response(self, context, **response_kwargs):
        """
        Returns a JSON response, transforming 'context' to make the payload.
        """
        return JsonResponse(
            self.get_data(context),
            **response_kwargs
        )

    def get_data(self, context):
        """
        Returns an object that will be serialized as JSON by json.dumps().
        """
        # Note: This is *EXTREMELY* naive; in reality, you'll need
        # to do much more complex handling to ensure that arbitrary
        # objects -- such as Django model instances or querysets
        # -- can be serialized as JSON.
        return context


class JSONView(JSONResponseMixin, TemplateView):
    def render_to_response(self, context, **response_kwargs):
        return self.render_to_json_response(context, **response_kwargs)

"""class ProjectListView(View):

  def get(self, request, *args, **kwargs):
        " ""Return the last five published questions." ""
        return toJson(Project.objects.order_by('-creat_date')[:5])
"""

def toJson(context):
  #print('context',context)
  info = serializers.serialize('json',context,fields=('id','name'))
  #return JsonResponse(info,safe=False)
  return HttpResponse(info, content_type="application/json")


#def projectList(request):
#  return toJson(Project.objects.order_by('-creat_date')[:5])

"""class ProjectListViewSet(viewsets.ModelViewSet):
    "" "
    API endpoint that allows users to be viewed or edited.
    "" "
    queryset = Project.objects.all().order_by('-creat_date')[:5]
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
"""

class ProjectDetailView(generic.DetailView):
    model = Project
    template_name = 'blogwapp/detail.html'

    def get(self,request,pk):
      #info = serializers.serialize('json',[Project.objects.get(pk=pk)])
      #return JsonResponse(info,safe=False)
      return toJson([Project.objects.get(pk=pk)])

class ProjectCreateView(generic.UpdateView):
  pass 

class ProjectUpdateView(generic.UpdateView):
  pass 

class ProjectDeleteView(generic.UpdateView):
  pass 

class BlogListView(generic.ListView):
    template_name = 'blogwapp/bloglist.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return blogs."""
        return Project.objects.blog_set.all()

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)

class BlogDetailView(generic.DetailView):
  model = Blog
  template_name = 'blogwapp/detail.html'
  def get(self,request,pk):
    return '' 

class BlogCreateView(generic.UpdateView):
  pass

class BlogUpdateView(generic.UpdateView):
  pass

class BlogDeleteView(generic.UpdateView):
  pass