import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { UnidadesFisicasComponent } from "./list/unidades-fisicas.component";
import { UnidadesFisicasDetailComponent } from "./detail/unidades-fisicas-detail.component";
import { UnidadesFisicasUpdateComponent } from "./update/unidades-fisicas-update.component";
import { UnidadesFisicasDeleteDialogComponent } from "./delete/unidades-fisicas-delete-dialog.component";
import { UnidadesFisicasRoutingModule } from "./route/unidades-fisicas-routing.module";

@NgModule({
  imports: [SharedModule, UnidadesFisicasRoutingModule],
  declarations: [
    UnidadesFisicasComponent,
    UnidadesFisicasDetailComponent,
    UnidadesFisicasUpdateComponent,
    UnidadesFisicasDeleteDialogComponent,
  ],
  entryComponents: [UnidadesFisicasDeleteDialogComponent],
})
export class UnidadesFisicasModule {}
