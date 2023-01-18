import csv
import pickle

def getFlagsListFromCSV():
    flaggedWords = {}

    with open('bannedWordsFile.csv', newline='') as csvfile:
        reader = csv.reader(csvfile)

        for row in reader:
            word, flag = row
            flaggedWords[word.lower()] = flag
            
            # print(word, flag)

    return flaggedWords

def saveFlagList(dictionary):
    with open('savedListOfFlags.pkl', 'wb') as f:
        pickle.dump(dictionary, f)

response = getFlagsListFromCSV()
saveFlagList(response)
