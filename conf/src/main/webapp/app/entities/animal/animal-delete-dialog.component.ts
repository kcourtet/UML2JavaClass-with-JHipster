import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Animal } from './animal.model';
import { AnimalPopupService } from './animal-popup.service';
import { AnimalService } from './animal.service';

@Component({
    selector: 'jhi-animal-delete-dialog',
    templateUrl: './animal-delete-dialog.component.html'
})
export class AnimalDeleteDialogComponent {

    animal: Animal;

    constructor(
        private animalService: AnimalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.animalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'animalListModification',
                content: 'Deleted an animal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-animal-delete-popup',
    template: ''
})
export class AnimalDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private animalPopupService: AnimalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.animalPopupService
                .open(AnimalDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
