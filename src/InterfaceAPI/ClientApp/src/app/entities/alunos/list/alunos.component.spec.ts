import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { AlunosService } from "../service/alunos.service";

import { AlunosComponent } from "./alunos.component";

describe("Component Tests", () => {
  describe("Alunos Management Component", () => {
    let comp: AlunosComponent;
    let fixture: ComponentFixture<AlunosComponent>;
    let service: AlunosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AlunosComponent],
      })
        .overrideTemplate(AlunosComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(AlunosComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(AlunosService);

      const headers = new HttpHeaders().append("link", "link;link");
      jest.spyOn(service, "query").mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it("Should call load all on init", () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.alunos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
