export class LoginUser {
    constructor(public email:string, private _token: string) {}

    get token() {
        const expiry = (JSON.parse(atob(this._token.split('.')[1]))).exp;
        if ((Math.floor((new Date).getTime() / 1000)) >= expiry)
            return null;
        else
            return this._token;
    }

    get level() {
        return (JSON.parse(atob(this._token.split('.')[1]))).level;
    }

    get userId() {
        return (JSON.parse(atob(this._token.split('.')[1]))).userId;
    }
}