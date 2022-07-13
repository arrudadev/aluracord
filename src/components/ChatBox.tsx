import { Box } from '@skynexui/components';

import appConfig from '../../config.json';

type ChatBoxProps = {
  children: React.ReactNode;
};

export const ChatBox = ({ children }: ChatBoxProps) => (
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
    {children}
  </Box>
);
