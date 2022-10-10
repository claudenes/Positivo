import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IPessoasContato } from "../pessoas-contato.model";

@Component({
  selector: "jhi-pessoas-contato-detail",
  templateUrl: "./pessoas-contato-detail.component.html",
})
export class PessoasContatoDetailComponent implements OnInit {
  pessoasContato: IPessoasContato | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoasContato }) => {
      this.pessoasContato = pessoasContato;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
