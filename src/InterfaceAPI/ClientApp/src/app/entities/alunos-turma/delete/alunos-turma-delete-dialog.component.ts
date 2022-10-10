import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { IAlunosTurma } from "../alunos-turma.model";
import { AlunosTurmaService } from "../service/alunos-turma.service";

@Component({
  templateUrl: "./alunos-turma-delete-dialog.component.html",
})
export class AlunosTurmaDeleteDialogComponent {
  alunosTurma?: IAlunosTurma;

  constructor(
    protected alunosTurmaService: AlunosTurmaService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alunosTurmaService.delete(id).subscribe(() => {
      this.activeModal.close("deleted");
    });
  }
}
