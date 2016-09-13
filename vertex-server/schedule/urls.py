from django.conf.urls import url, include
from rest_framework import routers
from schedule import views

router = routers.DefaultRouter()
router.register(r'event', views.Event)

urlpatterns = [
    url(r'^', include(router.urls)),
]
