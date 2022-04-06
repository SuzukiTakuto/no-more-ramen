import React, { useState } from 'react';
import styled from 'styled-components';
import Noodle_small from '../icons/Noodle_small';
import Back from '../icons/Back';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { apiUrl } from '../utils';
import { Input, Button } from '../components/components';
import { UpdataUser } from '../type/type';
import { MaleIcon, FamaleIcon, OtherIcon } from '../components/components';
import { useHistory } from 'react-router-dom';

type Props = {
    setHeight: React.Dispatch<React.SetStateAction<string>>
}

const Setting = (props: Props) => {
  const history = useHistory();

  props.setHeight("667px");
  const [ sex, setSex] = useState("");
  const [ male, setMale ] = useState(false);
  const [ famale, setFamale ] = useState(false);
  const [ other, setOther ] = useState(false);

  const { register, watch, handleSubmit, formState } = useForm<UpdataUser>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
        username: '',
        sex: ''
    }
  });

  const handleOnSubmit: SubmitHandler<UpdataUser> = async (values) => {
    values.sex = sex;
    console.log(values);

    return fetch (`${apiUrl}/api/token/`, {
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
        localStorage.setItem("token", data.token)
        console.log(data.token);
    }).catch(()=>{
        console.log("error");
    });
  }

  const handleOnError: SubmitErrorHandler<UpdataUser> = (errors) => {
    console.log(errors)
  }

  const logout = () => {
      fetch(`${apiUrl}/account/logout/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
      }).then((res) => {
        return res.json();
      }).then((data) => {
          if (data.status === "205") history.push("/usersetup");
      }).catch(() => {
          console.log("error");
      });
  }

  const back = () => {
      history.push("/top");
  }

  return (
    <div>
        <BackIcon onClick={() => back()}>
            <Back />
        </BackIcon>
        <NoodleIcon>
            <Noodle_small />
        </NoodleIcon>


        <UpdataForm>
            <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} >
                <Input>
                    {!!formState.errors.username && 
                    <p>{formState.errors.username.message}</p>
                    }
                    <input
                    id='username'
                    type="text" 
                    {...register('username', {
                        required: '* this is required filed'
                    })} 
                    placeholder="ユーザー名変更"
                    />
                </Input>
                
                <Sex>
                    <SexInput>性別変更</SexInput>
                    <MaleIcon select={male}>
                        <div onClick={() => {
                            setSex("male");
                            setMale(true);
                            setFamale(false);
                            setOther(false);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.996" height="19.997" viewBox="0 0 19.996 19.997">
                                <path id="gender-male" d="M16.12,4.5V6.162h5.474L15.2,12.553a6.673,6.673,0,1,0,1.176,1.176l6.39-6.391v5.474h1.662V4.5ZM11.133,22.787A4.987,4.987,0,1,1,16.12,17.8,4.987,4.987,0,0,1,11.133,22.787Z" transform="translate(-4.437 -4.5)" fill={male ? "#fff" : "#2bad62"} />
                            </svg>
                        </div>
                    </MaleIcon>
                    <OtherIcon select={other}>
                        <div onClick={() => {
                            setSex("other");
                            setMale(false);
                            setFamale(false);
                            setOther(true);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19.997" viewBox="0 0 20 19.997">
                                <path id="genderless" d="M17.778,13.6A7.49,7.49,0,0,0,15.5,8.1,7.488,7.488,0,0,0,10,5.822,7.5,7.5,0,0,0,4.5,8.1,7.488,7.488,0,0,0,2.222,13.6,7.488,7.488,0,0,0,4.5,19.092,7.5,7.5,0,0,0,10,21.375a7.488,7.488,0,0,0,5.5-2.282A7.49,7.49,0,0,0,17.778,13.6ZM20,13.6a9.769,9.769,0,0,1-.79,3.88,9.854,9.854,0,0,1-5.33,5.329,9.924,9.924,0,0,1-7.76,0A9.854,9.854,0,0,1,.79,17.478a9.92,9.92,0,0,1,0-7.759A9.855,9.855,0,0,1,6.12,4.39a9.924,9.924,0,0,1,7.76,0,9.854,9.854,0,0,1,5.33,5.329A9.769,9.769,0,0,1,20,13.6Z" transform="translate(0 -3.6)" fill={other ? "#fff" : "#2bad62"}/>
                            </svg>
                        </div>
                    </OtherIcon>
                    <FamaleIcon select={famale}>
                        <div onClick={() => {
                            setSex("famale");
                            setMale(false);
                            setFamale(true);
                            setOther(false);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13.466" height="20.205" viewBox="0 0 13.466 20.205">
                                <path id="gender-female" d="M16.574,17.9a6.733,6.733,0,1,0-1.683,0v1.742H10.683V21.33h4.208V24.7h1.683V21.33h4.208V19.647H16.574Zm-5.891-6.674a5.05,5.05,0,1,1,5.05,5.05,5.05,5.05,0,0,1-5.05-5.05Z" transform="translate(-9 -4.492)" fill={famale ? "#fff" : "#2bad62"}/>
                            </svg>
                        </div>
                    </FamaleIcon>
                </Sex>

                <Button bgColor={"#2BAD62"} color={"#fff"} stroke={"none"} type="submit" disabled={!formState.isDirty || formState.isSubmitting}>
                変更する
                </Button>
            </form>
        </UpdataForm>
        <Button onClick={() => logout()} bgColor={"#fff"} color={"#2BAD62"} stroke={"1px solid #2BAD62"}>ログアウト</Button>
    </div>
  )
}

const BackIcon = styled.button`
    position: absolute;
    top: 44.7px;
    left: 29.5px;
    border: none;
    background-color: #fff;
    cursor: pointer;
`;

const NoodleIcon = styled.div`
    width: 49px;
    height: 49.55px;
    margin: 0 auto;
`;

const UpdataForm = styled.div`
    width: 280px;
    margin: 80px auto 162px;
`;

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
    color: #8C8C8C;
`;

export default Setting