import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";

import {
  IProfessoresTurma,
  ProfessoresTurma,
} from "../professores-turma.model";
import { ProfessoresTurmaService } from "../service/professores-turma.service";
import { IProfessores } from "app/entities/professores/professores.model";
import { ProfessoresService } from "app/entities/professores/service/professores.service";
import { ITurmas } from "app/entities/turmas/turmas.model";
import { TurmasService } from "app/entities/turmas/service/turmas.service";

@Component({
  selector: "jhi-professores-turma-update",
  templateUrl: "./professores-turma-update.component.html",
})
export class ProfessoresTurmaUpdateComponent implements OnInit {
  isSaving = false;

  professoresSharedCollection: IProfessores[] = [];
  turmasSharedCollection: ITurmas[] = [];

  editForm = this.fb.group({
    id: [],
    dtatualizacao: [],
    professores: [],
    turmas: [],
  });

  constructor(
    protected professoresTurmaService: ProfessoresTurmaService,
    protected professoresService: ProfessoresService,
    protected turmasService: TurmasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professoresTurma }) => {
      this.updateForm(professoresTurma);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const professoresTurma = this.createFromForm();
    if (professoresTurma.id !== undefined) {
      this.subscribeToSaveResponse(
        this.professoresTurmaService.update(professoresTurma)
      );
    } else {
      this.subscribeToSaveResponse(
        this.professoresTurmaService.create(professoresTurma)
      );
    }
  }

  trackProfessoresById(index: number, item: IProfessores): number {
    return item.id!;
  }

  trackTurmasById(index: number, item: ITurmas): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IProfessoresTurma>>
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

  protected updateForm(professoresTurma: IProfessoresTurma): void {
    this.editForm.patchValue({
      id: professoresTurma.id,
      dtatualizacao: professoresTurma.dtatualizacao,
      professores: professoresTurma.professores,
      turmas: professoresTurma.turmas,
    });

    this.professoresSharedCollection =
      this.professoresService.addProfessoresToCollectionIfMissing(
        this.professoresSharedCollection,
        professoresTurma.professores
      );
    this.turmasSharedCollection =
      this.turmasService.addTurmasToCollectionIfMissing(
        this.turmasSharedCollection,
        professoresTurma.turmas
      );
  }

  protected loadRelationshipsOptions(): void {
    this.professoresService
      .query()
      .pipe(map((res: HttpResponse<IProfessores[]>) => res.body ?? []))
      .pipe(
        map((professores: IProfessores[]) =>
          this.professoresService.addProfessoresToCollectionIfMissing(
            professores,
            this.editForm.get("professores")!.value
          )
        )
      )
      .subscribe(
        (professores: IProfessores[]) =>
          (this.professoresSharedCollection = professores)
      );

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

  protected createFromForm(): IProfessoresTurma {
    return {
      ...new ProfessoresTurma(),
      id: this.editForm.get(["id"])!.value,
      dtatualizacao: this.editForm.get(["dtatualizacao"])!.value,
      professores: this.editForm.get(["professores"])!.value,
      turmas: this.editForm.get(["turmas"])!.value,
    };
  }
}
