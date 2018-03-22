import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BasicAnalysis } from './basic-analysis.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BasicAnalysis>;

@Injectable()
export class BasicAnalysisService {

    private resourceUrl =  SERVER_API_URL + 'api/basic-analyses';

    constructor(private http: HttpClient) { }

    create(basicAnalysis: BasicAnalysis): Observable<EntityResponseType> {
        const copy = this.convert(basicAnalysis);
        return this.http.post<BasicAnalysis>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(basicAnalysis: BasicAnalysis): Observable<EntityResponseType> {
        const copy = this.convert(basicAnalysis);
        return this.http.put<BasicAnalysis>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BasicAnalysis>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BasicAnalysis[]>> {
        const options = createRequestOption(req);
        return this.http.get<BasicAnalysis[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BasicAnalysis[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BasicAnalysis = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BasicAnalysis[]>): HttpResponse<BasicAnalysis[]> {
        const jsonResponse: BasicAnalysis[] = res.body;
        const body: BasicAnalysis[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BasicAnalysis.
     */
    private convertItemFromServer(basicAnalysis: BasicAnalysis): BasicAnalysis {
        const copy: BasicAnalysis = Object.assign({}, basicAnalysis);
        return copy;
    }

    /**
     * Convert a BasicAnalysis to a JSON which can be sent to the server.
     */
    private convert(basicAnalysis: BasicAnalysis): BasicAnalysis {
        const copy: BasicAnalysis = Object.assign({}, basicAnalysis);
        return copy;
    }
}
