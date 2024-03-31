import { Origin } from "./origin.model";

export class Batch {
    constructor(
        public originId: string,
        public week: number,
        public year: number,
        public from: number,
        public to: number,
        public createdAt?: number,
        public id?: string,
        public quantity?: number,
        public origin?: Origin
    ) {}
}