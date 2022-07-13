import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Text, Image } from '@skynexui/components';

import appConfig from '../../config.json';
import { ButtonSendSticker } from '../components/ButtonSendSticker';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { supabaseClient } from '../services/supabase';

type Message = {
  id: number;
  author: string;
  text: string;
};

type MessageListProps = {
  messages: Message[];
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
                src={`https://github.com/${message.author}.png`}
                alt={message.author}
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
            {message.text.startsWith(':sticker:') ? (
              <Image
                src={message.text.replace(':sticker:', '')}
                alt={message.text.replace(':sticker:', '')}
              />
            ) : (
              message.text
            )}
          </Text>
        );
      })}
    </Box>
  );
};

const Chat: NextPage = () => {
  const router = useRouter();

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<Message[]>([]);

  const userLoggedIn = router.query.username as string;

  const handleSendNewMessage = async (messageText: string) => {
    const newMessage: Omit<Message, 'id'> = {
      author: userLoggedIn,
      text: messageText,
    };

    const response = await supabaseClient.from('messages').insert([newMessage]);

    const insertedMessage = response.data?.[0] as Message;

    setMessageList([insertedMessage, ...messageList]);
    setMessage('');
  };

  const handleInputMessageKeyPress = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendNewMessage(message);
    }
  };

  const handleInputMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendSticker = (sticker: string) => {
    handleSendNewMessage(`:sticker: ${sticker}`);
  };

  const listenMessages = (
    handleAddNewMessages: (newMessage: string) => void,
  ) => {
    return supabaseClient
      .from('messages')
      .on('INSERT', liveResponse => {
        handleAddNewMessages(liveResponse.new);
      })
      .subscribe();
  };

  useEffect(() => {
    supabaseClient
      .from('messages')
      .select('*')
      .order('id', { ascending: false })
      .then(response => {
        setMessageList(response.data as Message[]);
      });

    const subscription = listenMessages(newMessage => {
      setMessageList((currentMessageList: any) => {
        return [newMessage, ...currentMessageList];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
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
            <Input
              name="message"
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              value={message}
              onChange={handleInputMessageChange}
              onKeyPress={handleInputMessageKeyPress}
            />

            <ButtonSendSticker onClick={handleSendSticker} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
