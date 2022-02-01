import { Box, Text, Button } from '@skynexui/components';

export const Header = () => {
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
