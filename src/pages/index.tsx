import { ChangeEvent, FormEvent, useState } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Text, TextField } from '@skynexui/components';

import appConfig from '../../config.json';
import { Avatar } from '../components/Avatar';
import { Background } from '../components/Background';
import { LoginFormWrapper } from '../components/LoginFormWrapper';
import { Title } from '../components/Title';

const Home: NextPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState('arrudadev');

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    router.push(`/chat?username=${username}`);
  }

  return (
    <Background>
      <LoginFormWrapper>
        {/* Formulário */}
        <Box
          as="form"
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: '100%', sm: '50%' },
            textAlign: 'center',
            marginBottom: '32px',
          }}
          // eslint-disable-next-line
          // @ts-ignore
          onSubmit={handleFormSubmit}
        >
          <Title tag="h1">Boas vindas de volta!</Title>

          <Text
            variant="body3"
            styleSheet={{
              marginBottom: '32px',
              color: appConfig.theme.colors.neutrals['300'],
            }}
          >
            {appConfig.name}
          </Text>

          <TextField
            fullWidth
            // eslint-disable-next-line
            // @ts-ignore
            textFieldColors={{
              neutral: {
                textColor: appConfig.theme.colors.neutrals['200'],
                mainColor: appConfig.theme.colors.neutrals['900'],
                mainColorHighlight: appConfig.theme.colors.primary['500'],
                backgroundColor: appConfig.theme.colors.neutrals['800'],
              },
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
          />

          <Button
            type="submit"
            label="Entrar"
            fullWidth
            buttonColors={{
              contrastColor: appConfig.theme.colors.neutrals['000'],
              mainColor: appConfig.theme.colors.primary['500'],
              mainColorLight: appConfig.theme.colors.primary['400'],
              mainColorStrong: appConfig.theme.colors.primary['600'],
            }}
          />
        </Box>
        {/* Formulário */}

        <Avatar username={username} />
      </LoginFormWrapper>
    </Background>
  );
};

export default Home;
