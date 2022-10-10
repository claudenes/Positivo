import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { IProfessoresTurma } from "../professores-turma.model";
import { ProfessoresTurmaService } from "../service/professores-turma.service";

@Component({
  templateUrl: "./professores-turma-delete-dialog.component.html",
})
export class ProfessoresTurmaDeleteDialogComponent {
  professoresTurma?: IProfessoresTurma;

  constructor(
    protected professoresTurmaService: ProfessoresTurmaService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.professoresTurmaService.delete(id).subscribe(() => {
      this.activeModal.close("deleted");
    });
  }
}
