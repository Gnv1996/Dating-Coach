import React from "react";
// import { MdComputer } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import moment from "moment";
import Image from "./Image";
import person from "../assets/man.png";
import { Link } from "react-router-dom";
import marry from "../assets/marry.png";
import { FontColor } from "../config";

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const ChatMessage = (props) => {
  const { id, createdAt, text, ai = false, selected } = props.message;


  return (
    <div
      key={id}
      className={`${ai && "flex-row-reverse bg-light-white"} message pr-[10px]`}
    >
      {selected === "DALL·E" && ai ? (
        <Image url={{ text }} />
      ) : (
        <div className="message__wrapper">
          {text === "payment" ? (
            <>
              <h6 style={{ color: FontColor }}>Please Subscribe</h6>
              <Link
                to="/subscribe"
                className="bg-[#2563eb] text-[white] font-semibold p-[3px] rounded-[7px] p-2"
              >
                Free tiral{" "}
              </Link>{" "}
            </>
          ) : (
            <>
              <div
                className={` text-xl  ${ai ? "text-left" : "text-right"}`}
                style={{ color: FontColor }}
              >
                {text}
              </div>
              <ReactMarkdown
                className={`message__markdown text-xl  ${
                  ai ? "text-left" : "text-right"
                }`}
                style={{ color: FontColor }}
                // children={text}
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}ṁl̥
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(
                      className || "language-js"
                    );
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, "")}
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}{" "}
                      </code>
                    );
                  },
                }}
              />
            </>
          )}

          <div
            className={`${ai ? "text-left" : "text-right"} message__createdAt`}
            style={{ color: FontColor }}
          >
            {moment(createdAt).calendar()}
          </div>
        </div>
      )}

      <div className="message__pic">
        {ai ? (
          <img
            className="rounded-full"
            loading="lazy"
            src={marry}
            alt="profile pic"
          />
        ) : (
          <img
            className="rounded-full "
            loading="lazy"
            src={person}
            alt="profile pic"
          />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
