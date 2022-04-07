import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Noodle_small from '../icons/Noodle_small';
import Back from '../icons/Back';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { apiUrl } from '../utils';
import { Input, Button, BackIcon, Message } from '../components/components';
import { UpdataUser } from '../type/type';
import { MaleIcon, FamaleIcon, OtherIcon } from '../components/components';
import { useHistory, useParams } from 'react-router-dom';
import Icon1 from '../icons/Icon1'
import Icon2 from '../icons/Icon2'
import Icon3 from '../icons/Icon3'

type Props = {
    setHeight: React.Dispatch<React.SetStateAction<string>>
}

type Param = {
    state: string
}

const Setting = (props: Props) => {
  const history = useHistory();
  const [ color, setColor ] = useState('');
  const [ isSet, setIsSet ] = useState<boolean>(false);

  const param = useParams<Param>();
  useEffect(() => {
    switch (param.state) {
        case "health":
            setColor("#2BAD62")
            break;
        case "omg":
            setColor("#FFC400");
            break;
        case "danger":
            setColor("#E0470E");
            break;
        default:
            setColor("#2BAD62");
    }
  }, []);

  props.setHeight("667px");
  const [ sex, setSex] = useState("");
  const [ icon_id, setUserIcon ] = useState("");
  const [ send_report, setMailDeliver ] = useState<boolean>();

  const { register, watch, handleSubmit, formState } = useForm<UpdataUser>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
        sex: sex,
        icon_id: icon_id,
        mail_delivery: send_report,
    }
  });

  useEffect(() => {
      fetch(`${apiUrl}/account/information/`, {
        method: 'GET',
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem("token"),
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        setSex(data.sex);
        setUserIcon(data.icon_id);
        setMailDeliver(data.send_report);
      }).catch(() => {
        console.log('error');
      });
  }, []);

  const handleOnSubmit: SubmitHandler<UpdataUser> = async (values) => {
    values.sex = sex;
    if (send_report !== undefined) values.mail_delivery = send_report;
    values.icon_id = icon_id;
    console.log(values);

    return fetch (`${apiUrl}/account/update/`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': 'JWT ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(values),
    }).then((res) => {
        console.log(res);
        return res.json();
    }).then((data) => {
        console.log(data);
        if (data.status === 200) {
            setIsSet(true);
        }
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
            'Authorization': 'JWT ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
      }).then((res) => {
        console.log(res);
        return res.json();
      }).then((data) => {
          console.log(data);
          if (data.status === "205") {
              localStorage.removeItem("token");
              history.push("/usersetup");
          }
      }).catch((err: Error) => {
          console.log(err);
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
        
        {isSet ? <Message>設定が完了しました</Message> : null}
        
        <UpdataForm>
            <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} >
                <Sex>
                    <InputTitle color={color}>性別変更</InputTitle>
                    <MaleIcon selected={sex} color={color}>
                        <div onClick={() => {
                            setSex("male");
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.996" height="19.997" viewBox="0 0 19.996 19.997">
                                <path id="gender-male" d="M16.12,4.5V6.162h5.474L15.2,12.553a6.673,6.673,0,1,0,1.176,1.176l6.39-6.391v5.474h1.662V4.5ZM11.133,22.787A4.987,4.987,0,1,1,16.12,17.8,4.987,4.987,0,0,1,11.133,22.787Z" transform="translate(-4.437 -4.5)" fill={sex === "male" ? "#fff" : color} />
                            </svg>
                        </div>
                    </MaleIcon>
                    <OtherIcon selected={sex} color={color}>
                        <div onClick={() => {
                            setSex("other");
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19.997" viewBox="0 0 20 19.997">
                                <path id="genderless" d="M17.778,13.6A7.49,7.49,0,0,0,15.5,8.1,7.488,7.488,0,0,0,10,5.822,7.5,7.5,0,0,0,4.5,8.1,7.488,7.488,0,0,0,2.222,13.6,7.488,7.488,0,0,0,4.5,19.092,7.5,7.5,0,0,0,10,21.375a7.488,7.488,0,0,0,5.5-2.282A7.49,7.49,0,0,0,17.778,13.6ZM20,13.6a9.769,9.769,0,0,1-.79,3.88,9.854,9.854,0,0,1-5.33,5.329,9.924,9.924,0,0,1-7.76,0A9.854,9.854,0,0,1,.79,17.478a9.92,9.92,0,0,1,0-7.759A9.855,9.855,0,0,1,6.12,4.39a9.924,9.924,0,0,1,7.76,0,9.854,9.854,0,0,1,5.33,5.329A9.769,9.769,0,0,1,20,13.6Z" transform="translate(0 -3.6)" fill={sex === "other" ? "#fff" : color}/>
                            </svg>
                        </div>
                    </OtherIcon>
                    <FamaleIcon selected={sex} color={color}>
                        <div onClick={() => {
                            setSex("female");
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13.466" height="20.205" viewBox="0 0 13.466 20.205">
                                <path id="gender-female" d="M16.574,17.9a6.733,6.733,0,1,0-1.683,0v1.742H10.683V21.33h4.208V24.7h1.683V21.33h4.208V19.647H16.574Zm-5.891-6.674a5.05,5.05,0,1,1,5.05,5.05,5.05,5.05,0,0,1-5.05-5.05Z" transform="translate(-9 -4.492)" fill={sex === "female" ? "#fff" : color}/>
                            </svg>
                        </div>
                    </FamaleIcon>
                </Sex>

                <UserIcon>
                    <InputTitle color={color}>アイコン</InputTitle>
                    <Icon1 color={color} userIcon={icon_id} setUserIcon={setUserIcon} />
                    <Icon2 color={color} userIcon={icon_id} setUserIcon={setUserIcon} />
                    <Icon3 color={color} userIcon={icon_id} setUserIcon={setUserIcon} />

                </UserIcon>

                <MailDeliver>
                    <InputTitle color={color}>メール配信</InputTitle>
                    <MailDeliverSwitchYes color={color} mailDeliver={send_report} onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                        e.preventDefault();
                        setMailDeliver(true);
                    }}>はい</MailDeliverSwitchYes>
                    <MailDeliverSwitchNo color={color} mailDeliver={send_report} onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                        e.preventDefault();
                        setMailDeliver(false);
                    }}>いいえ</MailDeliverSwitchNo>
                </MailDeliver>


                <Button bgColor={color} color={"#fff"} stroke={"none"} type="submit">
                変更する
                </Button>
            </form>
        </UpdataForm>
        <Button onClick={() => logout()} bgColor={"#fff"} color={color} stroke={`1px solid ${color}`}>ログアウト</Button>
    </div>
  )
}

const NoodleIcon = styled.div`
    width: 49px;
    height: 49.55px;
    margin: 0 auto;
`;

const UpdataForm = styled.div`
    width: 280px;
    margin: 65px auto 162px;
`;

const Sex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MailDeliver = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InputTitle = styled.div<{color: string}>`
    margin: 10px 0 ;
    width: 38%;
    height: 35px;
    border: 1px solid ${({color}) => color};
    border-radius: 10px;
    text-align: center;
    line-height: 35px;
    color: #8C8C8C;
`;

const MailDeliverSwitchYes = styled.button<{mailDeliver?: boolean, color: string}>`
    cursor: pointer;
    width: 80px;
    height: 24px;
    text-align: center;
    font-size: 16px;
    color: ${({mailDeliver}) => mailDeliver ? "#fff;" : "#8c8c8c;" };
    background-color: ${({mailDeliver, color}) => mailDeliver ? color : "#fff;" };
    border: none;
    border-radius: 16px;
`;

const MailDeliverSwitchNo = styled.button<{mailDeliver?: boolean, color: string}>`
    cursor: pointer;
    width: 80px;
    height: 24px;
    text-align: center;
    font-size: 16px;
    color: ${({mailDeliver}) => mailDeliver ? "#8c8c8c;" : "#fff;" };
    background-color: ${({mailDeliver, color}) => mailDeliver ? "#fff;" : color };
    border: none;
    border-radius: 16px;
`;

const UserIcon = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default Setting