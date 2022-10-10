import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { ProfessoresComponent } from "./list/professores.component";
import { ProfessoresDetailComponent } from "./detail/professores-detail.component";
import { ProfessoresUpdateComponent } from "./update/professores-update.component";
import { ProfessoresDeleteDialogComponent } from "./delete/professores-delete-dialog.component";
import { ProfessoresRoutingModule } from "./route/professores-routing.module";

@NgModule({
  imports: [SharedModule, ProfessoresRoutingModule],
  declarations: [
    ProfessoresComponent,
    ProfessoresDetailComponent,
    ProfessoresUpdateComponent,
    ProfessoresDeleteDialogComponent,
  ],
  entryComponents: [ProfessoresDeleteDialogComponent],
})
export class ProfessoresModule {}
