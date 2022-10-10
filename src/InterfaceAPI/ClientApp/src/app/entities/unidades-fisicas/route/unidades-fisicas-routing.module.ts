import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { UnidadesFisicasComponent } from "../list/unidades-fisicas.component";
import { UnidadesFisicasDetailComponent } from "../detail/unidades-fisicas-detail.component";
import { UnidadesFisicasUpdateComponent } from "../update/unidades-fisicas-update.component";
import { UnidadesFisicasRoutingResolveService } from "./unidades-fisicas-routing-resolve.service";

const unidadesFisicasRoute: Routes = [
  {
    path: "",
    component: UnidadesFisicasComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/view",
    component: UnidadesFisicasDetailComponent,
    resolve: {
      unidadesFisicas: UnidadesFisicasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: "new",
    component: UnidadesFisicasUpdateComponent,
    resolve: {
      unidadesFisicas: UnidadesFisicasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/edit",
    component: UnidadesFisicasUpdateComponent,
    resolve: {
      unidadesFisicas: UnidadesFisicasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(unidadesFisicasRoute)],
  exports: [RouterModule],
})
export class UnidadesFisicasRoutingModule {}
