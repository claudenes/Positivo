import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { PessoasContatoComponent } from "./list/pessoas-contato.component";
import { PessoasContatoDetailComponent } from "./detail/pessoas-contato-detail.component";
import { PessoasContatoUpdateComponent } from "./update/pessoas-contato-update.component";
import { PessoasContatoDeleteDialogComponent } from "./delete/pessoas-contato-delete-dialog.component";
import { PessoasContatoRoutingModule } from "./route/pessoas-contato-routing.module";

@NgModule({
  imports: [SharedModule, PessoasContatoRoutingModule],
  declarations: [
    PessoasContatoComponent,
    PessoasContatoDetailComponent,
    PessoasContatoUpdateComponent,
    PessoasContatoDeleteDialogComponent,
  ],
  entryComponents: [PessoasContatoDeleteDialogComponent],
})
export class PessoasContatoModule {}
