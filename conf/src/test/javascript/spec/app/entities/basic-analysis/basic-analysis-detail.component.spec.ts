/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DataTestModule } from '../../../test.module';
import { BasicAnalysisDetailComponent } from '../../../../../../main/webapp/app/entities/basic-analysis/basic-analysis-detail.component';
import { BasicAnalysisService } from '../../../../../../main/webapp/app/entities/basic-analysis/basic-analysis.service';
import { BasicAnalysis } from '../../../../../../main/webapp/app/entities/basic-analysis/basic-analysis.model';

describe('Component Tests', () => {

    describe('BasicAnalysis Management Detail Component', () => {
        let comp: BasicAnalysisDetailComponent;
        let fixture: ComponentFixture<BasicAnalysisDetailComponent>;
        let service: BasicAnalysisService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataTestModule],
                declarations: [BasicAnalysisDetailComponent],
                providers: [
                    BasicAnalysisService
                ]
            })
            .overrideTemplate(BasicAnalysisDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BasicAnalysisDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BasicAnalysisService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BasicAnalysis(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.basicAnalysis).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
