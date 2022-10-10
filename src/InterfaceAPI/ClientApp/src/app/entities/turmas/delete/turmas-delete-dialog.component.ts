import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { ITurmas } from "../turmas.model";
import { TurmasService } from "../service/turmas.service";

@Component({
  templateUrl: "./turmas-delete-dialog.component.html",
})
export class TurmasDeleteDialogComponent {
  turmas?: ITurmas;

  constructor(
    protected turmasService: TurmasService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.turmasService.delete(id).subscribe(() => {
      this.activeModal.close("deleted");
    });
  }
}
