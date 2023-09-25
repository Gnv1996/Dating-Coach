
import { callPersona } from './callPersona';
import { ispayment_not_success } from '../config';
// commnon configs

// const key = process.env.REACT_APP_OPEN_AI_KEY



const modelsManager = async (aiModel, cleanPrompt, updateMessage, setThinking,success) => {


  try{
    switch (aiModel) {
    
        case 'Personas':
          await Persona(cleanPrompt, updateMessage, aiModel,success)
          break
  
      default:
        console.log("Not selected model")
    }
  }catch(e){
    alert("Server error, please try latter")
    console.error("model manager err : ", e)
  }

  setThinking(false);
}


let userData = null;
if (typeof window !== "undefined") {
  userData = JSON.parse(window.localStorage.getItem("userdata"));
}

const email = userData && userData.hasOwnProperty('email') ? userData.email : null


async function Persona(cleanPrompt, updateMessage, aiModel,success){
 
  try{

    const data = await callPersona(cleanPrompt,email, 1)
    console.log(data)
      updateMessage(success[1]==="verified"?data:ispayment_not_success, true, aiModel); 
    
  }catch(e){
    alert("Search GPT not works, please try latter")
    console.log("GPT error: ", e)
  }
}

export default modelsManager
