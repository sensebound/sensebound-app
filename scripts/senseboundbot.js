// from huggingface_hub import InferenceClient
// import requests


// def getWord():
//     response = requests.get("https://backend.sensebound4.workers.dev/api/v1/words/todayWord")
//     word = response.json()["todaysWord"]["word"]
//     return word


// def writeFor10minutes(word):

//     api_key = "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"
    
//     prompt = f"""
//     You have just woken up in the morning, your mind still foggy from sleep. For the next 10 minutes, write a sensory-based piece about {word}. You are to write for 10 minutes.Engage all five senses—sight, sound, smell, touch, and taste—while staying in this half-dream state. Let the word shape your experience as you slowly come into wakefulness. Don't overthink it; let the sensations guide you.

//     Example (Word: Coffee):

//     The scent reaches me first—rich, bitter, curling through the air like an invitation. My eyes are still heavy, resisting the morning light spilling through the blinds, but I can almost taste the warmth before the mug even reaches my lips. There’s a faint hum in the background, maybe the distant murmur of the city or just the soft gurgle of the coffee maker finishing its work. I wrap my fingers around the ceramic, tracing its smooth surface, the heat seeping into my skin. The first sip is a slow awakening, the taste deep and slightly burnt, but comforting. The world sharpens, breath by breath, sip by sip.

//     Only output the paragraph and nothing else.

//     """

//     inference = InferenceClient(model="meta-llama/Llama-3.2-3B-Instruct", token=api_key)

//     modelResponse = inference.text_generation(prompt, max_new_tokens=300)

//     return modelResponse

    

    

// if __name__ == "__main__":

//     word = getWord()
    
//     response = writeFor10minutes(word)

//     textfile = open("output.txt", "w")

//     textfile.write(response)

//     textfile.close()


import axios from 'axios'
import { HfInference } from '@huggingface/inference';
import { json } from 'stream/consumers';
import { getTokenSourceMapRange } from 'typescript';

const getWord = async () => {

    const response = await axios.get("https://backend.sensebound4.workers.dev/api/v1/words/todayWord");
    console.log("Word of the day recieved:: success")
    const word =  response.data['todaysWord']['word'];
    const id = response.data['todaysWord']['id'];
    

    return {
        word,
        id
    }
}

const getModelResponse = async (word) => {
    const api_key = "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";
    const hf = new HfInference(api_key);
    const prompt = `You have just woken up in the morning, your mind still foggy from sleep. For the next 10 minutes, write a sensory-based piece about ${word}. You are to write for 10 minutes which translates to 150-200 words. Make sure you include the word in the paragraph. Engage all five senses—sight, sound, smell, touch, and taste—while staying in this half-dream state. Let the word shape your experience as you slowly come into wakefulness. Don't overthink it; let the sensations guide you.Only output the paragraph and nothing else.`
    const response = await hf.textGeneration({
        model: "mistralai/Mistral-7B-Instruct-v0.3",
        inputs: prompt,
        parameters: {
            max_new_tokens: 300, 
            temperature: 0.9,    
        }
    })

    console.log("Model response recieved: success")

    return response.generated_text.split("\n")[2];
}

const getSignInToken = async (username, password) => {


    const response = await axios.post(
        "https://backend.sensebound4.workers.dev/api/v1/user/signin",
        { user: username,
          password: password }, // JSON payload
        {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
                "Accept": "application/json",
                "Connection": "keep-alive",
            }
        }
    )

    const user = response.data.user
    const token = response.data.token
    const user_id = response.data.user_id

    return {
        token,
        user_id
    }
}

const postWriteup = async (token, content, user_id, word_id ) => {

    const final_token = "Bearer " + token;
    const response = await axios.post(
        "https://backend.sensebound4.workers.dev/api/v1/writings/post",
        { 
            content:content,
            userId:user_id,
            wordId:word_id 
        
        }, // JSON payload
        {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
                "Accept": "application/json",
                "Connection": "keep-alive",
                "Authorization": final_token
            }
        }
    )


    
    return response

}


const wordObject = await getWord();

const word = wordObject.word;

const word_id = wordObject.id;

const postObject = await getSignInToken("senseboundbot","123123");

const user_id = postObject.user_id;

const token = postObject.token;


const content = await getModelResponse(word);

console.log(content);

const response = await postWriteup(token, content, user_id, word_id);

console.log(`Task:${response.data.post_id}`);





















