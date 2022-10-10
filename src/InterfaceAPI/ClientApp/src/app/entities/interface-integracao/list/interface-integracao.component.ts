import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { IInterfaceIntegracao } from "../interface-integracao.model";
import { InterfaceIntegracaoService } from "../service/interface-integracao.service";
import { InterfaceIntegracaoDeleteDialogComponent } from "../delete/interface-integracao-delete-dialog.component";

@Component({
  selector: "jhi-interface-integracao",
  templateUrl: "./interface-integracao.component.html",
})
export class InterfaceIntegracaoComponent implements OnInit {
  interfaceIntegracaos?: IInterfaceIntegracao[];
  isLoading = false;

  constructor(
    protected interfaceIntegracaoService: InterfaceIntegracaoService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.interfaceIntegracaoService.query().subscribe(
      (res: HttpResponse<IInterfaceIntegracao[]>) => {
        this.isLoading = false;
        this.interfaceIntegracaos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IInterfaceIntegracao): number {
    return item.id!;
  }

  delete(interfaceIntegracao: IInterfaceIntegracao): void {
    const modalRef = this.modalService.open(
      InterfaceIntegracaoDeleteDialogComponent,
      { size: "lg", backdrop: "static" }
    );
    modalRef.componentInstance.interfaceIntegracao = interfaceIntegracao;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
