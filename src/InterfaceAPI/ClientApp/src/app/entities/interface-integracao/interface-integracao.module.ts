import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { InterfaceIntegracaoComponent } from "./list/interface-integracao.component";
import { InterfaceIntegracaoDetailComponent } from "./detail/interface-integracao-detail.component";
import { InterfaceIntegracaoUpdateComponent } from "./update/interface-integracao-update.component";
import { InterfaceIntegracaoDeleteDialogComponent } from "./delete/interface-integracao-delete-dialog.component";
import { InterfaceIntegracaoRoutingModule } from "./route/interface-integracao-routing.module";

@NgModule({
  imports: [SharedModule, InterfaceIntegracaoRoutingModule],
  declarations: [
    InterfaceIntegracaoComponent,
    InterfaceIntegracaoDetailComponent,
    InterfaceIntegracaoUpdateComponent,
    InterfaceIntegracaoDeleteDialogComponent,
  ],
  entryComponents: [InterfaceIntegracaoDeleteDialogComponent],
})
export class InterfaceIntegracaoModule {}
