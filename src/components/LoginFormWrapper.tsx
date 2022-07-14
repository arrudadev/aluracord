import { Box } from '@skynexui/components';

import appConfig from '../../config.json';

type LoginFormWrapperProps = {
  children: React.ReactNode;
};

export const LoginFormWrapper = ({ children }: LoginFormWrapperProps) => (
  <Box
    styleSheet={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: {
        xs: 'column',
        sm: 'row',
      },
      width: '100%',
      maxWidth: '700px',
      borderRadius: '5px',
      padding: '32px',
      margin: '16px',
      boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
      backgroundColor: appConfig.theme.colors.neutrals['700'],
    }}
  >
    {children}
  </Box>
);
