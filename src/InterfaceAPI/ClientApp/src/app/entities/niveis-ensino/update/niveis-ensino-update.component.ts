import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { INiveisEnsino, NiveisEnsino } from "../niveis-ensino.model";
import { NiveisEnsinoService } from "../service/niveis-ensino.service";

@Component({
  selector: "jhi-niveis-ensino-update",
  templateUrl: "./niveis-ensino-update.component.html",
})
export class NiveisEnsinoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nivelensino: [null, [Validators.required]],
    nome: [],
    unidaderesponsavel: [],
    situacao: [],
    dtatualizacao: [],
  });

  constructor(
    protected niveisEnsinoService: NiveisEnsinoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ niveisEnsino }) => {
      this.updateForm(niveisEnsino);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const niveisEnsino = this.createFromForm();
    if (niveisEnsino.id !== undefined) {
      this.subscribeToSaveResponse(
        this.niveisEnsinoService.update(niveisEnsino)
      );
    } else {
      this.subscribeToSaveResponse(
        this.niveisEnsinoService.create(niveisEnsino)
      );
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<INiveisEnsino>>
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

  protected updateForm(niveisEnsino: INiveisEnsino): void {
    this.editForm.patchValue({
      id: niveisEnsino.id,
      nivelensino: niveisEnsino.nivelensino,
      nome: niveisEnsino.nome,
      unidaderesponsavel: niveisEnsino.unidaderesponsavel,
      situacao: niveisEnsino.situacao,
      dtatualizacao: niveisEnsino.dtatualizacao,
    });
  }

  protected createFromForm(): INiveisEnsino {
    return {
      ...new NiveisEnsino(),
      id: this.editForm.get(["id"])!.value,
      nivelensino: this.editForm.get(["nivelensino"])!.value,
      nome: this.editForm.get(["nome"])!.value,
      unidaderesponsavel: this.editForm.get(["unidaderesponsavel"])!.value,
      situacao: this.editForm.get(["situacao"])!.value,
      dtatualizacao: this.editForm.get(["dtatualizacao"])!.value,
    };
  }
}
