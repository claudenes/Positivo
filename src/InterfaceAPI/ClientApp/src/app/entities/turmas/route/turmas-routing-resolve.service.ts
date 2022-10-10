import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { ITurmas, Turmas } from "../turmas.model";
import { TurmasService } from "../service/turmas.service";

@Injectable({ providedIn: "root" })
export class TurmasRoutingResolveService implements Resolve<ITurmas> {
  constructor(protected service: TurmasService, protected router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<ITurmas> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((turmas: HttpResponse<Turmas>) => {
          if (turmas.body) {
            return of(turmas.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new Turmas());
  }
}
