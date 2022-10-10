import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { TurmasComponent } from "./list/turmas.component";
import { TurmasDetailComponent } from "./detail/turmas-detail.component";
import { TurmasUpdateComponent } from "./update/turmas-update.component";
import { TurmasDeleteDialogComponent } from "./delete/turmas-delete-dialog.component";
import { TurmasRoutingModule } from "./route/turmas-routing.module";

@NgModule({
  imports: [SharedModule, TurmasRoutingModule],
  declarations: [
    TurmasComponent,
    TurmasDetailComponent,
    TurmasUpdateComponent,
    TurmasDeleteDialogComponent,
  ],
  entryComponents: [TurmasDeleteDialogComponent],
})
export class TurmasModule {}
