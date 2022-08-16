import csv
from io import StringIO
import re

class Constants:
    PROTEIN_ID = "protein id"
    ACCESSION = "accession"
    AVG_MASS = "avg. mass"
    DESCRIPTION = "description"
    CELLULAR_PROCESSES = "cellular processes"
    PROTEIN_FUNCTIONS = "protein functions"
    REACTOME_PATHWAYS = "reactome pathways"

class CSV_File:
    """
    requires imports [io.StringIO, csv]
    To use: Instantiate this class and pass in the string csv data.
        Then, store results of object.hash_list getter

    Steps to hash data
    1.) run .clean() method to generate list
    2.) run .read_title() to extract title and provide for dynamic time values
    3.) run .hash_data() to create a list of dictionaries based on titles and data.
    4.) use the .hash_list getter to extract data.
    """
    def __init__(self, payload: str):
        self.__csv_reader = csv.reader(StringIO(payload), delimiter=',')
        self.__csv_list = []
        self.__cleaned_data = False
        self.__read_titles = False
        self.__hashed_data = False
        self.__title_list = []
        self.__hash_list = []


    def clean(self):
        """
        In certain cases, lists of empty strings may be generated.
        This method will filter them out.
        :return: List
        """
        for row in self.__csv_reader:
            # if any in the row are True, Accepted as OK
            if any(row):
                self.__csv_list.append(row)
        self.__cleaned_data = True

    def read_titles(self):
        """
        reads titles (first row) to adjust for different time points and help construct hashes.
        """
        if self.__cleaned_data:
            for title in self.__csv_list[0]:
                title = title.casefold().strip()
                # Match Statement introduced in python 3.10
                if title == Constants.ACCESSION:
                    self.__title_list.append(Constants.ACCESSION)
                    continue
                elif title == Constants.AVG_MASS:
                    self.__title_list.append(Constants.AVG_MASS)
                    continue
                elif title == Constants.DESCRIPTION:
                    self.__title_list.append(Constants.DESCRIPTION)
                    continue
                elif title == Constants.REACTOME_PATHWAYS:
                    self.__title_list.append(Constants.REACTOME_PATHWAYS)
                    continue
                elif title == Constants.PROTEIN_ID:
                    self.__title_list.append(Constants.PROTEIN_ID)
                    continue
                elif title == Constants.CELLULAR_PROCESSES:
                    self.__title_list.append(Constants.CELLULAR_PROCESSES)
                    continue
                elif title == Constants.PROTEIN_FUNCTIONS:
                    self.__title_list.append(Constants.PROTEIN_FUNCTIONS)
                    continue
                elif re.search("^[.][0-9]|^[0-9]", title):
                    hour = float(title.split()[0])
                    self.__title_list.append(hour)
                    continue
                else:
                    raise Exception("Unrecognized title")
        else:
            raise Exception("Must Clean Data First")
        self.__read_titles = True

    def hash_data(self):
        """
        Hash data to be easily read into database
        """
        if self.__cleaned_data:
            if self.__read_titles:
                for index, row in enumerate(self.__csv_list):
                    # first row is titles
                    if index > 0:
                        # Cast floats to strings for Hashing
                        str_titles = [str(_title) for _title in self.__title_list]

                        # Dictionary Comprehension
                        _hash = {str_titles[_index]: row[_index] for _index in range(len(str_titles))}
                        self.__hash_list.append(_hash)
            else:
                raise Exception("Must Read Titles First")
        else:
            raise Exception("Must Clean Data First")
        self.__hashed_data = True

    def get_hash_list(self):
        """
        Checks that correct processes have ran and returns the hash_list
        :return: hashed List of data
        """
        if not self.__cleaned_data:
            self.clean()
        if not self.__read_titles:
            self.read_titles()
        if not self.__hashed_data:
            self.hash_data()
        return self.__hash_list

    # Setting Getter for hash_list
    hash_list = property(get_hash_list)