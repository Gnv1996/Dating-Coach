
import { callPersona } from './callPersona';
import { ispayment_not_success } from '../config';

// commnon configs

// const key = process.env.REACT_APP_OPEN_AI_KEY



const modelsManager = async (aiModel, cleanPrompt, updateMessage, setThinking,success,freePlan) => {


  try{
    switch (aiModel) {
    
        case 'Personas':
          await Persona(cleanPrompt, updateMessage, aiModel,success,freePlan)
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




 let userData = JSON.parse(window.localStorage.getItem("userData")); // get useremail from localstorage
  


const email = userData && userData.hasOwnProperty('email') ? userData.email : null   // check hasOwnProperty useremail 


async function Persona(cleanPrompt, updateMessage, aiModel,success,freePlan){

  try{

    const data = await callPersona(cleanPrompt,email, 1)
   
   if(freePlan[1]){
    updateMessage(data,true, aiModel); 
   }else{

     updateMessage(success[1]==="verified"?data:ispayment_not_success, true, aiModel); 
   }
      
    
  }catch(e){
    alert("Search GPT not works, please try latter")
    console.log("GPT error: ", e)
  }
}

export default modelsManager
