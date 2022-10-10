import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IProfessores } from "../professores.model";

@Component({
  selector: "jhi-professores-detail",
  templateUrl: "./professores-detail.component.html",
})
export class ProfessoresDetailComponent implements OnInit {
  professores: IProfessores | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professores }) => {
      this.professores = professores;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
