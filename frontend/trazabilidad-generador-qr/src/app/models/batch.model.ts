import { Origin } from "./origin.model";

export class Batch {
    constructor(
        public id: string,
        public createdAt: number,
        public originId: string,
        public week: number,
        public year: number,
        public from: number,
        public to: number,
        public quantity?: number,
        public origin?: Origin
    ) {}
}