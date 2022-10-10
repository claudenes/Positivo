import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IInterfaceIntegracao } from "../interface-integracao.model";

@Component({
  selector: "jhi-interface-integracao-detail",
  templateUrl: "./interface-integracao-detail.component.html",
})
export class InterfaceIntegracaoDetailComponent implements OnInit {
  interfaceIntegracao: IInterfaceIntegracao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ interfaceIntegracao }) => {
      this.interfaceIntegracao = interfaceIntegracao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
