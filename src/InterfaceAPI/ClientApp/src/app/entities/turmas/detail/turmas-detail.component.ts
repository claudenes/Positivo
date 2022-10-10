import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ITurmas } from "../turmas.model";

@Component({
  selector: "jhi-turmas-detail",
  templateUrl: "./turmas-detail.component.html",
})
export class TurmasDetailComponent implements OnInit {
  turmas: ITurmas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ turmas }) => {
      this.turmas = turmas;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
