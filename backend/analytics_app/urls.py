from rest_framework.routers import DefaultRouter
from .views import CallDataViewSet

router = DefaultRouter()
router.register(r'calls', CallDataViewSet)

urlpatterns = router.urls
