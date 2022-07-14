import type { NextPage } from 'next';

import { Background } from '../components/Background';
import { LoginForm } from '../components/LoginForm';

const Home: NextPage = () => {
  return (
    <Background>
      <LoginForm />
    </Background>
  );
};

export default Home;
