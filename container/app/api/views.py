from django.shortcuts import render

# Django-Rest-Framework
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response

# models
from .models import *

# Serializers
from .serializers import *

# Custom
from .helpers import *

class IngestionView(generics.CreateAPIView):
    def post(self, request):
        # for bulk approval
        object_list = []

        # create CSV_File Object for payload
        current_file = CSV_File(request.data['payload'])

        # have object provide hashed data
        hash_data = current_file.hash_list

        print('before bulk create')
        # create ProteinModel Objects
        object_list = ProteinModel.list_from_hash(hash_data)
        protein_model_list = ProteinModel.proteins.bulk_create(object_list)

        print('After bulk create')
        object_list.clear()

        # Creating Abundance objects
        object_list = ProteinAbundanceModel.list_from_hash(hash_data, protein_model_list)
        abundance_list = ProteinAbundanceModel.proteins.bulk_create(object_list)

        return Response(data={'success': True}, status=status.HTTP_200_OK)

class ProteinDetailsView(generics.ListAPIView):
    serializer_class = ProteinSerializer
    lookup_id = 0
    model = ProteinModel

    def get_queryset(self):
        query_set = self.model.proteins.filter(protein_id=self.lookup_id)
        return query_set

    def get(self, request, protein_id):
        """
        It will return a list
        """
        self.lookup_id = protein_id
        queryset = self.get_queryset()
        serialized_query_set = self.serializer_class(queryset, many=True)
        if len(serialized_query_set.data) > 0:
            return Response(data=serialized_query_set.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class ProteinAbundanceView(generics.ListAPIView):
    serializer_class = ProteinAbundanceSerializer
    lookup_id = 0
    model = ProteinModel

    def get_queryset(self):
        query_set = self.model.proteins.filter(protein_id=self.lookup_id)
        query_sets = []
        for _q in query_set:
            query_sets.append(_q.protein_data.all())
        return query_sets

    def get(self, request, protein_id):
        """
        It will return a list
        """
        self.lookup_id = protein_id
        serialized_querysets = []
        # a List of lists of time values
        queryset = self.get_queryset()
        for _set in queryset:
            _sqs = []
            for _each_query in _set:
                serialized_queryset = self.serializer_class(_each_query, many=False)
                _sqs.append(serialized_queryset.data)
            serialized_querysets.append(_sqs)
        return Response(data=serialized_querysets, status=status.HTTP_200_OK)