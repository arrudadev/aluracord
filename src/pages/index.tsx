import { ChangeEvent, FormEvent, useState } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Text, TextField, Image } from '@skynexui/components';

import appConfig from '../../config.json';
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

        {/* Photo Area */}
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '200px',
            padding: '16px',
            backgroundColor: appConfig.theme.colors.neutrals['800'],
            border: '1px solid',
            borderColor: appConfig.theme.colors.neutrals['999'],
            borderRadius: '10px',
            flex: 1,
            // eslint-disable-next-line
            // @ts-ignore
            minHeight: '240px',
          }}
        >
          <Image
            styleSheet={{
              borderRadius: '50%',
              marginBottom: '16px',
            }}
            src={`https://github.com/${username}.png`}
            alt={username}
          />

          <Text
            variant="body4"
            styleSheet={{
              color: appConfig.theme.colors.neutrals['200'],
              backgroundColor: appConfig.theme.colors.neutrals['900'],
              padding: '3px 10px',
              borderRadius: '1000px',
            }}
          >
            {username}
          </Text>
        </Box>
        {/* Photo Area */}
      </LoginFormWrapper>
    </Background>
  );
};

export default Home;
