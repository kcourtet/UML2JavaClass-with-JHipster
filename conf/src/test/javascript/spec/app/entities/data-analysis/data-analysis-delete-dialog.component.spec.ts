/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DataTestModule } from '../../../test.module';
import { DataAnalysisDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/data-analysis/data-analysis-delete-dialog.component';
import { DataAnalysisService } from '../../../../../../main/webapp/app/entities/data-analysis/data-analysis.service';

describe('Component Tests', () => {

    describe('DataAnalysis Management Delete Component', () => {
        let comp: DataAnalysisDeleteDialogComponent;
        let fixture: ComponentFixture<DataAnalysisDeleteDialogComponent>;
        let service: DataAnalysisService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataTestModule],
                declarations: [DataAnalysisDeleteDialogComponent],
                providers: [
                    DataAnalysisService
                ]
            })
            .overrideTemplate(DataAnalysisDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataAnalysisDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataAnalysisService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
