from django.conf.urls import url, include
from rest_framework import routers
from scheduler import views

router = routers.DefaultRouter()
router.register(r'vertex', views.Vertex)

urlpatterns = [
    url(r'^', include(router.urls)),
]
