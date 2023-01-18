import json
import pickle
import re

def getFlagDict():
    with open('savedListOfFlags.pkl', 'rb') as f:
        loadedList = pickle.load(f)
    return loadedList

def getInfoAboutFlag(flag):
    flagInfo = {
        'R': ['is offensive to certain racial/ethnic group.', 'https://www.ohrc.on.ca/en/racial-discrimination-race-and-racism-fact-sheet'],
        'B': ['is vulgar/insulting and can cause emotional damage.', 'https://thebakerorange.com/27914/voices/cursing-negatively-affects-society/'],
        'M': ['is discriminatory towards women.', 'https://www.nytimes.com/2019/03/08/style/misogyny-women-history-photographs.html'],
        'T': ['is offensive to transgender people.', 'https://www.verywellhealth.com/transphobia-5077602'],
        'H': ['expresses fear, discomfort or hatred towards LGBTQ+.', 'https://www.medicalnewstoday.com/articles/homophobia#internalized-homophobia'],
        'A': ['is hostile to or prejudiced against Jewish people.', 'https://www.adl.org/anti-semitism'],
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

def getFlagsInSentence(sentence):
    sentence = sentence.lower()
    flagDict = getFlagDict()

    # cleans sentence from punctuation and returns set of pure words
    cleanSentence = set(re.findall(r'[^\s!,.?":;0-9]+', sentence))
    print(flagDict)
    print(cleanSentence)

    flagsInSentence = []

    for word in cleanSentence:
        wordFlag = flagDict.get(word)
        if wordFlag != None:
            flagName = transformFlagToName(wordFlag)
            flagInfo = getInfoAboutFlag(wordFlag)

            flagObject = {
                'flagName': flagName,
                'flagDescription': word + ' ' + flagInfo[0],
                'flagInfoUrl': flagInfo[1]
            }

            flagsInSentence.append(flagObject)

            print(word, wordFlag)
            print(flagObject)
    
    return flagsInSentence


def handler(event, context):
    print('received event:')
    print(event)
    # body = event['body']
    body = json.loads(event['body'])
    sentence = body['sentence']
    print(sentence)

    flags = getFlagsInSentence(sentence)
    print('here are flags')
    print(flags)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(flags)
    }