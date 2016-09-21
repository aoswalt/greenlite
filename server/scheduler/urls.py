from django.conf.urls import url, include
from rest_framework import routers
from scheduler import views

router = routers.DefaultRouter()
router.register(r'user', views.UserView)
router.register(r'vertex', views.VertexView)
router.register(r'event_request', views.EventRequestView)

urlpatterns = [
    url(r'^', include(router.urls)),
]
