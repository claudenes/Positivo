import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { ProfessoresTurmaComponent } from "./list/professores-turma.component";
import { ProfessoresTurmaDetailComponent } from "./detail/professores-turma-detail.component";
import { ProfessoresTurmaUpdateComponent } from "./update/professores-turma-update.component";
import { ProfessoresTurmaDeleteDialogComponent } from "./delete/professores-turma-delete-dialog.component";
import { ProfessoresTurmaRoutingModule } from "./route/professores-turma-routing.module";

@NgModule({
  imports: [SharedModule, ProfessoresTurmaRoutingModule],
  declarations: [
    ProfessoresTurmaComponent,
    ProfessoresTurmaDetailComponent,
    ProfessoresTurmaUpdateComponent,
    ProfessoresTurmaDeleteDialogComponent,
  ],
  entryComponents: [ProfessoresTurmaDeleteDialogComponent],
})
export class ProfessoresTurmaModule {}
