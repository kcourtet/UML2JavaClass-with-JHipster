import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DataAnalysisComponent } from './data-analysis.component';
import { DataAnalysisDetailComponent } from './data-analysis-detail.component';
import { DataAnalysisPopupComponent } from './data-analysis-dialog.component';
import { DataAnalysisDeletePopupComponent } from './data-analysis-delete-dialog.component';

export const dataAnalysisRoute: Routes = [
    {
        path: 'data-analysis',
        component: DataAnalysisComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataAnalyses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'data-analysis/:id',
        component: DataAnalysisDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataAnalyses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataAnalysisPopupRoute: Routes = [
    {
        path: 'data-analysis-new',
        component: DataAnalysisPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataAnalyses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-analysis/:id/edit',
        component: DataAnalysisPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataAnalyses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-analysis/:id/delete',
        component: DataAnalysisDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataAnalyses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
