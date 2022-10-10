import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { IAlunosTurma, AlunosTurma } from "../alunos-turma.model";
import { AlunosTurmaService } from "../service/alunos-turma.service";

@Injectable({ providedIn: "root" })
export class AlunosTurmaRoutingResolveService implements Resolve<IAlunosTurma> {
  constructor(
    protected service: AlunosTurmaService,
    protected router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IAlunosTurma> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((alunosTurma: HttpResponse<AlunosTurma>) => {
          if (alunosTurma.body) {
            return of(alunosTurma.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new AlunosTurma());
  }
}
