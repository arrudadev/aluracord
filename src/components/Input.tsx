import { ChangeEvent, KeyboardEvent } from 'react';

import { TextField } from '@skynexui/components';

import appConfig from '../../config.json';

type InputProps = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
  type:
    | 'number'
    | 'textarea'
    | 'phone'
    | 'email'
    | 'password'
    | 'text'
    | undefined;
};

export const Input = ({
  name,
  placeholder,
  type,
  value,
  onChange,
  onKeyPress,
}: InputProps) => (
  <TextField
    name={name}
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    placeholder={placeholder}
    type={type}
    styleSheet={{
      width: '100%',
      border: '0',
      resize: 'none',
      borderRadius: '5px',
      padding: '8pxasdf',
      backgroundColor: appConfig.theme.colors.neutrals['800'],
      marginRight: '12px',
      color: appConfig.theme.colors.neutrals['200'],
    }}
  />
);
