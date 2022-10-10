import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import {
  IInterfaceIntegracao,
  InterfaceIntegracao,
} from "../interface-integracao.model";
import { InterfaceIntegracaoService } from "../service/interface-integracao.service";

@Component({
  selector: "jhi-interface-integracao-update",
  templateUrl: "./interface-integracao-update.component.html",
})
export class InterfaceIntegracaoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomeintegracao: [],
    servidorondeestainstalado: [],
    usuario: [],
    senha: [],
    status: [],
    dtatualizacao: [],
  });

  constructor(
    protected interfaceIntegracaoService: InterfaceIntegracaoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ interfaceIntegracao }) => {
      this.updateForm(interfaceIntegracao);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const interfaceIntegracao = this.createFromForm();
    if (interfaceIntegracao.id !== undefined) {
      this.subscribeToSaveResponse(
        this.interfaceIntegracaoService.update(interfaceIntegracao)
      );
    } else {
      this.subscribeToSaveResponse(
        this.interfaceIntegracaoService.create(interfaceIntegracao)
      );
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IInterfaceIntegracao>>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(interfaceIntegracao: IInterfaceIntegracao): void {
    this.editForm.patchValue({
      id: interfaceIntegracao.id,
      nomeintegracao: interfaceIntegracao.nomeintegracao,
      servidorondeestainstalado: interfaceIntegracao.servidorondeestainstalado,
      usuario: interfaceIntegracao.usuario,
      senha: interfaceIntegracao.senha,
      status: interfaceIntegracao.status,
      dtatualizacao: interfaceIntegracao.dtatualizacao,
    });
  }

  protected createFromForm(): IInterfaceIntegracao {
    return {
      ...new InterfaceIntegracao(),
      id: this.editForm.get(["id"])!.value,
      nomeintegracao: this.editForm.get(["nomeintegracao"])!.value,
      servidorondeestainstalado: this.editForm.get([
        "servidorondeestainstalado",
      ])!.value,
      usuario: this.editForm.get(["usuario"])!.value,
      senha: this.editForm.get(["senha"])!.value,
      status: this.editForm.get(["status"])!.value,
      dtatualizacao: this.editForm.get(["dtatualizacao"])!.value,
    };
  }
}
