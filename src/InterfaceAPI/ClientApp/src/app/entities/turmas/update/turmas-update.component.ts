import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";

import { ITurmas, Turmas } from "../turmas.model";
import { TurmasService } from "../service/turmas.service";
import { INiveisEnsino } from "app/entities/niveis-ensino/niveis-ensino.model";
import { NiveisEnsinoService } from "app/entities/niveis-ensino/service/niveis-ensino.service";
import { IUnidadesFisicas } from "app/entities/unidades-fisicas/unidades-fisicas.model";
import { UnidadesFisicasService } from "app/entities/unidades-fisicas/service/unidades-fisicas.service";

@Component({
  selector: "jhi-turmas-update",
  templateUrl: "./turmas-update.component.html",
})
export class TurmasUpdateComponent implements OnInit {
  isSaving = false;

  niveisEnsinosSharedCollection: INiveisEnsino[] = [];
  unidadesFisicasSharedCollection: IUnidadesFisicas[] = [];

  editForm = this.fb.group({
    id: [],
    turma: [null, [Validators.required]],
    turno: [null, [Validators.required]],
    curriculo: [null, [Validators.required]],
    serie: [],
    ano: [],
    dtatualizacao: [],
    niveisEnsino: [],
    unidadesFisicas: [],
  });

  constructor(
    protected turmasService: TurmasService,
    protected niveisEnsinoService: NiveisEnsinoService,
    protected unidadesFisicasService: UnidadesFisicasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ turmas }) => {
      this.updateForm(turmas);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const turmas = this.createFromForm();
    if (turmas.id !== undefined) {
      this.subscribeToSaveResponse(this.turmasService.update(turmas));
    } else {
      this.subscribeToSaveResponse(this.turmasService.create(turmas));
    }
  }

  trackNiveisEnsinoById(index: number, item: INiveisEnsino): number {
    return item.id!;
  }

  trackUnidadesFisicasById(index: number, item: IUnidadesFisicas): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<ITurmas>>
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

  protected updateForm(turmas: ITurmas): void {
    this.editForm.patchValue({
      id: turmas.id,
      turma: turmas.turma,
      turno: turmas.turno,
      curriculo: turmas.curriculo,
      serie: turmas.serie,
      ano: turmas.ano,
      dtatualizacao: turmas.dtatualizacao,
      niveisEnsino: turmas.niveisEnsino,
      unidadesFisicas: turmas.unidadesFisicas,
    });

    this.niveisEnsinosSharedCollection =
      this.niveisEnsinoService.addNiveisEnsinoToCollectionIfMissing(
        this.niveisEnsinosSharedCollection,
        turmas.niveisEnsino
      );
    this.unidadesFisicasSharedCollection =
      this.unidadesFisicasService.addUnidadesFisicasToCollectionIfMissing(
        this.unidadesFisicasSharedCollection,
        turmas.unidadesFisicas
      );
  }

  protected loadRelationshipsOptions(): void {
    this.niveisEnsinoService
      .query()
      .pipe(map((res: HttpResponse<INiveisEnsino[]>) => res.body ?? []))
      .pipe(
        map((niveisEnsinos: INiveisEnsino[]) =>
          this.niveisEnsinoService.addNiveisEnsinoToCollectionIfMissing(
            niveisEnsinos,
            this.editForm.get("niveisEnsino")!.value
          )
        )
      )
      .subscribe(
        (niveisEnsinos: INiveisEnsino[]) =>
          (this.niveisEnsinosSharedCollection = niveisEnsinos)
      );

    this.unidadesFisicasService
      .query()
      .pipe(map((res: HttpResponse<IUnidadesFisicas[]>) => res.body ?? []))
      .pipe(
        map((unidadesFisicas: IUnidadesFisicas[]) =>
          this.unidadesFisicasService.addUnidadesFisicasToCollectionIfMissing(
            unidadesFisicas,
            this.editForm.get("unidadesFisicas")!.value
          )
        )
      )
      .subscribe(
        (unidadesFisicas: IUnidadesFisicas[]) =>
          (this.unidadesFisicasSharedCollection = unidadesFisicas)
      );
  }

  protected createFromForm(): ITurmas {
    return {
      ...new Turmas(),
      id: this.editForm.get(["id"])!.value,
      turma: this.editForm.get(["turma"])!.value,
      turno: this.editForm.get(["turno"])!.value,
      curriculo: this.editForm.get(["curriculo"])!.value,
      serie: this.editForm.get(["serie"])!.value,
      ano: this.editForm.get(["ano"])!.value,
      dtatualizacao: this.editForm.get(["dtatualizacao"])!.value,
      niveisEnsino: this.editForm.get(["niveisEnsino"])!.value,
      unidadesFisicas: this.editForm.get(["unidadesFisicas"])!.value,
    };
  }
}
