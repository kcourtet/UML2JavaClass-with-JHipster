import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Animal } from './animal.model';
import { AnimalService } from './animal.service';

@Component({
    selector: 'jhi-animal-detail',
    templateUrl: './animal-detail.component.html'
})
export class AnimalDetailComponent implements OnInit, OnDestroy {

    animal: Animal;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private animalService: AnimalService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAnimals();
    }

    load(id) {
        this.animalService.find(id)
            .subscribe((animalResponse: HttpResponse<Animal>) => {
                this.animal = animalResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAnimals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'animalListModification',
            (response) => this.load(this.animal.id)
        );
    }
}
