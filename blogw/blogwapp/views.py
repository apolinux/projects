from django.http import HttpResponse
from .models import Blog,Project
from django.template import loader 
from django.http import HttpResponseRedirect,JsonResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.views.generic import TemplateView,View,ListView,CreateView,UpdateView,DeleteView
from django.db.models import Count,Max
from django.core import serializers
from json import dumps 
from django.contrib.auth.mixins import LoginRequiredMixin

class ProjectListView(LoginRequiredMixin, ListView):
    redirect_field_name = 'redirect_to'
    template_name = 'blogwapp/project/list.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Project.objects.annotate(num_blogs=Count('blogs')).annotate(max_date=Max('blogs__creat_date'))

class ProjectDetailView(generic.DetailView, LoginRequiredMixin):
  model = Project
  template_name = 'blogwapp/project/detail.html'
  queryset = Project.objects.annotate(blog_count=Count('blogs')).all()


class ProjectCreateView(CreateView, LoginRequiredMixin):
  model = Project
  fields = ['name','description']
  template_name = 'blogwapp/project/create.html'

class ProjectUpdateView(UpdateView, LoginRequiredMixin):
  model = Project
  fields = ['name','description']
  template_name = 'blogwapp/project/update.html'

class ProjectDeleteView(DeleteView, LoginRequiredMixin):
  pass 

class BlogListView(generic.ListView, LoginRequiredMixin):
  template_name = 'blogwapp/blog/list.html'
  context_object_name = 'latest_question_list'

  def get_queryset(self):
    pk = self.kwargs.get('pk')
    return Blog.objects.filter(project__id=pk).all()

  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    context['project_id'] = self.kwargs.get('pk')
    return context  

class BlogDetailView(generic.DetailView):
  model = Blog
  template_name = 'blogwapp/blog/detail.html'
  #queryset = Blog.objects.annotate(blog_count=Count('blogs')).all()

class BlogCreateView(CreateView,LoginRequiredMixin):
  model = Blog
  fields = ['text']
  template_name = 'blogwapp/blog/create.html'

  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    context['project_id'] = self.kwargs.get('pk')
    return context 

  def form_valid(self, form):
    pk = self.kwargs.get("pk", None)
    form.instance.project_id = pk
    return super(BlogCreateView, self).form_valid(form)  

class BlogUpdateView(generic.UpdateView,LoginRequiredMixin):
  model = Blog
  fields = ['text']
  template_name = 'blogwapp/blog/update.html'

class BlogDeleteView(generic.DeleteView,LoginRequiredMixin):
  pass

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