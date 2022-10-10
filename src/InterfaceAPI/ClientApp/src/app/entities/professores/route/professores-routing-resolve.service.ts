import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { IProfessores, Professores } from "../professores.model";
import { ProfessoresService } from "../service/professores.service";

@Injectable({ providedIn: "root" })
export class ProfessoresRoutingResolveService implements Resolve<IProfessores> {
  constructor(
    protected service: ProfessoresService,
    protected router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IProfessores> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((professores: HttpResponse<Professores>) => {
          if (professores.body) {
            return of(professores.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new Professores());
  }
}
