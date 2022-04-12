import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BackIcon, Button } from '../components/components';
import Back from '../icons/Back';
import styled from 'styled-components';
import Noodle_small from '../icons/Noodle_small';
import Ramen from '../components/Ramen';
import Volume from '../components/Volume';
import Rice from '../components/Rice';
import { TimeSet, RamenData } from '../type/type';
import Time from '../components/Time';
import { QuestionText } from '../components/components';
import { apiUrl } from '../utils';

type Props = {
    setHeight: React.Dispatch<React.SetStateAction<string>>
}

type Color = {
    [key: string]: string
};

const colorState: Color = {
    "health": "#2BAD62",
    "omg": "#FFC400",
    "danger": "#E0470E" 
}

const RamenRecord = (props: Props) => {
    const history = useHistory();

    props.setHeight("667px");

    const [type, setType] = useState('');
    const [volume, setVolume] = useState('');
    const [rice, setRice] = useState(false);
    const [date_time, setTime] = useState<TimeSet>({
        yy: '2022',
        mm: '01',
        dd: '01',
        hour: '00',
        min: '00',
        sec: '00',
    });
    const [data, setData] = useState<RamenData>({
        type: '',
        volume: '',
        rice: false,
        date_time: '',
    });

    //ラーメンの種類
    const ramens = [
        {
            name: 'しお',
            value: 'Shio',
            state: 'health',
            fullName: '塩ラーメン',
        },
        {
            name: '醤油',
            value: 'Shoyu',
            state: 'health',
            fullName: '醤油ラーメン'
        },
        {
            name: '味噌',
            value: 'Miso',
            state: 'omg',
            fullName: '味噌ラーメン'
        },
        {
            name: '豚骨',
            value: 'Tonkotsu',
            state: 'omg',
            fullName: '豚骨ラーメン',
        },
        {
            name: '油そ',
            value: 'AburaSoba',
            state: 'omg',
            fullName: '油そば',
        },
        {
            name: 'つけ',
            value: 'Tsukemen',
            state: 'omg',
            fullName: 'つけ麺',
        },
        {
            name: '家系',
            value: 'Iekei',
            state: 'danger',
            fullName: '家系ラーメン',
        },
        {
            name: '二郎',
            value: 'Jiro',
            state: 'danger',
            fullName: '二郎ラーメン', 
        }
    ];


    const back = () => {
        history.push("/top");
    }

    useEffect(() => {
        console.log(type);
        setData({...data, type: type});
    }, [type]);
    useEffect(() => {
        console.log(volume);
        setData({...data, volume: volume});
    }, [volume]);
    useEffect(() => {
        console.log(rice);
        setData({...data, rice: rice});
    }, [rice]);
    useEffect(() => {
        console.log(type);
        setData({...data, date_time: `${date_time.yy}/${date_time.mm}/${date_time.dd}/${date_time.hour}:${date_time.min}`});
    }, [date_time]);


    const onClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);

        fetch(`${apiUrl}/ramen_record/create/`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem("token"),
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify(data),
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            if (data.status === 201) history.push(`/top`);
        }).catch(()=>{
            console.log("error");
        });
    }

  return (
    <div style={{margin: "-41.2px"}}>
        <BackIcon onClick={() => back()}>
            <Back />
        </BackIcon>
        <NoodleIcon>
            <Noodle_small />
        </NoodleIcon>

        <RamenList>
            {ramens.map((ramen) => {
                return (
                    <Ramen 
                        name={ramen.name} 
                        color={colorState[ramen.state]} 
                        value={ramen.value} 
                        fullName={ramen.fullName} 
                        type={type}
                        setType={setType}
                    />
                )
            })}
        </RamenList>

        <Volume volume={volume} setVolume={setVolume} />
        <Rice rice={rice} setRice={setRice} />
        <form name='timeForm' onSubmit={(e) => onClick(e)}>
                <TimeContainer>
                <QuestionText>食べたのはいつ？</QuestionText>
                <SelectTime>
                    
                    <select name="year" id="year" onChange={(e) => setTime({...date_time, yy: e.target.value})}>
                        <option value="2022" selected>2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                    <Span>/</Span>
                    <select name="month" id="month" onChange={(e) => setTime({...date_time, mm: e.target.value})}>
                        <option value="01" selected>01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <Span>/</Span>
                    <select style={{marginRight: "10px"}} name="day" id="day" onChange={(e) => setTime({...date_time, dd: e.target.value})}>
                        <option value="01" selected>01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="11">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>
                    <select name="hour" id="hour" onChange={(e) => setTime({...date_time, hour: e.target.value})}>
                        <option value="00" selected>00</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                    </select>
                    <Span>:</Span>
                    <select name="minute" id="minute" onChange={(e) => setTime({...date_time, min: e.target.value})}>
                        <option value="00" selected>00</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                        <option value="53">53</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="57">57</option>
                        <option value="58">58</option>
                        <option value="59">59</option>
                    </select>
                    
                    

                </SelectTime>
            </TimeContainer>
        <Button bgColor={"#2BAD62"} color={"#fff"} stroke={"1px solid #2BAD62"} mt={"22px auto 0;"}>追加</Button>
        </form>
    </div>
  )
}

const NoodleIcon = styled.div`
    width: 49px;
    height: 49.55px;
    margin: 0 auto;
`;

const RamenList = styled.div`
    width: 280px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 28.6px auto 16px;
`;

const TimeContainer = styled.div`
    width: 280px;
    margin: 8px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SelectTime = styled.div`
  width: 144px;
  height: 30px;
  border: 1px solid #2BAD62;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
   > select {
       color: #434343;
       border: none;
       background-color: #fff;
       font-size: 12px; 
       -webkit-appearance: none; 
       text-align: center; 
       height: 20px;
   }
`;

const Span = styled.span`
  line-height: 30px;
`;

export default RamenRecord