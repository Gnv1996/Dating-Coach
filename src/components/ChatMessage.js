import React from 'react';
import { MdComputer } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import moment from 'moment';
import Image from './Image';
import person from '../assets/person.png';

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
      className={`${ai && 'flex-row-reverse bg-light-white'} message pr-[10px]`}>
      {selected === 'DALL·E' && ai ? (
        <Image url={{text}} />
      ) : (
        <div className='message__wrapper'>
          {text==="payment"?<>Payment is reuired  <a href='http://localhost:3000/pay' className='bg-[#2563eb] text-[white] font-semibold p-[3px] rounded-[7px] '>PayNow </a> or <a href="http://localhost:3000/?plan=freetrial" className='bg-[#2563eb] text-[white] font-semibold p-[3px] rounded-[7px] '>Free tiral </a> </>:
          
          
          <ReactMarkdown
          className={`message__markdown ${ai ? 'text-left' : 'text-right'}`}
          
          children={text}
         
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || 'language-js');
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={atomDark}
                  language={match[1]}
                  PreTag='div'
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}{' '}
                </code>
              );
            },
          }}
        />
          
          }
         

          <div
            className={`${ai ? 'text-left' : 'text-right'} message__createdAt`}>
            {moment(createdAt).calendar()}
          </div>
        </div>
      )}

      <div className='message__pic'>
        {ai ? (
          <MdComputer />
        ) : (
          <img
            className='rounded-full'
            loading='lazy'
            src={person}
            alt='profile pic'
          />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;