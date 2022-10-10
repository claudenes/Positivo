import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IAlunosTurma } from "../alunos-turma.model";

@Component({
  selector: "jhi-alunos-turma-detail",
  templateUrl: "./alunos-turma-detail.component.html",
})
export class AlunosTurmaDetailComponent implements OnInit {
  alunosTurma: IAlunosTurma | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alunosTurma }) => {
      this.alunosTurma = alunosTurma;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
