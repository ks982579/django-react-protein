from rest_framework import serializers
from .models import *

# Create Serializers
class ProteinSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProteinModel
        fields = '__all__'

class ProteinAbundanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProteinAbundanceModel
        fields = '__all__'