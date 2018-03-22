/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataTestModule } from '../../../test.module';
import { AnimalComponent } from '../../../../../../main/webapp/app/entities/animal/animal.component';
import { AnimalService } from '../../../../../../main/webapp/app/entities/animal/animal.service';
import { Animal } from '../../../../../../main/webapp/app/entities/animal/animal.model';

describe('Component Tests', () => {

    describe('Animal Management Component', () => {
        let comp: AnimalComponent;
        let fixture: ComponentFixture<AnimalComponent>;
        let service: AnimalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataTestModule],
                declarations: [AnimalComponent],
                providers: [
                    AnimalService
                ]
            })
            .overrideTemplate(AnimalComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnimalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnimalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Animal(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.animals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
