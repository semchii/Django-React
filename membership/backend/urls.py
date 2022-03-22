from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


urlpatterns = [
    path('group', views.group_api),
    path('group/<int:pk>', views.group_api),
    path('member', views.member_api),
    path('member/<int:pk>', views.member_api)
]

urlpatterns = format_suffix_patterns(urlpatterns)
