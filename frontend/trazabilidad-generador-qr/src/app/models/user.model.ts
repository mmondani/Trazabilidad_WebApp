export class User {
    constructor (
        public email: string,
        public level: string,
        public id?: string,
        public createdAt?: number
    ) {}
}