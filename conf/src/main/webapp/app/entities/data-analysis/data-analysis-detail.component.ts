import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DataAnalysis } from './data-analysis.model';
import { DataAnalysisService } from './data-analysis.service';

@Component({
    selector: 'jhi-data-analysis-detail',
    templateUrl: './data-analysis-detail.component.html'
})
export class DataAnalysisDetailComponent implements OnInit, OnDestroy {

    dataAnalysis: DataAnalysis;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataAnalysisService: DataAnalysisService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDataAnalyses();
    }

    load(id) {
        this.dataAnalysisService.find(id)
            .subscribe((dataAnalysisResponse: HttpResponse<DataAnalysis>) => {
                this.dataAnalysis = dataAnalysisResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDataAnalyses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dataAnalysisListModification',
            (response) => this.load(this.dataAnalysis.id)
        );
    }
}
