import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { User, SignupUser } from '../type/type';
import { useHistory } from 'react-router-dom';
import { apiUrl } from '../utils';
import styled from 'styled-components';
import {Button, Message, Form, Input, BackIcon} from '../components/components';
import { ReactComponent as Noodle } from '../icons/noodle.svg';
import { NoodleIcon } from '../components/components';
import { MaleIcon, FamaleIcon, OtherIcon, ErrorMessage } from '../components/components';
import Back from '../icons/Back';

const Signup = () => {
  const history = useHistory();
  const [ sex, setSex] = useState("male");
  const [ usernameError, setUsernameError ] = useState("");
  const [ emailError, setEmailError ] = useState("");
  const [ passwordError, setPasswordError ] = useState("");
  const [ password2Error, setPassword2Error ] = useState("");

  const back = () => {
      history.push("/usersetup");
  }

  const { register, watch, handleSubmit, formState } = useForm<SignupUser>({
  mode: 'onSubmit',
    reValidateMode: 'onChange',
      defaultValues: {
        username: '',
        email: '',
        password: '',
        password2: '',
        sex: '',
    }
  });

  const handleOnSubmit: SubmitHandler<SignupUser> = async (values) => {
    values.sex = sex;
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
        console.log("www")
        if (data.status === 201) {
            console.log(data)
            history.push(`/send_email`);
        } else {
            console.log(data)
            const error = Object.keys(data);
            console.log(error);
            switch (Object.keys(data.error)[0]) {
                case "username":
                    setUsernameError(data.error.username[0]);
                    setEmailError("");
                    setPasswordError("");
                    setPassword2Error("");
                    break;
                case "email":
                    setEmailError(data.error.email[0]);
                    setUsernameError("");
                    setPasswordError("");
                    setPassword2Error("");
                    break;
                case "password":
                    setPasswordError(data.error.password[0]);
                    setUsernameError("");
                    setEmailError("");
                    setPassword2Error("");
                    break;
                case "password2":
                    setPassword2Error(data.error.password2[0]);
                    setUsernameError("");
                    setEmailError("");
                    setPasswordError("");
                    break;
            }
        }
        
    }).catch(()=>{
        console.log("error");
    });
  }

  const handleOnError: SubmitErrorHandler<User> = (errors) => {
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
        <Message>ユーザーネーム、メールと<br/>パスワードを入力して登録できます。</Message>

        <Form login={false}>
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
                {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
                
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
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                
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
                {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

                <Input>
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
                {password2Error && <ErrorMessage>{password2Error}</ErrorMessage>}

                <Sex>
                    <SexInput>性別</SexInput>
                    <MaleIcon selected={sex} color={"#2bad62"}>
                        <div onClick={() => {
                            setSex("male");
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.996" height="19.997" viewBox="0 0 19.996 19.997">
                                <path id="gender-male" d="M16.12,4.5V6.162h5.474L15.2,12.553a6.673,6.673,0,1,0,1.176,1.176l6.39-6.391v5.474h1.662V4.5ZM11.133,22.787A4.987,4.987,0,1,1,16.12,17.8,4.987,4.987,0,0,1,11.133,22.787Z" transform="translate(-4.437 -4.5)" fill={sex === "male" ? "#fff" : "#2bad62"} />
                            </svg>
                        </div>
                    </MaleIcon>
                    <OtherIcon selected={sex} color={"#2bad62"}>
                        <div onClick={() => {
                            setSex("other");
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19.997" viewBox="0 0 20 19.997">
                                <path id="genderless" d="M17.778,13.6A7.49,7.49,0,0,0,15.5,8.1,7.488,7.488,0,0,0,10,5.822,7.5,7.5,0,0,0,4.5,8.1,7.488,7.488,0,0,0,2.222,13.6,7.488,7.488,0,0,0,4.5,19.092,7.5,7.5,0,0,0,10,21.375a7.488,7.488,0,0,0,5.5-2.282A7.49,7.49,0,0,0,17.778,13.6ZM20,13.6a9.769,9.769,0,0,1-.79,3.88,9.854,9.854,0,0,1-5.33,5.329,9.924,9.924,0,0,1-7.76,0A9.854,9.854,0,0,1,.79,17.478a9.92,9.92,0,0,1,0-7.759A9.855,9.855,0,0,1,6.12,4.39a9.924,9.924,0,0,1,7.76,0,9.854,9.854,0,0,1,5.33,5.329A9.769,9.769,0,0,1,20,13.6Z" transform="translate(0 -3.6)" fill={sex === "other" ? "#fff" : "#2bad62"}/>
                            </svg>
                        </div>
                    </OtherIcon>
                    <FamaleIcon selected={sex} color={"#2bad62"}>
                        <div onClick={() => {
                            setSex("female");
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13.466" height="20.205" viewBox="0 0 13.466 20.205">
                                <path id="gender-female" d="M16.574,17.9a6.733,6.733,0,1,0-1.683,0v1.742H10.683V21.33h4.208V24.7h1.683V21.33h4.208V19.647H16.574Zm-5.891-6.674a5.05,5.05,0,1,1,5.05,5.05,5.05,5.05,0,0,1-5.05-5.05Z" transform="translate(-9 -4.492)" fill={sex === "female "? "#fff" : "#2bad62"}/>
                            </svg>
                        </div>
                    </FamaleIcon>
                </Sex>
                
                

                <Button bgColor={"#2BAD62"} color={"#fff"} stroke={"none"} type="submit" disabled={!formState.isDirty || formState.isSubmitting}>
                    確認
                </Button>
            </form>
        </Form>
        
    </>
  )
}

const Sex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SexInput = styled.div`
    margin: 10px 0 ;
    width: 38%;
    height: 35px;
    border: 1px solid #2BAD62;
    border-radius: 10px;
    text-align: center;
    line-height: 35px;
`;



export default Signup