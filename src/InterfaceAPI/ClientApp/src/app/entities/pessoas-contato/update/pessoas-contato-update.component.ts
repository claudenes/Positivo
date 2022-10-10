import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { IPessoasContato, PessoasContato } from "../pessoas-contato.model";
import { PessoasContatoService } from "../service/pessoas-contato.service";

@Component({
  selector: "jhi-pessoas-contato-update",
  templateUrl: "./pessoas-contato-update.component.html",
})
export class PessoasContatoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    pessoa: [null, [Validators.required]],
    email: [],
    emailgoogle: [],
    endereco: [],
    endnum: [],
    endcompl: [],
    bairro: [],
    municipio: [],
    uf: [],
    cep: [],
    dddfone: [],
    fone: [],
    dddcelular: [],
    celular: [],
    dddcomercial: [],
    comercial: [],
    dtatualizacao: [],
  });

  constructor(
    protected pessoasContatoService: PessoasContatoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoasContato }) => {
      this.updateForm(pessoasContato);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pessoasContato = this.createFromForm();
    if (pessoasContato.id !== undefined) {
      this.subscribeToSaveResponse(
        this.pessoasContatoService.update(pessoasContato)
      );
    } else {
      this.subscribeToSaveResponse(
        this.pessoasContatoService.create(pessoasContato)
      );
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IPessoasContato>>
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

  protected updateForm(pessoasContato: IPessoasContato): void {
    this.editForm.patchValue({
      id: pessoasContato.id,
      pessoa: pessoasContato.pessoa,
      email: pessoasContato.email,
      emailgoogle: pessoasContato.emailgoogle,
      endereco: pessoasContato.endereco,
      endnum: pessoasContato.endnum,
      endcompl: pessoasContato.endcompl,
      bairro: pessoasContato.bairro,
      municipio: pessoasContato.municipio,
      uf: pessoasContato.uf,
      cep: pessoasContato.cep,
      dddfone: pessoasContato.dddfone,
      fone: pessoasContato.fone,
      dddcelular: pessoasContato.dddcelular,
      celular: pessoasContato.celular,
      dddcomercial: pessoasContato.dddcomercial,
      comercial: pessoasContato.comercial,
      dtatualizacao: pessoasContato.dtatualizacao,
    });
  }

  protected createFromForm(): IPessoasContato {
    return {
      ...new PessoasContato(),
      id: this.editForm.get(["id"])!.value,
      pessoa: this.editForm.get(["pessoa"])!.value,
      email: this.editForm.get(["email"])!.value,
      emailgoogle: this.editForm.get(["emailgoogle"])!.value,
      endereco: this.editForm.get(["endereco"])!.value,
      endnum: this.editForm.get(["endnum"])!.value,
      endcompl: this.editForm.get(["endcompl"])!.value,
      bairro: this.editForm.get(["bairro"])!.value,
      municipio: this.editForm.get(["municipio"])!.value,
      uf: this.editForm.get(["uf"])!.value,
      cep: this.editForm.get(["cep"])!.value,
      dddfone: this.editForm.get(["dddfone"])!.value,
      fone: this.editForm.get(["fone"])!.value,
      dddcelular: this.editForm.get(["dddcelular"])!.value,
      celular: this.editForm.get(["celular"])!.value,
      dddcomercial: this.editForm.get(["dddcomercial"])!.value,
      comercial: this.editForm.get(["comercial"])!.value,
      dtatualizacao: this.editForm.get(["dtatualizacao"])!.value,
    };
  }
}
