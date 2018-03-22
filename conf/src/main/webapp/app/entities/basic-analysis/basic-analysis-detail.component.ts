import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BasicAnalysis } from './basic-analysis.model';
import { BasicAnalysisService } from './basic-analysis.service';

@Component({
    selector: 'jhi-basic-analysis-detail',
    templateUrl: './basic-analysis-detail.component.html'
})
export class BasicAnalysisDetailComponent implements OnInit, OnDestroy {

    basicAnalysis: BasicAnalysis;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private basicAnalysisService: BasicAnalysisService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBasicAnalyses();
    }

    load(id) {
        this.basicAnalysisService.find(id)
            .subscribe((basicAnalysisResponse: HttpResponse<BasicAnalysis>) => {
                this.basicAnalysis = basicAnalysisResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBasicAnalyses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'basicAnalysisListModification',
            (response) => this.load(this.basicAnalysis.id)
        );
    }
}
