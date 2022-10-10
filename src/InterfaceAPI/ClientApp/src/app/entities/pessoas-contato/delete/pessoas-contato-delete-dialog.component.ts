import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { IPessoasContato } from "../pessoas-contato.model";
import { PessoasContatoService } from "../service/pessoas-contato.service";

@Component({
  templateUrl: "./pessoas-contato-delete-dialog.component.html",
})
export class PessoasContatoDeleteDialogComponent {
  pessoasContato?: IPessoasContato;

  constructor(
    protected pessoasContatoService: PessoasContatoService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pessoasContatoService.delete(id).subscribe(() => {
      this.activeModal.close("deleted");
    });
  }
}
