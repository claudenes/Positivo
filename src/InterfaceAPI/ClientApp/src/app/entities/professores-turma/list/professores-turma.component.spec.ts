import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { ProfessoresTurmaService } from "../service/professores-turma.service";

import { ProfessoresTurmaComponent } from "./professores-turma.component";

describe("Component Tests", () => {
  describe("ProfessoresTurma Management Component", () => {
    let comp: ProfessoresTurmaComponent;
    let fixture: ComponentFixture<ProfessoresTurmaComponent>;
    let service: ProfessoresTurmaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProfessoresTurmaComponent],
      })
        .overrideTemplate(ProfessoresTurmaComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(ProfessoresTurmaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ProfessoresTurmaService);

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
      expect(comp.professoresTurmas?.[0]).toEqual(
        expect.objectContaining({ id: 123 })
      );
    });
  });
});
