import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { AlunosTurmaComponent } from "./list/alunos-turma.component";
import { AlunosTurmaDetailComponent } from "./detail/alunos-turma-detail.component";
import { AlunosTurmaUpdateComponent } from "./update/alunos-turma-update.component";
import { AlunosTurmaDeleteDialogComponent } from "./delete/alunos-turma-delete-dialog.component";
import { AlunosTurmaRoutingModule } from "./route/alunos-turma-routing.module";

@NgModule({
  imports: [SharedModule, AlunosTurmaRoutingModule],
  declarations: [
    AlunosTurmaComponent,
    AlunosTurmaDetailComponent,
    AlunosTurmaUpdateComponent,
    AlunosTurmaDeleteDialogComponent,
  ],
  entryComponents: [AlunosTurmaDeleteDialogComponent],
})
export class AlunosTurmaModule {}
