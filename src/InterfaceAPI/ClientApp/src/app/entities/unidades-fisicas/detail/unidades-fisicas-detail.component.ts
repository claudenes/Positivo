import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IUnidadesFisicas } from "../unidades-fisicas.model";

@Component({
  selector: "jhi-unidades-fisicas-detail",
  templateUrl: "./unidades-fisicas-detail.component.html",
})
export class UnidadesFisicasDetailComponent implements OnInit {
  unidadesFisicas: IUnidadesFisicas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidadesFisicas }) => {
      this.unidadesFisicas = unidadesFisicas;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
