import React from 'react';

type Props = {
    color: string;
    isCalender: boolean;
    setIsCalender: React.Dispatch<React.SetStateAction<boolean>>;
}

const Arrow = (props: Props) => {
  return (
    <div onClick={() => props.setIsCalender(!props.isCalender)} style={{textAlign: "center", cursor: "pointer"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="13.931" height="6.963" viewBox="0 0 13.931 6.963">
            <path id="arrow-ios-back-fill" d="M17.8,21.429a1,1,0,0,1-.776-.368l-4.806-5.97a1,1,0,0,1,0-1.264l4.975-5.97a1,1,0,1,1,1.532,1.274l-4.447,5.333,4.3,5.333a.995.995,0,0,1-.776,1.632Z" transform="translate(21.429 -11.989) rotate(90)" fill={props.color}/>
        </svg>
    </div>
  )
}

export default Arrow