import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";

import { IAlunosTurma, AlunosTurma } from "../alunos-turma.model";
import { AlunosTurmaService } from "../service/alunos-turma.service";
import { IAlunos } from "app/entities/alunos/alunos.model";
import { AlunosService } from "app/entities/alunos/service/alunos.service";
import { ITurmas } from "app/entities/turmas/turmas.model";
import { TurmasService } from "app/entities/turmas/service/turmas.service";

@Component({
  selector: "jhi-alunos-turma-update",
  templateUrl: "./alunos-turma-update.component.html",
})
export class AlunosTurmaUpdateComponent implements OnInit {
  isSaving = false;

  alunosSharedCollection: IAlunos[] = [];
  turmasSharedCollection: ITurmas[] = [];

  editForm = this.fb.group({
    id: [],
    dtatualizacao: [],
    alunos: [],
    turmas: [],
  });

  constructor(
    protected alunosTurmaService: AlunosTurmaService,
    protected alunosService: AlunosService,
    protected turmasService: TurmasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alunosTurma }) => {
      this.updateForm(alunosTurma);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alunosTurma = this.createFromForm();
    if (alunosTurma.id !== undefined) {
      this.subscribeToSaveResponse(this.alunosTurmaService.update(alunosTurma));
    } else {
      this.subscribeToSaveResponse(this.alunosTurmaService.create(alunosTurma));
    }
  }

  trackAlunosById(index: number, item: IAlunos): number {
    return item.id!;
  }

  trackTurmasById(index: number, item: ITurmas): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IAlunosTurma>>
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

  protected updateForm(alunosTurma: IAlunosTurma): void {
    this.editForm.patchValue({
      id: alunosTurma.id,
      dtatualizacao: alunosTurma.dtatualizacao,
      alunos: alunosTurma.alunos,
      turmas: alunosTurma.turmas,
    });

    this.alunosSharedCollection =
      this.alunosService.addAlunosToCollectionIfMissing(
        this.alunosSharedCollection,
        alunosTurma.alunos
      );
    this.turmasSharedCollection =
      this.turmasService.addTurmasToCollectionIfMissing(
        this.turmasSharedCollection,
        alunosTurma.turmas
      );
  }

  protected loadRelationshipsOptions(): void {
    this.alunosService
      .query()
      .pipe(map((res: HttpResponse<IAlunos[]>) => res.body ?? []))
      .pipe(
        map((alunos: IAlunos[]) =>
          this.alunosService.addAlunosToCollectionIfMissing(
            alunos,
            this.editForm.get("alunos")!.value
          )
        )
      )
      .subscribe((alunos: IAlunos[]) => (this.alunosSharedCollection = alunos));

    this.turmasService
      .query()
      .pipe(map((res: HttpResponse<ITurmas[]>) => res.body ?? []))
      .pipe(
        map((turmas: ITurmas[]) =>
          this.turmasService.addTurmasToCollectionIfMissing(
            turmas,
            this.editForm.get("turmas")!.value
          )
        )
      )
      .subscribe((turmas: ITurmas[]) => (this.turmasSharedCollection = turmas));
  }

  protected createFromForm(): IAlunosTurma {
    return {
      ...new AlunosTurma(),
      id: this.editForm.get(["id"])!.value,
      dtatualizacao: this.editForm.get(["dtatualizacao"])!.value,
      alunos: this.editForm.get(["alunos"])!.value,
      turmas: this.editForm.get(["turmas"])!.value,
    };
  }
}
