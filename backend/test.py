# have red flags and warnings
#   Red flags would be bad words
#   Warnings would be pronouns (say like don't assume pronouns)

# use classes
# scan from data file
# output to file
# use recursion and iteration
# check for pronouns
# 

import csv
# Racism
# Mysoginy
# Transphobia
# Homophobia
# Anti semitism
# Bad words

# Sort the data first

# get synonyms


def transformFlagToMessage():
    return 'Do good'

flaggedWords = {}

with open('tempWords.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)

    for row in reader:
        word, flag = row
        flaggedWords[word] = flag
        print(word, flag) # [a, b]


banned_words = {"a","e","i","o","u"}

lyrics = input("Paste in the lyrics: ")

def checker(lyrics):
    for word in lyrics.casefold().split():
        if word in banned_words:
            print("This song says the word "+word)
            return True
    print("This song is profanity free")
    return False

res = checker(lyrics)



text  = "The Dormouse's story. Once upon a time there were three little sisters; and their names were Elsie, Lacie and Tillie; and they lived at the bottom of a well....badword..."

badwords = set(["badword", "badword1", ....])

textwords = set(word for word in text.split())
for badword in badwords.intersection(textwords):
    print("The bad word '{}' was found in the text".format(badword))




return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }