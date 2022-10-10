import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { InterfaceIntegracaoComponent } from "../list/interface-integracao.component";
import { InterfaceIntegracaoDetailComponent } from "../detail/interface-integracao-detail.component";
import { InterfaceIntegracaoUpdateComponent } from "../update/interface-integracao-update.component";
import { InterfaceIntegracaoRoutingResolveService } from "./interface-integracao-routing-resolve.service";

const interfaceIntegracaoRoute: Routes = [
  {
    path: "",
    component: InterfaceIntegracaoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/view",
    component: InterfaceIntegracaoDetailComponent,
    resolve: {
      interfaceIntegracao: InterfaceIntegracaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: "new",
    component: InterfaceIntegracaoUpdateComponent,
    resolve: {
      interfaceIntegracao: InterfaceIntegracaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/edit",
    component: InterfaceIntegracaoUpdateComponent,
    resolve: {
      interfaceIntegracao: InterfaceIntegracaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(interfaceIntegracaoRoute)],
  exports: [RouterModule],
})
export class InterfaceIntegracaoRoutingModule {}
