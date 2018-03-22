import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DataAnalysis } from './data-analysis.model';
import { DataAnalysisService } from './data-analysis.service';

@Injectable()
export class DataAnalysisPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private dataAnalysisService: DataAnalysisService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.dataAnalysisService.find(id)
                    .subscribe((dataAnalysisResponse: HttpResponse<DataAnalysis>) => {
                        const dataAnalysis: DataAnalysis = dataAnalysisResponse.body;
                        this.ngbModalRef = this.dataAnalysisModalRef(component, dataAnalysis);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dataAnalysisModalRef(component, new DataAnalysis());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dataAnalysisModalRef(component: Component, dataAnalysis: DataAnalysis): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dataAnalysis = dataAnalysis;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
