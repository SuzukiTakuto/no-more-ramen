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
    username: string,
    sex: string,
    mail_delivery: boolean
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
    time: string,
}

export type UserParam = {
    index: number;
    run: number;
    walk: number;
    days: number;
};