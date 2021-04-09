from django.urls import path
from rest_framework import routers
from . import views

app_name = 'blogwapp'

# rest framework
#router = routers.DefaultRouter()
#router.register(r'users', views.UserViewSet)

urlpatterns = [
  # ex: /polls/
  #path('', views.IndexView.as_view(), name='index'),
  # ex: /polls/5/
  #path('<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),
  # ex: /polls/5/results/
  #path('<int:pk>/blogs/', views.BlogListView.as_view(), name='blog-list'),
  # ex: /polls/5/vote/
  #path('<int:pk>/vote/', views.vote, name='vote'),

  # /blogwapp/ => index, pag. Principal, lista de proyectos (GET)
  path('', views.IndexView.as_view(), name='index'),

  # /blogwapp/projects/ => lista de proyectos (GET AJAX)
  #path('projects/', views.ProjectListView.as_view(), name='project-list'),
  #path('projects/', views.projectList, name='project-list'),
  #path('projects/', views.ProjectListViewSet, name='project-list'),

  # blogwapp/ID/  => detalle del proyecto  (GET AJAX)
  path('<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),

  # blogwapp/ID/blogs  => lista de blogs del proyecto (GET AJAX)
  path('<int:pk>/blogs/', views.BlogListView.as_view(), name='blog-list'),

  # blogwapp/add  => crear proyecto (GET, POST AJAX)
  path('create/', views.ProjectCreateView.as_view(), name='project-add'),

  # blogwapp/ID/update => update proyecto (GET , POST)
  path('<int:pk>/update/', views.ProjectUpdateView.as_view(), name='project-update'),

  # blogwapp/ID/delete => delete proyecto (POST AJAX)
  path('<int:pk>/delete/', views.ProjectDeleteView.as_view(), name='project-delete'),

  # blogwapp/blog/ID => detalle blog 
  path('blog/<int:pk>/', views.BlogDetailView.as_view(), name='blog-detail'),

  # blogwapp/PROJ_ID/blog/create  => crear blog
  path('<int:pk>/create/', views.BlogCreateView.as_view(), name='blog-add'),

  # blogwapp/ID/blog/update  => update blog
  path('blog/<int:pk>/update/', views.BlogUpdateView.as_view(), name='blog-update'),

  # blogwapp/blog/ID/delete => update blog
  path('blog/<int:pk>/delete/', views.BlogDeleteView.as_view(), name='blog-delete'),
]
