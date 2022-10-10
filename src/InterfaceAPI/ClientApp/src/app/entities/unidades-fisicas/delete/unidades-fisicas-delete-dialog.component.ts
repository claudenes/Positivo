import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { IUnidadesFisicas } from "../unidades-fisicas.model";
import { UnidadesFisicasService } from "../service/unidades-fisicas.service";

@Component({
  templateUrl: "./unidades-fisicas-delete-dialog.component.html",
})
export class UnidadesFisicasDeleteDialogComponent {
  unidadesFisicas?: IUnidadesFisicas;

  constructor(
    protected unidadesFisicasService: UnidadesFisicasService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.unidadesFisicasService.delete(id).subscribe(() => {
      this.activeModal.close("deleted");
    });
  }
}
