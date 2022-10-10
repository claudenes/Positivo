import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ITurmas } from "../turmas.model";
import { TurmasService } from "../service/turmas.service";
import { TurmasDeleteDialogComponent } from "../delete/turmas-delete-dialog.component";

@Component({
  selector: "jhi-turmas",
  templateUrl: "./turmas.component.html",
})
export class TurmasComponent implements OnInit {
  turmas?: ITurmas[];
  isLoading = false;

  constructor(
    protected turmasService: TurmasService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.turmasService.query().subscribe(
      (res: HttpResponse<ITurmas[]>) => {
        this.isLoading = false;
        this.turmas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITurmas): number {
    return item.id!;
  }

  delete(turmas: ITurmas): void {
    const modalRef = this.modalService.open(TurmasDeleteDialogComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.turmas = turmas;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
