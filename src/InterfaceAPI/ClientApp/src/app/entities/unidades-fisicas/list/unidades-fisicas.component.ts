import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { IUnidadesFisicas } from "../unidades-fisicas.model";
import { UnidadesFisicasService } from "../service/unidades-fisicas.service";
import { UnidadesFisicasDeleteDialogComponent } from "../delete/unidades-fisicas-delete-dialog.component";

@Component({
  selector: "jhi-unidades-fisicas",
  templateUrl: "./unidades-fisicas.component.html",
})
export class UnidadesFisicasComponent implements OnInit {
  unidadesFisicas?: IUnidadesFisicas[];
  isLoading = false;

  constructor(
    protected unidadesFisicasService: UnidadesFisicasService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.unidadesFisicasService.query().subscribe(
      (res: HttpResponse<IUnidadesFisicas[]>) => {
        this.isLoading = false;
        this.unidadesFisicas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IUnidadesFisicas): number {
    return item.id!;
  }

  delete(unidadesFisicas: IUnidadesFisicas): void {
    const modalRef = this.modalService.open(
      UnidadesFisicasDeleteDialogComponent,
      { size: "lg", backdrop: "static" }
    );
    modalRef.componentInstance.unidadesFisicas = unidadesFisicas;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
