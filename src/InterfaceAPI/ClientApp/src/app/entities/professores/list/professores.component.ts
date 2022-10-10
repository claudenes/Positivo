import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { IProfessores } from "../professores.model";
import { ProfessoresService } from "../service/professores.service";
import { ProfessoresDeleteDialogComponent } from "../delete/professores-delete-dialog.component";

@Component({
  selector: "jhi-professores",
  templateUrl: "./professores.component.html",
})
export class ProfessoresComponent implements OnInit {
  professores?: IProfessores[];
  isLoading = false;

  constructor(
    protected professoresService: ProfessoresService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.professoresService.query().subscribe(
      (res: HttpResponse<IProfessores[]>) => {
        this.isLoading = false;
        this.professores = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IProfessores): number {
    return item.id!;
  }

  delete(professores: IProfessores): void {
    const modalRef = this.modalService.open(ProfessoresDeleteDialogComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.professores = professores;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason) => {
      if (reason === "deleted") {
        this.loadAll();
      }
    });
  }
}
