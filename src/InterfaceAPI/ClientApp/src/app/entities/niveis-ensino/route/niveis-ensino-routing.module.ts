import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { NiveisEnsinoComponent } from "../list/niveis-ensino.component";
import { NiveisEnsinoDetailComponent } from "../detail/niveis-ensino-detail.component";
import { NiveisEnsinoUpdateComponent } from "../update/niveis-ensino-update.component";
import { NiveisEnsinoRoutingResolveService } from "./niveis-ensino-routing-resolve.service";

const niveisEnsinoRoute: Routes = [
  {
    path: "",
    component: NiveisEnsinoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/view",
    component: NiveisEnsinoDetailComponent,
    resolve: {
      niveisEnsino: NiveisEnsinoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: "new",
    component: NiveisEnsinoUpdateComponent,
    resolve: {
      niveisEnsino: NiveisEnsinoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/edit",
    component: NiveisEnsinoUpdateComponent,
    resolve: {
      niveisEnsino: NiveisEnsinoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(niveisEnsinoRoute)],
  exports: [RouterModule],
})
export class NiveisEnsinoRoutingModule {}
