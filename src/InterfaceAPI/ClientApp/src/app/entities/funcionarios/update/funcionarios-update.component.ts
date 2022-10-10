import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { IFuncionarios, Funcionarios } from "../funcionarios.model";
import { FuncionariosService } from "../service/funcionarios.service";

@Component({
  selector: "jhi-funcionarios-update",
  templateUrl: "./funcionarios-update.component.html",
})
export class FuncionariosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    funcionario: [null, [Validators.required]],
    nome: [],
    primeironome: [],
    sobrenome: [],
    datanascimento: [],
    cpf: [],
    unidadefisicaFolha: [],
    senha: [],
    situacao: [],
    dtatualizacao: [],
  });

  constructor(
    protected funcionariosService: FuncionariosService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ funcionarios }) => {
      this.updateForm(funcionarios);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const funcionarios = this.createFromForm();
    if (funcionarios.id !== undefined) {
      this.subscribeToSaveResponse(
        this.funcionariosService.update(funcionarios)
      );
    } else {
      this.subscribeToSaveResponse(
        this.funcionariosService.create(funcionarios)
      );
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IFuncionarios>>
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

  protected updateForm(funcionarios: IFuncionarios): void {
    this.editForm.patchValue({
      id: funcionarios.id,
      funcionario: funcionarios.funcionario,
      nome: funcionarios.nome,
      primeironome: funcionarios.primeironome,
      sobrenome: funcionarios.sobrenome,
      datanascimento: funcionarios.datanascimento,
      cpf: funcionarios.cpf,
      unidadefisicaFolha: funcionarios.unidadefisicaFolha,
      senha: funcionarios.senha,
      situacao: funcionarios.situacao,
      dtatualizacao: funcionarios.dtatualizacao,
    });
  }

  protected createFromForm(): IFuncionarios {
    return {
      ...new Funcionarios(),
      id: this.editForm.get(["id"])!.value,
      funcionario: this.editForm.get(["funcionario"])!.value,
      nome: this.editForm.get(["nome"])!.value,
      primeironome: this.editForm.get(["primeironome"])!.value,
      sobrenome: this.editForm.get(["sobrenome"])!.value,
      datanascimento: this.editForm.get(["datanascimento"])!.value,
      cpf: this.editForm.get(["cpf"])!.value,
      unidadefisicaFolha: this.editForm.get(["unidadefisicaFolha"])!.value,
      senha: this.editForm.get(["senha"])!.value,
      situacao: this.editForm.get(["situacao"])!.value,
      dtatualizacao: this.editForm.get(["dtatualizacao"])!.value,
    };
  }
}
