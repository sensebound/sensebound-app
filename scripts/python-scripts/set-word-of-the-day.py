from selenium import webdriver
from selenium.webdriver.common.by import By
import requests


def getWordOfTheDay():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")

    driver = webdriver.Chrome(options=options)

    driver.get('https://objectwriting.com/')

    content = driver.find_elements(By.TAG_NAME, "h1")

    wordOfTheDay = [x.text for x in content][0]

    wordOfTheDay = wordOfTheDay.capitalize()

    driver.quit()

    return wordOfTheDay



def setWordOfTheDay(word):
    url = 'https://backend.sensebound4.workers.dev/api/v1/words/post'
    json = {"word": str(word)}
    response = requests.post(url, json=json)
    return response
    



if __name__ == "__main__":
    word = getWordOfTheDay()
    response = setWordOfTheDay(word)
    print(response)
    
    

    
    



