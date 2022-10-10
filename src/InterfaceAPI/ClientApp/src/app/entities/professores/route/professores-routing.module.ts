import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { ProfessoresComponent } from "../list/professores.component";
import { ProfessoresDetailComponent } from "../detail/professores-detail.component";
import { ProfessoresUpdateComponent } from "../update/professores-update.component";
import { ProfessoresRoutingResolveService } from "./professores-routing-resolve.service";

const professoresRoute: Routes = [
  {
    path: "",
    component: ProfessoresComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/view",
    component: ProfessoresDetailComponent,
    resolve: {
      professores: ProfessoresRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: "new",
    component: ProfessoresUpdateComponent,
    resolve: {
      professores: ProfessoresRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/edit",
    component: ProfessoresUpdateComponent,
    resolve: {
      professores: ProfessoresRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(professoresRoute)],
  exports: [RouterModule],
})
export class ProfessoresRoutingModule {}
