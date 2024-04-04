export class User {
    constructor (
        public email: string,
        public level: string,
        public password?: string,
        public id?: string,
        public createdAt?: number
    ) {}
}