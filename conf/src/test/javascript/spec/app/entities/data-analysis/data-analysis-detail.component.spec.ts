/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DataTestModule } from '../../../test.module';
import { DataAnalysisDetailComponent } from '../../../../../../main/webapp/app/entities/data-analysis/data-analysis-detail.component';
import { DataAnalysisService } from '../../../../../../main/webapp/app/entities/data-analysis/data-analysis.service';
import { DataAnalysis } from '../../../../../../main/webapp/app/entities/data-analysis/data-analysis.model';

describe('Component Tests', () => {

    describe('DataAnalysis Management Detail Component', () => {
        let comp: DataAnalysisDetailComponent;
        let fixture: ComponentFixture<DataAnalysisDetailComponent>;
        let service: DataAnalysisService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataTestModule],
                declarations: [DataAnalysisDetailComponent],
                providers: [
                    DataAnalysisService
                ]
            })
            .overrideTemplate(DataAnalysisDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataAnalysisDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataAnalysisService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DataAnalysis(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dataAnalysis).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
