import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { apiUrl } from '../utils';
import { useHistory } from 'react-router-dom';
import {Button, Message, Form, Input, BackIcon} from '../components/components';
import { ReactComponent as Noodle } from '../icons/noodle.svg';
import { NoodleIcon } from '../components/components';
import Back from "../icons/Back";

type LoginUser = {
    email: string,
    password: string
};

const Login = () => {
  const history = useHistory();

  const back = () => {
      history.push("/usersetup");
  }

  const { register, watch, handleSubmit, formState } = useForm<LoginUser>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: {
          email: '',
          password: ''
      }
  });

  const handleOnSubmit: SubmitHandler<LoginUser> = async (values) => {
    console.log(values);

    return fetch (`${apiUrl}/account/login/`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(values),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        localStorage.setItem("token", data.access)
        console.log(data.access)
        history.push(`/top`);
    }).catch(()=>{
        console.log("error");
        history.push("/usersetup");
    });
  }

  const handleOnError: SubmitErrorHandler<LoginUser> = (errors) => {
    console.log(errors)
  }

  return (
    <>
        <BackIcon onClick={() => back()}>
            <Back />
        </BackIcon>
        <NoodleIcon>
            <Noodle />
        </NoodleIcon>
        <Message>メールとパスワード<br/>を入力してください。</Message>

        <Form login={true}>
            <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} >
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
                
                <Input mb={47}>
                    {!!formState.errors.password && 
                    <p>{formState.errors.password.message}</p>
                    }
                    <input
                    id='password'
                    type="password" 
                    {...register('password', {
                        required: '* this is required filed'
                    })} 
                    placeholder="Password"
                    />
                </Input>

                <Button bgColor={"#2BAD62"} color={"#fff"} stroke={"none"} type="submit" disabled={!formState.isDirty || formState.isSubmitting}>
                ログイン
                </Button>
            </form>
        </Form>
    </>
  )
}

export default Login