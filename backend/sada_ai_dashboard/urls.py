# backend/call_analytics/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('analytics_app.urls')), # Include your app's URLs under /api/
]
