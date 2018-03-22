/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DataTestModule } from '../../../test.module';
import { BasicAnalysisDialogComponent } from '../../../../../../main/webapp/app/entities/basic-analysis/basic-analysis-dialog.component';
import { BasicAnalysisService } from '../../../../../../main/webapp/app/entities/basic-analysis/basic-analysis.service';
import { BasicAnalysis } from '../../../../../../main/webapp/app/entities/basic-analysis/basic-analysis.model';

describe('Component Tests', () => {

    describe('BasicAnalysis Management Dialog Component', () => {
        let comp: BasicAnalysisDialogComponent;
        let fixture: ComponentFixture<BasicAnalysisDialogComponent>;
        let service: BasicAnalysisService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataTestModule],
                declarations: [BasicAnalysisDialogComponent],
                providers: [
                    BasicAnalysisService
                ]
            })
            .overrideTemplate(BasicAnalysisDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BasicAnalysisDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BasicAnalysisService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BasicAnalysis(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.basicAnalysis = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'basicAnalysisListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BasicAnalysis();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.basicAnalysis = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'basicAnalysisListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
