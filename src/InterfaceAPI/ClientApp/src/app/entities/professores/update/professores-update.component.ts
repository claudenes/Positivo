import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { IProfessores, Professores } from "../professores.model";
import { ProfessoresService } from "../service/professores.service";

@Component({
  selector: "jhi-professores-update",
  templateUrl: "./professores-update.component.html",
})
export class ProfessoresUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    professor: [null, [Validators.required]],
    pessoa: [null, [Validators.required]],
    nome: [],
    primeironome: [],
    sobrenome: [],
    situacao: [],
    senha: [],
    dtatualizacao: [],
  });

  constructor(
    protected professoresService: ProfessoresService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professores }) => {
      this.updateForm(professores);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const professores = this.createFromForm();
    if (professores.id !== undefined) {
      this.subscribeToSaveResponse(this.professoresService.update(professores));
    } else {
      this.subscribeToSaveResponse(this.professoresService.create(professores));
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IProfessores>>
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

  protected updateForm(professores: IProfessores): void {
    this.editForm.patchValue({
      id: professores.id,
      professor: professores.professor,
      pessoa: professores.pessoa,
      nome: professores.nome,
      primeironome: professores.primeironome,
      sobrenome: professores.sobrenome,
      situacao: professores.situacao,
      senha: professores.senha,
      dtatualizacao: professores.dtatualizacao,
    });
  }

  protected createFromForm(): IProfessores {
    return {
      ...new Professores(),
      id: this.editForm.get(["id"])!.value,
      professor: this.editForm.get(["professor"])!.value,
      pessoa: this.editForm.get(["pessoa"])!.value,
      nome: this.editForm.get(["nome"])!.value,
      primeironome: this.editForm.get(["primeironome"])!.value,
      sobrenome: this.editForm.get(["sobrenome"])!.value,
      situacao: this.editForm.get(["situacao"])!.value,
      senha: this.editForm.get(["senha"])!.value,
      dtatualizacao: this.editForm.get(["dtatualizacao"])!.value,
    };
  }
}
