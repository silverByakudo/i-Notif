export interface UserData {
    email?: string;
    id?: string;
    lname?: string;
    fname?: string;
    photo?: {
        path?: string;
        url?: string;
    };
    number?:string;
    address?: string;
    type?: string;
}