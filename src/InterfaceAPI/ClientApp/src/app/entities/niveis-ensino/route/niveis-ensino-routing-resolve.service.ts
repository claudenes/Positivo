import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { INiveisEnsino, NiveisEnsino } from "../niveis-ensino.model";
import { NiveisEnsinoService } from "../service/niveis-ensino.service";

@Injectable({ providedIn: "root" })
export class NiveisEnsinoRoutingResolveService
  implements Resolve<INiveisEnsino>
{
  constructor(
    protected service: NiveisEnsinoService,
    protected router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<INiveisEnsino> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((niveisEnsino: HttpResponse<NiveisEnsino>) => {
          if (niveisEnsino.body) {
            return of(niveisEnsino.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new NiveisEnsino());
  }
}
