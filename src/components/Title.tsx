import { ReactNode } from 'react';

import appConfig from '../../config.json';

type TitleProps = {
  tag: string;
  children: ReactNode;
};

export const Title = ({ tag, children }: TitleProps) => {
  const Tag: any = tag || 'h1';
  return (
    <>
      <Tag>{children}</Tag>

      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};
