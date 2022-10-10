import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { IUnidadesFisicas, UnidadesFisicas } from "../unidades-fisicas.model";
import { UnidadesFisicasService } from "../service/unidades-fisicas.service";

@Component({
  selector: "jhi-unidades-fisicas-update",
  templateUrl: "./unidades-fisicas-update.component.html",
})
export class UnidadesFisicasUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    unidadefisica: [null, [Validators.required]],
    unidadefisicafolha: [],
    nome: [],
    cnpj: [],
    situacao: [],
    dtatualizacao: [],
  });

  constructor(
    protected unidadesFisicasService: UnidadesFisicasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidadesFisicas }) => {
      this.updateForm(unidadesFisicas);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const unidadesFisicas = this.createFromForm();
    if (unidadesFisicas.id !== undefined) {
      this.subscribeToSaveResponse(
        this.unidadesFisicasService.update(unidadesFisicas)
      );
    } else {
      this.subscribeToSaveResponse(
        this.unidadesFisicasService.create(unidadesFisicas)
      );
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IUnidadesFisicas>>
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

  protected updateForm(unidadesFisicas: IUnidadesFisicas): void {
    this.editForm.patchValue({
      id: unidadesFisicas.id,
      unidadefisica: unidadesFisicas.unidadefisica,
      unidadefisicafolha: unidadesFisicas.unidadefisicafolha,
      nome: unidadesFisicas.nome,
      cnpj: unidadesFisicas.cnpj,
      situacao: unidadesFisicas.situacao,
      dtatualizacao: unidadesFisicas.dtatualizacao,
    });
  }

  protected createFromForm(): IUnidadesFisicas {
    return {
      ...new UnidadesFisicas(),
      id: this.editForm.get(["id"])!.value,
      unidadefisica: this.editForm.get(["unidadefisica"])!.value,
      unidadefisicafolha: this.editForm.get(["unidadefisicafolha"])!.value,
      nome: this.editForm.get(["nome"])!.value,
      cnpj: this.editForm.get(["cnpj"])!.value,
      situacao: this.editForm.get(["situacao"])!.value,
      dtatualizacao: this.editForm.get(["dtatualizacao"])!.value,
    };
  }
}
