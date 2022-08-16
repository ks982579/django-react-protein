
from django.urls import path, include

# Import views
from .views import *

urlpatterns = [
    path('ingest/', IngestionView.as_view()),
    path('protein-details/<int:protein_id>/', ProteinDetailsView.as_view()),
    path('protein-abundance/<int:protein_id>/', ProteinAbundanceView.as_view())
]