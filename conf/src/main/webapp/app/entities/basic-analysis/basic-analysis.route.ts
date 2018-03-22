import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BasicAnalysisComponent } from './basic-analysis.component';
import { BasicAnalysisDetailComponent } from './basic-analysis-detail.component';
import { BasicAnalysisPopupComponent } from './basic-analysis-dialog.component';
import { BasicAnalysisDeletePopupComponent } from './basic-analysis-delete-dialog.component';

export const basicAnalysisRoute: Routes = [
    {
        path: 'basic-analysis',
        component: BasicAnalysisComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BasicAnalyses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'basic-analysis/:id',
        component: BasicAnalysisDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BasicAnalyses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const basicAnalysisPopupRoute: Routes = [
    {
        path: 'basic-analysis-new',
        component: BasicAnalysisPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BasicAnalyses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'basic-analysis/:id/edit',
        component: BasicAnalysisPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BasicAnalyses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'basic-analysis/:id/delete',
        component: BasicAnalysisDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BasicAnalyses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
