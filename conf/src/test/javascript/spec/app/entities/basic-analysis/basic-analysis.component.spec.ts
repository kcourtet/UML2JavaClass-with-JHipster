/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataTestModule } from '../../../test.module';
import { BasicAnalysisComponent } from '../../../../../../main/webapp/app/entities/basic-analysis/basic-analysis.component';
import { BasicAnalysisService } from '../../../../../../main/webapp/app/entities/basic-analysis/basic-analysis.service';
import { BasicAnalysis } from '../../../../../../main/webapp/app/entities/basic-analysis/basic-analysis.model';

describe('Component Tests', () => {

    describe('BasicAnalysis Management Component', () => {
        let comp: BasicAnalysisComponent;
        let fixture: ComponentFixture<BasicAnalysisComponent>;
        let service: BasicAnalysisService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataTestModule],
                declarations: [BasicAnalysisComponent],
                providers: [
                    BasicAnalysisService
                ]
            })
            .overrideTemplate(BasicAnalysisComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BasicAnalysisComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BasicAnalysisService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BasicAnalysis(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.basicAnalyses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
