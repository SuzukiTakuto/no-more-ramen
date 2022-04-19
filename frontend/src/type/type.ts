export type User = {
    username: string,
    email: string,
    password: string
}

export type SignupUser = {
    username: string,
    email: string,
    password: string,
    password2: string,
    sex: string
}

export type UpdataUser = {
    sex: string,
    icon_id: number,
    send_report: boolean
}

export type TimeSet = {
    yy: string;
    mm: string;
    dd: string;
    hour: string;
    min: string;
    sec: string;
}

export type RamenData = {
    type: string,
    volume: string,
    rice: boolean,
    date_time: string,
}

export type UserParam = {
    index: number;
    run: number;
    walk: number;
    days: number;
};

export type CalenderType = {
    week1: boolean[]
    week2: boolean[]
    week3: boolean[]
    week4: boolean[]
    week5: boolean[]
}

export type RankItem = {
    calorie_per_month: number,
    icon_id: number,
    username: string,
    rank: number
}