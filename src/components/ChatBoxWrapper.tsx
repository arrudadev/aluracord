import { Box } from '@skynexui/components';

import appConfig from '../../config.json';

type ChatBoxWrapperProps = {
  children: React.ReactNode;
};

export const ChatBoxWrapper = ({ children }: ChatBoxWrapperProps) => (
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
    {children}
  </Box>
);
