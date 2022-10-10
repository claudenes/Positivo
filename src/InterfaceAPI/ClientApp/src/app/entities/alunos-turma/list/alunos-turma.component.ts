import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { IAlunosTurma } from "../alunos-turma.model";
import { AlunosTurmaService } from "../service/alunos-turma.service";
import { AlunosTurmaDeleteDialogComponent } from "../delete/alunos-turma-delete-dialog.component";

@Component({
  selector: "jhi-alunos-turma",
  templateUrl: "./alunos-turma.component.html",
})
export class AlunosTurmaComponent implements OnInit {
  alunosTurmas?: IAlunosTurma[];
  isLoading = false;

  constructor(
    protected alunosTurmaService: AlunosTurmaService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.alunosTurmaService.query().subscribe(
      (res: HttpResponse<IAlunosTurma[]>) => {
        this.isLoading = false;
        this.alunosTurmas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAlunosTurma): number {
    return item.id!;
  }

  delete(alunosTurma: IAlunosTurma): void {
    const modalRef = this.modalService.open(AlunosTurmaDeleteDialogComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.alunosTurma = alunosTurma;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
