import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { NiveisEnsinoComponent } from "./list/niveis-ensino.component";
import { NiveisEnsinoDetailComponent } from "./detail/niveis-ensino-detail.component";
import { NiveisEnsinoUpdateComponent } from "./update/niveis-ensino-update.component";
import { NiveisEnsinoDeleteDialogComponent } from "./delete/niveis-ensino-delete-dialog.component";
import { NiveisEnsinoRoutingModule } from "./route/niveis-ensino-routing.module";

@NgModule({
  imports: [SharedModule, NiveisEnsinoRoutingModule],
  declarations: [
    NiveisEnsinoComponent,
    NiveisEnsinoDetailComponent,
    NiveisEnsinoUpdateComponent,
    NiveisEnsinoDeleteDialogComponent,
  ],
  entryComponents: [NiveisEnsinoDeleteDialogComponent],
})
export class NiveisEnsinoModule {}
