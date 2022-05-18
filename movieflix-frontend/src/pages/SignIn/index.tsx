import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, AnimationContainer, Copyright, LogoImage } from './styles';
import logoImg from '../../assets/Home/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/useAuth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      const form = formRef.current;
      try {
        form?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          form?.setErrors(error);
          return;
        }

        // eslint-disable-next-line no-console
        console.log({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoImage src={logoImg} alt='GoBarber' />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input name='email' icon={FiMail} placeholder='E-mail' type='email' autoComplete='email' />
            <Input name='password' icon={FiLock} placeholder='Senha' type='password' autoComplete='current-password' />
            <Button type='submit'>Entrar</Button>
          </Form>
          <Link to='/signup'>
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
        <Copyright>
          ❤️&nbsp;
          <a href='https://github.com/AlvaroIsrael/gobarber-app'>
            <strong>Álvaro Israel Nunes Leite</strong>
          </a>
          &nbsp;&copy; 2022
        </Copyright>
      </Content>
    </Container>
  );
};

export default SignIn;
