export class LoginUser {
    constructor(public email, private _token) {}

    get token() {
        const expiry = (JSON.parse(atob(this._token.split('.')[1]))).exp;
        if ((Math.floor((new Date).getTime() / 1000)) >= expiry)
            return null;
        else
            return this._token;
    }
}