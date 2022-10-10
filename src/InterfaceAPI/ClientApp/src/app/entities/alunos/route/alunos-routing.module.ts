import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { AlunosComponent } from "../list/alunos.component";
import { AlunosDetailComponent } from "../detail/alunos-detail.component";
import { AlunosUpdateComponent } from "../update/alunos-update.component";
import { AlunosRoutingResolveService } from "./alunos-routing-resolve.service";

const alunosRoute: Routes = [
  {
    path: "",
    component: AlunosComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/view",
    component: AlunosDetailComponent,
    resolve: {
      alunos: AlunosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: "new",
    component: AlunosUpdateComponent,
    resolve: {
      alunos: AlunosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/edit",
    component: AlunosUpdateComponent,
    resolve: {
      alunos: AlunosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(alunosRoute)],
  exports: [RouterModule],
})
export class AlunosRoutingModule {}
