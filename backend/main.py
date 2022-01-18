# have red flags and warnings
#   Red flags would be bad words
#   Warnings would be pronouns (say like don't assume pronouns)

# try not to use pronouns


import csv
import pickle
import re

# Racism
# Misogyny
# Transphobia
# Homophobia
# Antisemitism
# Bad words

# output dict to file after reading once and sorting
# Sort the data first
# Search with binary search ----------------------------------

# on sentence post request
# return words that were flagged + why they was flagged + link to article


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
# print(response)
saveFlagList(response)

# -------------------------------------------------------------------------------------


def getFlagDict():
    with open('savedListOfFlags.pkl', 'rb') as f:
        loadedList = pickle.load(f)
    return loadedList

def getInfoAboutFlag(flag):
    flagInfo = {
        'R': ['This word is offensive to certain racial/ethnic group.', 'https://www.ohrc.on.ca/en/racial-discrimination-race-and-racism-fact-sheet'],
        'B': ['This word is vulgar/insulting and can cause emotional damage.', 'https://thebakerorange.com/27914/voices/cursing-negatively-affects-society/'],
        'M': ['This word is discriminatory towards women.', 'https://www.nytimes.com/2019/03/08/style/misogyny-women-history-photographs.html'],
        'T': ['This word is offensive to transgender people.', 'https://www.verywellhealth.com/transphobia-5077602'],
        'H': ['This word expresses fear, discomfort or hatred towards LGBTQ+.', 'https://www.medicalnewstoday.com/articles/homophobia#internalized-homophobia'],
        'A': ['This word is hostile to or prejudiced against Jewish people.', 'https://www.adl.org/anti-semitism'],
        'P': ['Ensure you use the correct gender pronouns.', 'https://uwm.edu/lgbtrc/support/gender-pronouns/']
    }
    return flagInfo[flag]


def transformFlagToName(flag):
    if flag == 'R':
        return 'Racism'
    elif flag == 'M':
        return 'Misogyny'
    elif flag == 'T':
        return 'Transphobia'
    elif flag == 'H':
        return 'Homophobia'
    elif flag == 'A':
        return 'Antisemitism'
    elif flag == 'P':
        return 'Pronoun'
        
    return 'Bad word'

# return list of {flagName, flagDescription, flagUrl}
def getFlagsInSentence(sentence):
    sentence = sentence.lower()
    flagDict = getFlagDict()
    print('\n')

    # cleans sentence from punctuation and returns set of pure words
    cleanSentence = set(re.findall(r'[^\s!,.?":;0-9]+', sentence))
    print(flagDict)
    print(cleanSentence)

    flagsInSentence = []

    for word in cleanSentence:
        wordFlag = flagDict.get(word)
        if wordFlag != None:
            flagInfo = getInfoAboutFlag(wordFlag)
            flagName = transformFlagToName(wordFlag)

            flagObject = {
                'flagName': flagName,
                'flagDescription': flagInfo[0],
                'flagInfoUrl': flagInfo[1]
            }

            flagsInSentence.append(flagObject)

            print(word, wordFlag)
            print(flagObject)
    
    return flagsInSentence

sentence = "This this is Bad, you abo." # lower sentence before sending
flags = getFlagsInSentence(sentence)
print(flags)