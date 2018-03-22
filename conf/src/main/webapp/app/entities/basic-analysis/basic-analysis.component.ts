import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BasicAnalysis } from './basic-analysis.model';
import { BasicAnalysisService } from './basic-analysis.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-basic-analysis',
    templateUrl: './basic-analysis.component.html'
})
export class BasicAnalysisComponent implements OnInit, OnDestroy {
basicAnalyses: BasicAnalysis[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private basicAnalysisService: BasicAnalysisService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.basicAnalysisService.query().subscribe(
            (res: HttpResponse<BasicAnalysis[]>) => {
                this.basicAnalyses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBasicAnalyses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BasicAnalysis) {
        return item.id;
    }
    registerChangeInBasicAnalyses() {
        this.eventSubscriber = this.eventManager.subscribe('basicAnalysisListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
