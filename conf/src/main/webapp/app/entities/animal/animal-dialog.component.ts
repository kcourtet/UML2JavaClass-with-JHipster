import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Animal } from './animal.model';
import { AnimalPopupService } from './animal-popup.service';
import { AnimalService } from './animal.service';
import { BasicAnalysis, BasicAnalysisService } from '../basic-analysis';

@Component({
    selector: 'jhi-animal-dialog',
    templateUrl: './animal-dialog.component.html'
})
export class AnimalDialogComponent implements OnInit {

    animal: Animal;
    isSaving: boolean;

    basicanalyses: BasicAnalysis[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private animalService: AnimalService,
        private basicAnalysisService: BasicAnalysisService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.basicAnalysisService
            .query({filter: 'animal-is-null'})
            .subscribe((res: HttpResponse<BasicAnalysis[]>) => {
                if (!this.animal.basicAnalysis || !this.animal.basicAnalysis.id) {
                    this.basicanalyses = res.body;
                } else {
                    this.basicAnalysisService
                        .find(this.animal.basicAnalysis.id)
                        .subscribe((subRes: HttpResponse<BasicAnalysis>) => {
                            this.basicanalyses = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.animal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.animalService.update(this.animal));
        } else {
            this.subscribeToSaveResponse(
                this.animalService.create(this.animal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Animal>>) {
        result.subscribe((res: HttpResponse<Animal>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Animal) {
        this.eventManager.broadcast({ name: 'animalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBasicAnalysisById(index: number, item: BasicAnalysis) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-animal-popup',
    template: ''
})
export class AnimalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private animalPopupService: AnimalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.animalPopupService
                    .open(AnimalDialogComponent as Component, params['id']);
            } else {
                this.animalPopupService
                    .open(AnimalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
