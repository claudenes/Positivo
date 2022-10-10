import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { ProfessoresTurmaComponent } from "../list/professores-turma.component";
import { ProfessoresTurmaDetailComponent } from "../detail/professores-turma-detail.component";
import { ProfessoresTurmaUpdateComponent } from "../update/professores-turma-update.component";
import { ProfessoresTurmaRoutingResolveService } from "./professores-turma-routing-resolve.service";

const professoresTurmaRoute: Routes = [
  {
    path: "",
    component: ProfessoresTurmaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/view",
    component: ProfessoresTurmaDetailComponent,
    resolve: {
      professoresTurma: ProfessoresTurmaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: "new",
    component: ProfessoresTurmaUpdateComponent,
    resolve: {
      professoresTurma: ProfessoresTurmaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/edit",
    component: ProfessoresTurmaUpdateComponent,
    resolve: {
      professoresTurma: ProfessoresTurmaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(professoresTurmaRoute)],
  exports: [RouterModule],
})
export class ProfessoresTurmaRoutingModule {}
