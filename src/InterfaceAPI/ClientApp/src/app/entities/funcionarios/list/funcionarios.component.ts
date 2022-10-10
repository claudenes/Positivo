import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { IFuncionarios } from "../funcionarios.model";
import { FuncionariosService } from "../service/funcionarios.service";
import { FuncionariosDeleteDialogComponent } from "../delete/funcionarios-delete-dialog.component";

@Component({
  selector: "jhi-funcionarios",
  templateUrl: "./funcionarios.component.html",
})
export class FuncionariosComponent implements OnInit {
  funcionarios?: IFuncionarios[];
  isLoading = false;

  constructor(
    protected funcionariosService: FuncionariosService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.funcionariosService.query().subscribe(
      (res: HttpResponse<IFuncionarios[]>) => {
        this.isLoading = false;
        this.funcionarios = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IFuncionarios): number {
    return item.id!;
  }

  delete(funcionarios: IFuncionarios): void {
    const modalRef = this.modalService.open(FuncionariosDeleteDialogComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.funcionarios = funcionarios;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
