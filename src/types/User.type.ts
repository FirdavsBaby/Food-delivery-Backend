
export interface UserT {
    username: string;
    password: string;
    role?: string;
    email: string;
    id?: string;
    created_at?: Date | string;
    isVerified?: boolean;
    location: location & string,
    balance: number
}


export interface location {
    latitude: number
    longitude: number
}
