import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { IAlunos } from "../alunos.model";
import { AlunosService } from "../service/alunos.service";

@Component({
  templateUrl: "./alunos-delete-dialog.component.html",
})
export class AlunosDeleteDialogComponent {
  alunos?: IAlunos;

  constructor(
    protected alunosService: AlunosService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alunosService.delete(id).subscribe(() => {
      this.activeModal.close("deleted");
    });
  }
}
