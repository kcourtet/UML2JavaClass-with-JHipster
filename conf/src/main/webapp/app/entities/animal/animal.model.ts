import { BaseEntity } from './../../shared';

export class Animal implements BaseEntity {
    constructor(
        public id?: number,
        public legacyid?: string,
        public species?: string,
        public basicAnalysis?: BaseEntity,
    ) {
    }
}
