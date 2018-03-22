import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DataBasicAnalysisModule } from './basic-analysis/basic-analysis.module';
import { DataAnimalModule } from './animal/animal.module';
import { DataDataAnalysisModule } from './data-analysis/data-analysis.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DataBasicAnalysisModule,
        DataAnimalModule,
        DataDataAnalysisModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataEntityModule {}
