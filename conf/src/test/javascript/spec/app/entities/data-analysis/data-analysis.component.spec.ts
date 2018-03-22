/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataTestModule } from '../../../test.module';
import { DataAnalysisComponent } from '../../../../../../main/webapp/app/entities/data-analysis/data-analysis.component';
import { DataAnalysisService } from '../../../../../../main/webapp/app/entities/data-analysis/data-analysis.service';
import { DataAnalysis } from '../../../../../../main/webapp/app/entities/data-analysis/data-analysis.model';

describe('Component Tests', () => {

    describe('DataAnalysis Management Component', () => {
        let comp: DataAnalysisComponent;
        let fixture: ComponentFixture<DataAnalysisComponent>;
        let service: DataAnalysisService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataTestModule],
                declarations: [DataAnalysisComponent],
                providers: [
                    DataAnalysisService
                ]
            })
            .overrideTemplate(DataAnalysisComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataAnalysisComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataAnalysisService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DataAnalysis(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dataAnalyses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
