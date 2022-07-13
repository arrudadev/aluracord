import { Box } from '@skynexui/components';

import appConfig from '../../config.json';

type BackgroundProps = {
  children: React.ReactNode;
};

export const Background = ({ children }: BackgroundProps) => (
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
    {children}
  </Box>
);
