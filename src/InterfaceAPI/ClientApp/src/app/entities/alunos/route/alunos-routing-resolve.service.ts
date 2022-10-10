import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { IAlunos, Alunos } from "../alunos.model";
import { AlunosService } from "../service/alunos.service";

@Injectable({ providedIn: "root" })
export class AlunosRoutingResolveService implements Resolve<IAlunos> {
  constructor(protected service: AlunosService, protected router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IAlunos> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((alunos: HttpResponse<Alunos>) => {
          if (alunos.body) {
            return of(alunos.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new Alunos());
  }
}
