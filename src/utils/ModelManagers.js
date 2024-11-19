import { callPersona } from "./callPersona";
import { ispayment_not_success } from "../config";

// commnon configs

// const key = process.env.REACT_APP_OPEN_AI_KEY

const modelsManager = async (
  aiModel,
  cleanPrompt,
  updateMessage,
  setThinking,
  success,
  freePlan
) => {
  try {
    switch (aiModel) {
      case "Personas":
        if (!isUserLoggedIn()) {
          updateMessage("You Need to Login First", true, aiModel);
          setTimeout(() => {
            window.location.href = "/login"
          }, 1000);
        } else {
          await Persona(cleanPrompt, updateMessage, aiModel, success, freePlan);
        }

        break;

      default:
        console.log("Not selected model");
    }
  } catch (e) {
    alert("Server error, please try latter");
    console.error("model manager err : ", e);
  }

  setThinking(false);
};

let userData = JSON.parse(window.localStorage.getItem("userData")); // get useremail from localstorage

const email =
  userData && userData.hasOwnProperty("email") ? userData.email : null; // check hasOwnProperty useremail

// const myId = JSON.parse(localStorage.getItem("userData"));

// const response = await axios.post(api + "generate", {
//   prompt,
//   userId: userId ? userId : myId?.email,
//   persona,
// });

// const myId = JSON.parse(localStorage.getItem("userData"));

function isUserLoggedIn() {
  return email !== null;
}

async function Persona(cleanPrompt, updateMessage, aiModel, success, freePlan) {
  try {
    const data = await callPersona(cleanPrompt, email, 1);

    if (freePlan[1]) {
      updateMessage(data, true, aiModel);
    } else {
      updateMessage(
        success[1] === "verified" ? data : ispayment_not_success,
        true,
        aiModel
      );
    }
  } catch (e) {
    alert("Search GPT not works, please try latter");
    console.log("GPT error: ", e);
  }
}

export default modelsManager;
