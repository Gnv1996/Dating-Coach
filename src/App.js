import React from "react";
import SideBar from "./components/SideBar";
import ChatView from "./components/ChatView";
import { Routes, Route } from "react-router-dom";
import Payment from "./components/pages/Payment";
import UserSubscribe from "./components/pages/Subscripation";
import Login from "./components/pages/Login";

const App = () => {
  return (
    <>
      <SideBar />

      <Routes>
        <Route path="/" element={<ChatView />} />
        <Route path="/pay" element={<Payment />} />
        <Route path="/subscribe" element={<UserSubscribe />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
