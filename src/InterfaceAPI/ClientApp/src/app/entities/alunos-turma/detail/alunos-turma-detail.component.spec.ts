import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { AlunosTurmaDetailComponent } from "./alunos-turma-detail.component";

describe("Component Tests", () => {
  describe("AlunosTurma Management Detail Component", () => {
    let comp: AlunosTurmaDetailComponent;
    let fixture: ComponentFixture<AlunosTurmaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AlunosTurmaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ alunosTurma: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(AlunosTurmaDetailComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(AlunosTurmaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe("OnInit", () => {
      it("Should load alunosTurma on init", () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.alunosTurma).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
