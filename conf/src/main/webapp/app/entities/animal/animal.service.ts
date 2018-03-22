import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Animal } from './animal.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Animal>;

@Injectable()
export class AnimalService {

    private resourceUrl =  SERVER_API_URL + 'api/animals';

    constructor(private http: HttpClient) { }

    create(animal: Animal): Observable<EntityResponseType> {
        const copy = this.convert(animal);
        return this.http.post<Animal>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(animal: Animal): Observable<EntityResponseType> {
        const copy = this.convert(animal);
        return this.http.put<Animal>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Animal>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Animal[]>> {
        const options = createRequestOption(req);
        return this.http.get<Animal[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Animal[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Animal = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Animal[]>): HttpResponse<Animal[]> {
        const jsonResponse: Animal[] = res.body;
        const body: Animal[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Animal.
     */
    private convertItemFromServer(animal: Animal): Animal {
        const copy: Animal = Object.assign({}, animal);
        return copy;
    }

    /**
     * Convert a Animal to a JSON which can be sent to the server.
     */
    private convert(animal: Animal): Animal {
        const copy: Animal = Object.assign({}, animal);
        return copy;
    }
}
