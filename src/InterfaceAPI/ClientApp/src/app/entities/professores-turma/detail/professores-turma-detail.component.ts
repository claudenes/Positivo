import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IProfessoresTurma } from "../professores-turma.model";

@Component({
  selector: "jhi-professores-turma-detail",
  templateUrl: "./professores-turma-detail.component.html",
})
export class ProfessoresTurmaDetailComponent implements OnInit {
  professoresTurma: IProfessoresTurma | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professoresTurma }) => {
      this.professoresTurma = professoresTurma;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
