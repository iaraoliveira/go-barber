import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import LogoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={LogoImg} alt="GoBarber" />

      <form action="">
        <h1>Faça seu cadastro</h1>

        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

        <Button type="submit">Cadastrar</Button>
      </form>
      <a href="login">
        <FiArrowLeft />
        Voltar para logon
      </a>
    </Content>
  </Container>
);

export default SignUp;
