from django.db import models

class CallData(models.Model):
    call_id = models.CharField(max_length=255, unique=True)
    call_time = models.DateTimeField()
    call_end_time = models.DateTimeField()
    duration_seconds = models.IntegerField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50) # e.g., 'answered', 'failed'
    summary = models.TextField(blank=True, null=True) # Optional summary text

    def __str__(self):
        return f"Call {self.call_id} ({self.status})"

    class Meta:
        verbose_name = "Call Data"
        verbose_name_plural = "Call Data"
        ordering = ['-call_time'] # Order by most recent call first
