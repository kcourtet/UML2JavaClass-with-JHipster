import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BasicAnalysis } from './basic-analysis.model';
import { BasicAnalysisPopupService } from './basic-analysis-popup.service';
import { BasicAnalysisService } from './basic-analysis.service';

@Component({
    selector: 'jhi-basic-analysis-delete-dialog',
    templateUrl: './basic-analysis-delete-dialog.component.html'
})
export class BasicAnalysisDeleteDialogComponent {

    basicAnalysis: BasicAnalysis;

    constructor(
        private basicAnalysisService: BasicAnalysisService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.basicAnalysisService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'basicAnalysisListModification',
                content: 'Deleted an basicAnalysis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-basic-analysis-delete-popup',
    template: ''
})
export class BasicAnalysisDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private basicAnalysisPopupService: BasicAnalysisPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.basicAnalysisPopupService
                .open(BasicAnalysisDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
