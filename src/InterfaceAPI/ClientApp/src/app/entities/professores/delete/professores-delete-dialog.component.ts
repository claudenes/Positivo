import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { IProfessores } from "../professores.model";
import { ProfessoresService } from "../service/professores.service";

@Component({
  templateUrl: "./professores-delete-dialog.component.html",
})
export class ProfessoresDeleteDialogComponent {
  professores?: IProfessores;

  constructor(
    protected professoresService: ProfessoresService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.professoresService.delete(id).subscribe(() => {
      this.activeModal.close("deleted");
    });
  }
}
