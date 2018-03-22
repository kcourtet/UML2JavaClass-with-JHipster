import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataAnalysis } from './data-analysis.model';
import { DataAnalysisPopupService } from './data-analysis-popup.service';
import { DataAnalysisService } from './data-analysis.service';

@Component({
    selector: 'jhi-data-analysis-dialog',
    templateUrl: './data-analysis-dialog.component.html'
})
export class DataAnalysisDialogComponent implements OnInit {

    dataAnalysis: DataAnalysis;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataAnalysisService: DataAnalysisService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dataAnalysis.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dataAnalysisService.update(this.dataAnalysis));
        } else {
            this.subscribeToSaveResponse(
                this.dataAnalysisService.create(this.dataAnalysis));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DataAnalysis>>) {
        result.subscribe((res: HttpResponse<DataAnalysis>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DataAnalysis) {
        this.eventManager.broadcast({ name: 'dataAnalysisListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-data-analysis-popup',
    template: ''
})
export class DataAnalysisPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataAnalysisPopupService: DataAnalysisPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dataAnalysisPopupService
                    .open(DataAnalysisDialogComponent as Component, params['id']);
            } else {
                this.dataAnalysisPopupService
                    .open(DataAnalysisDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
