import React, { useState, useRef, useEffect, useContext } from "react";
import ChatMessage from "./ChatMessage";
import { ChatContext } from "../context/chatContext";
import Thinking from "./Thinking";
import { MdSend } from "react-icons/md";
import Filter from "bad-words";
import Modal from "./Modal";
import Setting from "./Setting";
import modelsManager from "../utils/ModelManagers";

/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const success = window.location.href.split( "user=");
  console.log(success,"oo")

  // const success=window.location.hr ef.split("https://dating-coach.ai42.app/")

  // const aiModel = 'ChatGPT'

  const [formValue, setFormValue] = useState("");
  const [thinking, setThinking] = useState(false);

  const [messages, addMessage] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  /**
   * Scrolls the chat area to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */

  /**
   * Sends our prompt to our API and get response to our request from openai.
   *
   * @param {Event} e - The submit event of the form.
   */
  const sendMessage = async (e) => {
    e.preventDefault();

    const filter = new Filter();
    const cleanPrompt = filter.isProfane(formValue)
      ? filter.clean(formValue)
      : formValue;

    let newMsg = cleanPrompt;

    const aiModel = "Personas";
    setThinking(true);
    setFormValue("");
    updateMessage(newMsg, false, aiModel);
    await modelsManager(
      aiModel,
      cleanPrompt,
      updateMessage,
      setThinking,
      success
    );
  };

  const updateMessage = async (newValue, ai = false, selected) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
      selected: `Personas`,
    };
    addMessage(newMsg);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // 👇 Get input value
      sendMessage(e);
    }
  };

  // if payment successfull store in localstorage

  const paymentSuccess = () => {
 
      // Get the current URL
      const currentUrl = window.location.href;
      
      // Split the URL to extract the part after '#'
      const hashPart = currentUrl.split('#')[1];
      if (hashPart) {
        // Split the hash part to extract the query parameters
        const paramsString = hashPart.split('?')[1];
      
        if (paramsString) {
          // Split the parameters and create an object
          const paramsArray = paramsString.split('&');
          const params = {};
          
          paramsArray.forEach(param => {
            const [key, value] = param.split('=');
            params[key] = value;
          });
  
          // Get the values of the "plan," "pay," and "user" parameters
          const plan = params.plan;
          const pay = params.pay;
          const user = params.user;
          localStorage.setItem("payment", `{"payment_status":"success"}`);
          localStorage.setItem("pay", `{"payamount":${pay}`);
          localStorage.setItem("plan", `{"subscribe_plan":"${plan}"}`);
          localStorage.setItem("user", `{"user_status":"${user}"}`);
        }
      }

return null
  };

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    paymentSuccess();
    inputRef.current.focus();
  }, []);

  /**
 screen Dimension 
*/
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <div className=" chatview" style={{ height: screenSize.height - 55 }}>
      <main className="chatview__chatarea">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={{ ...message }} />
        ))}

        {thinking && <Thinking />}

        <span ref={messagesEndRef}></span>
      </main>
      <form className="  form " onSubmit={sendMessage}>
        <div className="flex items-stretch justify-between w-full ">
          <textarea
            ref={inputRef}
            className=" chatview__textarea-message"
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button
            type="submit"
            className="chatview__btn-send "
            disabled={!formValue}
          >
            <MdSend size={30} />
          </button>
        </div>
      </form>
      <Modal title="Setting" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal>
    </div>
  );
};

export default ChatView;
