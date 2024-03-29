import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box } from '@skynexui/components';

import { Message } from '../@types';
import { Background } from '../components/Background';
import { ButtonSendSticker } from '../components/ButtonSendSticker';
import { ChatBox } from '../components/ChatBox';
import { ChatBoxWrapper } from '../components/ChatBoxWrapper';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { MessageList } from '../components/MessageList';
import { supabaseClient } from '../services/supabase';

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
    <Background>
      <ChatBoxWrapper>
        <Header />

        <ChatBox>
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
        </ChatBox>
      </ChatBoxWrapper>
    </Background>
  );
};

export default Chat;
