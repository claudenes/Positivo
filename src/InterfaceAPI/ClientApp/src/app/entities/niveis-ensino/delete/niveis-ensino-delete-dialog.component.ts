import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { INiveisEnsino } from "../niveis-ensino.model";
import { NiveisEnsinoService } from "../service/niveis-ensino.service";

@Component({
  templateUrl: "./niveis-ensino-delete-dialog.component.html",
})
export class NiveisEnsinoDeleteDialogComponent {
  niveisEnsino?: INiveisEnsino;

  constructor(
    protected niveisEnsinoService: NiveisEnsinoService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.niveisEnsinoService.delete(id).subscribe(() => {
      this.activeModal.close("deleted");
    });
  }
}
