import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DataAnalysis } from './data-analysis.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DataAnalysis>;

@Injectable()
export class DataAnalysisService {

    private resourceUrl =  SERVER_API_URL + 'api/data-analyses';

    constructor(private http: HttpClient) { }

    create(dataAnalysis: DataAnalysis): Observable<EntityResponseType> {
        const copy = this.convert(dataAnalysis);
        return this.http.post<DataAnalysis>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(dataAnalysis: DataAnalysis): Observable<EntityResponseType> {
        const copy = this.convert(dataAnalysis);
        return this.http.put<DataAnalysis>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DataAnalysis>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DataAnalysis[]>> {
        const options = createRequestOption(req);
        return this.http.get<DataAnalysis[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DataAnalysis[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DataAnalysis = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DataAnalysis[]>): HttpResponse<DataAnalysis[]> {
        const jsonResponse: DataAnalysis[] = res.body;
        const body: DataAnalysis[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DataAnalysis.
     */
    private convertItemFromServer(dataAnalysis: DataAnalysis): DataAnalysis {
        const copy: DataAnalysis = Object.assign({}, dataAnalysis);
        return copy;
    }

    /**
     * Convert a DataAnalysis to a JSON which can be sent to the server.
     */
    private convert(dataAnalysis: DataAnalysis): DataAnalysis {
        const copy: DataAnalysis = Object.assign({}, dataAnalysis);
        return copy;
    }
}
