import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { IAlunos } from "../alunos.model";
import { AlunosService } from "../service/alunos.service";
import { AlunosDeleteDialogComponent } from "../delete/alunos-delete-dialog.component";

@Component({
  selector: "jhi-alunos",
  templateUrl: "./alunos.component.html",
})
export class AlunosComponent implements OnInit {
  alunos?: IAlunos[];
  isLoading = false;

  constructor(
    protected alunosService: AlunosService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.alunosService.query().subscribe(
      (res: HttpResponse<IAlunos[]>) => {
        this.isLoading = false;
        this.alunos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAlunos): number {
    return item.id!;
  }

  delete(alunos: IAlunos): void {
    const modalRef = this.modalService.open(AlunosDeleteDialogComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.alunos = alunos;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
