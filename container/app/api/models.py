from django.db import models
from .helpers import *

# Create your models here.
class ProteinModel(models.Model):
    protein_id = models.IntegerField()
    accession = models.CharField(max_length=255)
    average_mass = models.PositiveIntegerField()
    description = models.TextField(default="")
    cellular_processes = models.TextField(default="")
    protein_functions = models.TextField(default="")
    reactome_pathways = models.TextField(default="")

    upload_date = models.DateTimeField(auto_now_add=True)

    # renaming manager
    proteins = models.Manager()

    def __str__(self):
        return f'Accession: {self.accession} || ID: {self.protein_id}'

    class Meta:
        ordering = ['upload_date', 'protein_id']

    @classmethod
    def list_from_hash(cls, hash_list):
        """
        Like a factory method to create list of objects from list of dictionary values
        for bulk_create()
        :param hash_list:
        :return: List[...ProteinModel objects]
        """
        object_list = []
        for _hash in hash_list:
            # instantiate Object
            protein_obj = cls(
                protein_id = _hash[Constants.PROTEIN_ID],
                accession = _hash[Constants.ACCESSION],
                average_mass = _hash[Constants.AVG_MASS],
                description = _hash[Constants.DESCRIPTION],
                cellular_processes = _hash[Constants.CELLULAR_PROCESSES],
                protein_functions = _hash[Constants.PROTEIN_FUNCTIONS],
                reactome_pathways = _hash[Constants.REACTOME_PATHWAYS]
            )
            # store object
            object_list.append(protein_obj)
        return object_list


class ProteinAbundanceModel(models.Model):
    protein_id = models.ForeignKey(ProteinModel, on_delete=models.CASCADE, related_name="protein_data")
    protein_abundance = models.PositiveBigIntegerField()
    hour = models.FloatField()

    upload_date = models.DateTimeField(auto_now_add=True)

    # renaming manager
    proteins = models.Manager()

    class Meta:
        ordering = ['upload_date', 'hour']

    def __str__(self):
        return f'Accession: {self.protein_id.accession} || hour: {self.hour} || Abundance: {self.protein_abundance}'

    @classmethod
    def list_from_hash(cls, hash_list, protein_model_list):
        """
        Like a factory method to create list of objects from list of dictionary values
        for bulk_create()
        :param hash_list, protein_model_list:
        :return: List[...ProteinAbundanceModel objects]
        """
        object_list = []

        for _index, _hash in enumerate(hash_list):
            for _key, _val in _hash.items():
                try:
                    # converting not numeric value will raise exception
                    _hour = float(_key)
                    # Some values come in as Scientific Notation...
                    _abundance = int(float(_val))
                    # instantiate object
                    _pro_abund = cls(
                        protein_id = protein_model_list[_index],
                        protein_abundance = _abundance,
                        hour=_hour)
                    # store object
                    object_list.append(_pro_abund)

                except Exception as _ex:
                    continue
        return object_list