import { Box, Text, Image } from '@skynexui/components';

import appConfig from '../../config.json';

type AvatarProps = {
  username: string;
};

export const Avatar = ({ username }: AvatarProps) => (
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
);
