import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";

import { IAlunos, Alunos } from "../alunos.model";
import { AlunosService } from "../service/alunos.service";
import { INiveisEnsino } from "app/entities/niveis-ensino/niveis-ensino.model";
import { NiveisEnsinoService } from "app/entities/niveis-ensino/service/niveis-ensino.service";
import { IUnidadesFisicas } from "app/entities/unidades-fisicas/unidades-fisicas.model";
import { UnidadesFisicasService } from "app/entities/unidades-fisicas/service/unidades-fisicas.service";

@Component({
  selector: "jhi-alunos-update",
  templateUrl: "./alunos-update.component.html",
})
export class AlunosUpdateComponent implements OnInit {
  isSaving = false;

  niveisEnsinosSharedCollection: INiveisEnsino[] = [];
  unidadesFisicasSharedCollection: IUnidadesFisicas[] = [];

  editForm = this.fb.group({
    id: [],
    aluno: [null, [Validators.required]],
    pessoa: [],
    nome: [],
    sobrenome: [],
    primeironome: [],
    situacao: [],
    turno: [],
    curriculo: [],
    serie: [],
    anoingresso: [],
    senha: [],
    dtatualizacao: [],
    niveisEnsino: [],
    unidadesFisicas: [],
  });

  constructor(
    protected alunosService: AlunosService,
    protected niveisEnsinoService: NiveisEnsinoService,
    protected unidadesFisicasService: UnidadesFisicasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alunos }) => {
      this.updateForm(alunos);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alunos = this.createFromForm();
    if (alunos.id !== undefined) {
      this.subscribeToSaveResponse(this.alunosService.update(alunos));
    } else {
      this.subscribeToSaveResponse(this.alunosService.create(alunos));
    }
  }

  trackNiveisEnsinoById(index: number, item: INiveisEnsino): number {
    return item.id!;
  }

  trackUnidadesFisicasById(index: number, item: IUnidadesFisicas): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IAlunos>>
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

  protected updateForm(alunos: IAlunos): void {
    this.editForm.patchValue({
      id: alunos.id,
      aluno: alunos.aluno,
      pessoa: alunos.pessoa,
      nome: alunos.nome,
      sobrenome: alunos.sobrenome,
      primeironome: alunos.primeironome,
      situacao: alunos.situacao,
      turno: alunos.turno,
      curriculo: alunos.curriculo,
      serie: alunos.serie,
      anoingresso: alunos.anoingresso,
      senha: alunos.senha,
      dtatualizacao: alunos.dtatualizacao,
      niveisEnsino: alunos.niveisEnsino,
      unidadesFisicas: alunos.unidadesFisicas,
    });

    this.niveisEnsinosSharedCollection =
      this.niveisEnsinoService.addNiveisEnsinoToCollectionIfMissing(
        this.niveisEnsinosSharedCollection,
        alunos.niveisEnsino
      );
    this.unidadesFisicasSharedCollection =
      this.unidadesFisicasService.addUnidadesFisicasToCollectionIfMissing(
        this.unidadesFisicasSharedCollection,
        alunos.unidadesFisicas
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

  protected createFromForm(): IAlunos {
    return {
      ...new Alunos(),
      id: this.editForm.get(["id"])!.value,
      aluno: this.editForm.get(["aluno"])!.value,
      pessoa: this.editForm.get(["pessoa"])!.value,
      nome: this.editForm.get(["nome"])!.value,
      sobrenome: this.editForm.get(["sobrenome"])!.value,
      primeironome: this.editForm.get(["primeironome"])!.value,
      situacao: this.editForm.get(["situacao"])!.value,
      turno: this.editForm.get(["turno"])!.value,
      curriculo: this.editForm.get(["curriculo"])!.value,
      serie: this.editForm.get(["serie"])!.value,
      anoingresso: this.editForm.get(["anoingresso"])!.value,
      senha: this.editForm.get(["senha"])!.value,
      dtatualizacao: this.editForm.get(["dtatualizacao"])!.value,
      niveisEnsino: this.editForm.get(["niveisEnsino"])!.value,
      unidadesFisicas: this.editForm.get(["unidadesFisicas"])!.value,
    };
  }
}
