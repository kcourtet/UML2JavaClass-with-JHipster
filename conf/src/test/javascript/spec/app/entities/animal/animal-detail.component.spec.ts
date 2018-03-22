/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DataTestModule } from '../../../test.module';
import { AnimalDetailComponent } from '../../../../../../main/webapp/app/entities/animal/animal-detail.component';
import { AnimalService } from '../../../../../../main/webapp/app/entities/animal/animal.service';
import { Animal } from '../../../../../../main/webapp/app/entities/animal/animal.model';

describe('Component Tests', () => {

    describe('Animal Management Detail Component', () => {
        let comp: AnimalDetailComponent;
        let fixture: ComponentFixture<AnimalDetailComponent>;
        let service: AnimalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DataTestModule],
                declarations: [AnimalDetailComponent],
                providers: [
                    AnimalService
                ]
            })
            .overrideTemplate(AnimalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnimalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnimalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Animal(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.animal).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
