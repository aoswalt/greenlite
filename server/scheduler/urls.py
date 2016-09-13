from django.conf.urls import url, include
from rest_framework import routers
from scheduler import views

router = routers.DefaultRouter()
router.register(r'user', views.User)
router.register(r'vertex', views.Vertex)
router.register(r'event_request', views.EventRequest)

urlpatterns = [
    url(r'^', include(router.urls)),
]
