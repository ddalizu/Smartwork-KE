from django.db import models
from django.contrib.auth.models import User

class Portfolio(models.Model):
    title = models.CharField(max_length=150)  # Title of the work/project
    description = models.TextField()  # Description of the work/project
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the portfolio entry is created
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="portfolios")  # Link to the user
    image = models.ImageField(upload_to="portfolio_images/", null=True, blank=True)  # Optional image upload
    file = models.FileField(upload_to="portfolio_files/", null=True, blank=True)  # Optional file upload

    def __str__(self):
        return self.title
