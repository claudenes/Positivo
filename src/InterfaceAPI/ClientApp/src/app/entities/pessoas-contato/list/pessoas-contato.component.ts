import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { IPessoasContato } from "../pessoas-contato.model";
import { PessoasContatoService } from "../service/pessoas-contato.service";
import { PessoasContatoDeleteDialogComponent } from "../delete/pessoas-contato-delete-dialog.component";

@Component({
  selector: "jhi-pessoas-contato",
  templateUrl: "./pessoas-contato.component.html",
})
export class PessoasContatoComponent implements OnInit {
  pessoasContatoes?: IPessoasContato[];
  isLoading = false;

  constructor(
    protected pessoasContatoService: PessoasContatoService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.pessoasContatoService.query().subscribe(
      (res: HttpResponse<IPessoasContato[]>) => {
        this.isLoading = false;
        this.pessoasContatoes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPessoasContato): number {
    return item.id!;
  }

  delete(pessoasContato: IPessoasContato): void {
    const modalRef = this.modalService.open(
      PessoasContatoDeleteDialogComponent,
      { size: "lg", backdrop: "static" }
    );
    modalRef.componentInstance.pessoasContato = pessoasContato;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
