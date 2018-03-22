import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataAnalysis } from './data-analysis.model';
import { DataAnalysisPopupService } from './data-analysis-popup.service';
import { DataAnalysisService } from './data-analysis.service';

@Component({
    selector: 'jhi-data-analysis-delete-dialog',
    templateUrl: './data-analysis-delete-dialog.component.html'
})
export class DataAnalysisDeleteDialogComponent {

    dataAnalysis: DataAnalysis;

    constructor(
        private dataAnalysisService: DataAnalysisService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataAnalysisService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dataAnalysisListModification',
                content: 'Deleted an dataAnalysis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-analysis-delete-popup',
    template: ''
})
export class DataAnalysisDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataAnalysisPopupService: DataAnalysisPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dataAnalysisPopupService
                .open(DataAnalysisDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
