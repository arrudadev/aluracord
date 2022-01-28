import { ChangeEvent, useEffect, useState } from 'react';

import type { NextPage } from 'next';

import { Box, Text, TextField, Image, Button } from '@skynexui/components';

import appConfig from '../../config.json';
import { supabaseClient } from '../services/supabase';

type Message = {
  id: number;
  author: string;
  text: string;
};

type MessageListProps = {
  messages: Message[];
};

const Header = () => {
  return (
    <Box
      styleSheet={{
        width: '100%',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text variant="heading5">Chat</Text>
      <Button
        variant="tertiary"
        // eslint-disable-next-line
        // @ts-ignore
        colorVariant="neutral"
        label="Logout"
        href="/"
      />
    </Box>
  );
};

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
      }}
    >
      {messages.map(message => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals['700'],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src="https://github.com/arrudadev.png"
                alt="Alexandre"
              />
              <Text tag="strong">{message.author}</Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals['300'],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {message.text}
          </Text>
        );
      })}
    </Box>
  );
};

const Chat: NextPage = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<Message[]>([]);

  const handleSendNewMessage = async () => {
    const newMessage: Omit<Message, 'id'> = {
      author: 'arrudadev',
      text: message,
    };

    const response = await supabaseClient.from('messages').insert([newMessage]);

    const insertedMessage = response.data?.[0] as Message;

    setMessageList([insertedMessage, ...messageList]);
    setMessage('');
  };

  const handleInputMessageKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendNewMessage();
    }
  };

  useEffect(() => {
    supabaseClient
      .from('messages')
      .select('*')
      .order('id', { ascending: false })
      .then(response => {
        setMessageList(response.data as Message[]);
      });
  }, []);

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary['500'],
        // eslint-disable-next-line
        // @ts-ignore
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals['700'],
          height: '100%',
          maxWidth: '95%',
          // eslint-disable-next-line
          // @ts-ignore
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals['600'],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList messages={messageList} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={message}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setMessage(event.target.value)
              }
              // eslint-disable-next-line
              // @ts-ignore
              onKeyPress={handleInputMessageKeyPress}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals['800'],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals['200'],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
