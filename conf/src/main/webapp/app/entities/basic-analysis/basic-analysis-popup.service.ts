import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BasicAnalysis } from './basic-analysis.model';
import { BasicAnalysisService } from './basic-analysis.service';

@Injectable()
export class BasicAnalysisPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private basicAnalysisService: BasicAnalysisService

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
                this.basicAnalysisService.find(id)
                    .subscribe((basicAnalysisResponse: HttpResponse<BasicAnalysis>) => {
                        const basicAnalysis: BasicAnalysis = basicAnalysisResponse.body;
                        this.ngbModalRef = this.basicAnalysisModalRef(component, basicAnalysis);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.basicAnalysisModalRef(component, new BasicAnalysis());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    basicAnalysisModalRef(component: Component, basicAnalysis: BasicAnalysis): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.basicAnalysis = basicAnalysis;
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
