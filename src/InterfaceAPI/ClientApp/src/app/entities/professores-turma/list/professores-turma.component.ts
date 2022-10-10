import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { IProfessoresTurma } from "../professores-turma.model";
import { ProfessoresTurmaService } from "../service/professores-turma.service";
import { ProfessoresTurmaDeleteDialogComponent } from "../delete/professores-turma-delete-dialog.component";

@Component({
  selector: "jhi-professores-turma",
  templateUrl: "./professores-turma.component.html",
})
export class ProfessoresTurmaComponent implements OnInit {
  professoresTurmas?: IProfessoresTurma[];
  isLoading = false;

  constructor(
    protected professoresTurmaService: ProfessoresTurmaService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.professoresTurmaService.query().subscribe(
      (res: HttpResponse<IProfessoresTurma[]>) => {
        this.isLoading = false;
        this.professoresTurmas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IProfessoresTurma): number {
    return item.id!;
  }

  delete(professoresTurma: IProfessoresTurma): void {
    const modalRef = this.modalService.open(
      ProfessoresTurmaDeleteDialogComponent,
      { size: "lg", backdrop: "static" }
    );
    modalRef.componentInstance.professoresTurma = professoresTurma;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
