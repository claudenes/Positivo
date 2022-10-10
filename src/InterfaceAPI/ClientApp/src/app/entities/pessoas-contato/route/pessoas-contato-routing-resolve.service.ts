import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { IPessoasContato, PessoasContato } from "../pessoas-contato.model";
import { PessoasContatoService } from "../service/pessoas-contato.service";

@Injectable({ providedIn: "root" })
export class PessoasContatoRoutingResolveService
  implements Resolve<IPessoasContato>
{
  constructor(
    protected service: PessoasContatoService,
    protected router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IPessoasContato> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pessoasContato: HttpResponse<PessoasContato>) => {
          if (pessoasContato.body) {
            return of(pessoasContato.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new PessoasContato());
  }
}
