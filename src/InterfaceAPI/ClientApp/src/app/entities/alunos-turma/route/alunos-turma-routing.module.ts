import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { AlunosTurmaComponent } from "../list/alunos-turma.component";
import { AlunosTurmaDetailComponent } from "../detail/alunos-turma-detail.component";
import { AlunosTurmaUpdateComponent } from "../update/alunos-turma-update.component";
import { AlunosTurmaRoutingResolveService } from "./alunos-turma-routing-resolve.service";

const alunosTurmaRoute: Routes = [
  {
    path: "",
    component: AlunosTurmaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/view",
    component: AlunosTurmaDetailComponent,
    resolve: {
      alunosTurma: AlunosTurmaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: "new",
    component: AlunosTurmaUpdateComponent,
    resolve: {
      alunosTurma: AlunosTurmaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/edit",
    component: AlunosTurmaUpdateComponent,
    resolve: {
      alunosTurma: AlunosTurmaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(alunosTurmaRoute)],
  exports: [RouterModule],
})
export class AlunosTurmaRoutingModule {}
