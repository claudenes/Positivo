import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { TurmasComponent } from "../list/turmas.component";
import { TurmasDetailComponent } from "../detail/turmas-detail.component";
import { TurmasUpdateComponent } from "../update/turmas-update.component";
import { TurmasRoutingResolveService } from "./turmas-routing-resolve.service";

const turmasRoute: Routes = [
  {
    path: "",
    component: TurmasComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/view",
    component: TurmasDetailComponent,
    resolve: {
      turmas: TurmasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: "new",
    component: TurmasUpdateComponent,
    resolve: {
      turmas: TurmasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/edit",
    component: TurmasUpdateComponent,
    resolve: {
      turmas: TurmasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(turmasRoute)],
  exports: [RouterModule],
})
export class TurmasRoutingModule {}
