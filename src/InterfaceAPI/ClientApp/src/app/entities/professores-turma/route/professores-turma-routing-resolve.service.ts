import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import {
  IProfessoresTurma,
  ProfessoresTurma,
} from "../professores-turma.model";
import { ProfessoresTurmaService } from "../service/professores-turma.service";

@Injectable({ providedIn: "root" })
export class ProfessoresTurmaRoutingResolveService
  implements Resolve<IProfessoresTurma>
{
  constructor(
    protected service: ProfessoresTurmaService,
    protected router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IProfessoresTurma> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((professoresTurma: HttpResponse<ProfessoresTurma>) => {
          if (professoresTurma.body) {
            return of(professoresTurma.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfessoresTurma());
  }
}
