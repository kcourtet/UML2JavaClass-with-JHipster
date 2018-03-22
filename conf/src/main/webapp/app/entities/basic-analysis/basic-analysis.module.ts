import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataSharedModule } from '../../shared';
import {
    BasicAnalysisService,
    BasicAnalysisPopupService,
    BasicAnalysisComponent,
    BasicAnalysisDetailComponent,
    BasicAnalysisDialogComponent,
    BasicAnalysisPopupComponent,
    BasicAnalysisDeletePopupComponent,
    BasicAnalysisDeleteDialogComponent,
    basicAnalysisRoute,
    basicAnalysisPopupRoute,
} from './';

const ENTITY_STATES = [
    ...basicAnalysisRoute,
    ...basicAnalysisPopupRoute,
];

@NgModule({
    imports: [
        DataSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BasicAnalysisComponent,
        BasicAnalysisDetailComponent,
        BasicAnalysisDialogComponent,
        BasicAnalysisDeleteDialogComponent,
        BasicAnalysisPopupComponent,
        BasicAnalysisDeletePopupComponent,
    ],
    entryComponents: [
        BasicAnalysisComponent,
        BasicAnalysisDialogComponent,
        BasicAnalysisPopupComponent,
        BasicAnalysisDeleteDialogComponent,
        BasicAnalysisDeletePopupComponent,
    ],
    providers: [
        BasicAnalysisService,
        BasicAnalysisPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataBasicAnalysisModule {}
