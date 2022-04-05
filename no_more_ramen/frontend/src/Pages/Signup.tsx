import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { User, SignupUser } from '../type/type';
import { useHistory } from 'react-router-dom';
import { apiUrl } from '../utils';
import styled from 'styled-components';
import { Button, Message, Form, Input } from '../components/components';
import { ReactComponent as Noodle } from '../icons/noodle.svg';
import { NoodleIcon } from '../components/components';

const Signup = () => {
  const history = useHistory();

  const { register, watch, handleSubmit, formState } = useForm<SignupUser>({
  mode: 'onSubmit',
    reValidateMode: 'onChange',
      defaultValues: {
        username: '',
        email: '',
        password: '',
        password2: '',
    }
  });

  const handleOnSubmit: SubmitHandler<User> = async (values) => {
    console.log(values);

    return fetch (`${apiUrl}/account/create/`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(values)
    }).then((res) => {
        return res.json();
    }).then((data) => {
        //window.location.href = "http://localhost:3000/login";
        console.log(data);
        history.push(`/semd_email`);
    }).catch(()=>{
        console.log("error");
    });
  }

  const handleOnError: SubmitErrorHandler<User> = (errors) => {
    console.log(errors)
  }

  return (
    <>
        <NoodleIcon>
            <Noodle />
        </NoodleIcon>
        <Message>ユーザーネーム、メールと<br/>パスワードを入力して登録できます。</Message>

        <Form>
            <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} >

                <Input>
                    {!!formState.errors.username && 
                    <p>{formState.errors.username.message}</p>
                    }
                    <input
                    id='name'
                    type="text" 
                    {...register('username', {
                        required: '* this is required filed'
                    })} 
                    placeholder="Username"
                    />
                </Input>
                
                <Input>
                    {!!formState.errors.email && 
                    <p>{formState.errors.email.message}</p>
                    }
                    <input
                    id='email'
                    type="email" 
                    {...register('email', {
                        required: '* this is required filed'
                    })} 
                    placeholder="Example@gmail.com"
                    />
                </Input>
                
                <Input>
                    {!!formState.errors.password && 
                    <p>{formState.errors.password.message}</p>
                    }
                    <input
                    id='passwrod'
                    type="password" 
                    {...register('password', {
                        required: '* this is required filed'
                    })} 
                    placeholder="Password"
                    />
                </Input>

                <Input mb={47}>
                    {!!formState.errors.password2 && 
                    <p>{formState.errors.password2.message}</p>
                    }
                    <input
                    id='passwrod2'
                    type="password" 
                    {...register('password2', {
                        required: '* this is required filed'
                    })} 
                    placeholder="Password"
                    />
                </Input>
                

                <Button bgColor={"#2BAD62"} color={"#fff"} stroke={"none"} type="submit" disabled={!formState.isDirty || formState.isSubmitting}>
                    確認
                </Button>
            </form>
        </Form>
        
    </>
  )
}

export default Signup