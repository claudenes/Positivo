import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { INiveisEnsino } from "../niveis-ensino.model";

@Component({
  selector: "jhi-niveis-ensino-detail",
  templateUrl: "./niveis-ensino-detail.component.html",
})
export class NiveisEnsinoDetailComponent implements OnInit {
  niveisEnsino: INiveisEnsino | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ niveisEnsino }) => {
      this.niveisEnsino = niveisEnsino;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
