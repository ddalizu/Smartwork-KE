from  django.urls import path
from . import views

urlpatterns = [
    path("portfolio/", views.PortfolioListCreate.as_view(), name= "portfolio-list"),
    path("portfolio/delete/<int:pk>/", views.PortfolioDelete.as_view(), name="delete_portfolio"),

]