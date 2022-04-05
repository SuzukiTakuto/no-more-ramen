import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../utils';

type Param = {
    token: string;
}

const Complete = () => {
  const param = useParams<Param>();
  console.log(param.token);
  useEffect(() => {
      fetch(`${apiUrl}/account/create/complete/${param.token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
          return res.json();
      }).then((data) => {
        console.log(data.access)
        localStorage.setItem("token", data.access);
      }).catch(() => {
          console.log("error");
      });
  }, []);

  return (
    <div>登録完了</div>
  )
}

export default Complete