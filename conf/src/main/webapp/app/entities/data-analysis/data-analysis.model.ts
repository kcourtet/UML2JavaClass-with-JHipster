import { BaseEntity } from './../../shared';

export class DataAnalysis implements BaseEntity {
    constructor(
        public id?: number,
        public labtype?: string,
    ) {
    }
}
