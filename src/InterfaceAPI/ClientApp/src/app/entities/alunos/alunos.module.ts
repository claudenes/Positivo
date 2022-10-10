import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { AlunosComponent } from "./list/alunos.component";
import { AlunosDetailComponent } from "./detail/alunos-detail.component";
import { AlunosUpdateComponent } from "./update/alunos-update.component";
import { AlunosDeleteDialogComponent } from "./delete/alunos-delete-dialog.component";
import { AlunosRoutingModule } from "./route/alunos-routing.module";

@NgModule({
  imports: [SharedModule, AlunosRoutingModule],
  declarations: [
    AlunosComponent,
    AlunosDetailComponent,
    AlunosUpdateComponent,
    AlunosDeleteDialogComponent,
  ],
  entryComponents: [AlunosDeleteDialogComponent],
})
export class AlunosModule {}
