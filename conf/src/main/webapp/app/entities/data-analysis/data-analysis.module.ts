import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataSharedModule } from '../../shared';
import {
    DataAnalysisService,
    DataAnalysisPopupService,
    DataAnalysisComponent,
    DataAnalysisDetailComponent,
    DataAnalysisDialogComponent,
    DataAnalysisPopupComponent,
    DataAnalysisDeletePopupComponent,
    DataAnalysisDeleteDialogComponent,
    dataAnalysisRoute,
    dataAnalysisPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dataAnalysisRoute,
    ...dataAnalysisPopupRoute,
];

@NgModule({
    imports: [
        DataSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DataAnalysisComponent,
        DataAnalysisDetailComponent,
        DataAnalysisDialogComponent,
        DataAnalysisDeleteDialogComponent,
        DataAnalysisPopupComponent,
        DataAnalysisDeletePopupComponent,
    ],
    entryComponents: [
        DataAnalysisComponent,
        DataAnalysisDialogComponent,
        DataAnalysisPopupComponent,
        DataAnalysisDeleteDialogComponent,
        DataAnalysisDeletePopupComponent,
    ],
    providers: [
        DataAnalysisService,
        DataAnalysisPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataDataAnalysisModule {}
