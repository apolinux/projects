from django.urls import include, path
from rest_framework import routers
#from tutorial.quickstart import views
from . import views

app_name = 'projectapi'

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'blogs', views.BlogViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
