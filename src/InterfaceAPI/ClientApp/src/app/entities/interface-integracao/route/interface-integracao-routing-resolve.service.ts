import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import {
  IInterfaceIntegracao,
  InterfaceIntegracao,
} from "../interface-integracao.model";
import { InterfaceIntegracaoService } from "../service/interface-integracao.service";

@Injectable({ providedIn: "root" })
export class InterfaceIntegracaoRoutingResolveService
  implements Resolve<IInterfaceIntegracao>
{
  constructor(
    protected service: InterfaceIntegracaoService,
    protected router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IInterfaceIntegracao> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((interfaceIntegracao: HttpResponse<InterfaceIntegracao>) => {
          if (interfaceIntegracao.body) {
            return of(interfaceIntegracao.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new InterfaceIntegracao());
  }
}
