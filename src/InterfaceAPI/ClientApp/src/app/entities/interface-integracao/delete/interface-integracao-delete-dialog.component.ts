import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { IInterfaceIntegracao } from "../interface-integracao.model";
import { InterfaceIntegracaoService } from "../service/interface-integracao.service";

@Component({
  templateUrl: "./interface-integracao-delete-dialog.component.html",
})
export class InterfaceIntegracaoDeleteDialogComponent {
  interfaceIntegracao?: IInterfaceIntegracao;

  constructor(
    protected interfaceIntegracaoService: InterfaceIntegracaoService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.interfaceIntegracaoService.delete(id).subscribe(() => {
      this.activeModal.close("deleted");
    });
  }
}
