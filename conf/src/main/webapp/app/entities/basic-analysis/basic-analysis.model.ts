import { BaseEntity } from './../../shared';

export class BasicAnalysis implements BaseEntity {
    constructor(
        public id?: number,
        public technologyType?: string,
        public measure1?: number,
        public score?: number,
    ) {
    }
}
