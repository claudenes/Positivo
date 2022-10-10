import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { INiveisEnsino } from "../niveis-ensino.model";
import { NiveisEnsinoService } from "../service/niveis-ensino.service";
import { NiveisEnsinoDeleteDialogComponent } from "../delete/niveis-ensino-delete-dialog.component";

@Component({
  selector: "jhi-niveis-ensino",
  templateUrl: "./niveis-ensino.component.html",
})
export class NiveisEnsinoComponent implements OnInit {
  niveisEnsinos?: INiveisEnsino[];
  isLoading = false;

  constructor(
    protected niveisEnsinoService: NiveisEnsinoService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.niveisEnsinoService.query().subscribe(
      (res: HttpResponse<INiveisEnsino[]>) => {
        this.isLoading = false;
        this.niveisEnsinos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: INiveisEnsino): number {
    return item.id!;
  }

  delete(niveisEnsino: INiveisEnsino): void {
    const modalRef = this.modalService.open(NiveisEnsinoDeleteDialogComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.niveisEnsino = niveisEnsino;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
