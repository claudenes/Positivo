import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { AlunosTurmaService } from "../service/alunos-turma.service";

import { AlunosTurmaComponent } from "./alunos-turma.component";

describe("Component Tests", () => {
  describe("AlunosTurma Management Component", () => {
    let comp: AlunosTurmaComponent;
    let fixture: ComponentFixture<AlunosTurmaComponent>;
    let service: AlunosTurmaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AlunosTurmaComponent],
      })
        .overrideTemplate(AlunosTurmaComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(AlunosTurmaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(AlunosTurmaService);

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
      expect(comp.alunosTurmas?.[0]).toEqual(
        expect.objectContaining({ id: 123 })
      );
    });
  });
});
