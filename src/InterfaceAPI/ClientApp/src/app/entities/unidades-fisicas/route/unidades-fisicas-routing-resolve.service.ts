import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { IUnidadesFisicas, UnidadesFisicas } from "../unidades-fisicas.model";
import { UnidadesFisicasService } from "../service/unidades-fisicas.service";

@Injectable({ providedIn: "root" })
export class UnidadesFisicasRoutingResolveService
  implements Resolve<IUnidadesFisicas>
{
  constructor(
    protected service: UnidadesFisicasService,
    protected router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IUnidadesFisicas> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((unidadesFisicas: HttpResponse<UnidadesFisicas>) => {
          if (unidadesFisicas.body) {
            return of(unidadesFisicas.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new UnidadesFisicas());
  }
}
