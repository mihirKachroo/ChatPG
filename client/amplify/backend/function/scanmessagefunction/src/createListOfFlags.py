#-----------------------------------------------------------------------------
# Name:        WokeTalk Create List of Flags Algorithm
# Purpose:     Creates a List of Flags from CSV file
#
# References: 	This program uses the NumPy/SciPy style of documentation as found
#				here: https://numpydoc.readthedocs.io/en/latest/format.html with
#				some minor modifications based on Python 3 function annotations
#				(the -> notation).
#
# Author:      Mihir Kachroo
# Created:     18-Jan-2022
#-----------------------------------------------------------------------------

import csv
import pickle

def getFlagsListFromCSV():
    '''
    Creates a list of flags from csv about banned words (csv is ignored on git due to school policies)
        
    Returns
    -------
    Returns flags dictionary from csv
    '''
    flaggedWords = {}

    with open('bannedWordsFile.csv', newline='') as csvfile:
        reader = csv.reader(csvfile)

        for row in reader:
            word, flag = row
            flaggedWords[word.lower()] = flag
            
    return flaggedWords

def saveFlagList(dictionary):
    '''
    Creates a pickle of dictionary for faster use by code
    '''
    with open('savedListOfFlags.pkl', 'wb') as f:
        pickle.dump(dictionary, f)

response = getFlagsListFromCSV()
saveFlagList(response)
