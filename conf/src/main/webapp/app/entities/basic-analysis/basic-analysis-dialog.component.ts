import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BasicAnalysis } from './basic-analysis.model';
import { BasicAnalysisPopupService } from './basic-analysis-popup.service';
import { BasicAnalysisService } from './basic-analysis.service';

@Component({
    selector: 'jhi-basic-analysis-dialog',
    templateUrl: './basic-analysis-dialog.component.html'
})
export class BasicAnalysisDialogComponent implements OnInit {

    basicAnalysis: BasicAnalysis;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private basicAnalysisService: BasicAnalysisService,
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
        if (this.basicAnalysis.id !== undefined) {
            this.subscribeToSaveResponse(
                this.basicAnalysisService.update(this.basicAnalysis));
        } else {
            this.subscribeToSaveResponse(
                this.basicAnalysisService.create(this.basicAnalysis));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BasicAnalysis>>) {
        result.subscribe((res: HttpResponse<BasicAnalysis>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BasicAnalysis) {
        this.eventManager.broadcast({ name: 'basicAnalysisListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-basic-analysis-popup',
    template: ''
})
export class BasicAnalysisPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private basicAnalysisPopupService: BasicAnalysisPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.basicAnalysisPopupService
                    .open(BasicAnalysisDialogComponent as Component, params['id']);
            } else {
                this.basicAnalysisPopupService
                    .open(BasicAnalysisDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
