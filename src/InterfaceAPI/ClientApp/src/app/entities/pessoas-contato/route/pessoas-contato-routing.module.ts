import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { PessoasContatoComponent } from "../list/pessoas-contato.component";
import { PessoasContatoDetailComponent } from "../detail/pessoas-contato-detail.component";
import { PessoasContatoUpdateComponent } from "../update/pessoas-contato-update.component";
import { PessoasContatoRoutingResolveService } from "./pessoas-contato-routing-resolve.service";

const pessoasContatoRoute: Routes = [
  {
    path: "",
    component: PessoasContatoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/view",
    component: PessoasContatoDetailComponent,
    resolve: {
      pessoasContato: PessoasContatoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: "new",
    component: PessoasContatoUpdateComponent,
    resolve: {
      pessoasContato: PessoasContatoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/edit",
    component: PessoasContatoUpdateComponent,
    resolve: {
      pessoasContato: PessoasContatoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pessoasContatoRoute)],
  exports: [RouterModule],
})
export class PessoasContatoRoutingModule {}
