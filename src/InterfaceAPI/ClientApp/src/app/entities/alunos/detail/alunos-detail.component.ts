import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IAlunos } from "../alunos.model";

@Component({
  selector: "jhi-alunos-detail",
  templateUrl: "./alunos-detail.component.html",
})
export class AlunosDetailComponent implements OnInit {
  alunos: IAlunos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alunos }) => {
      this.alunos = alunos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
