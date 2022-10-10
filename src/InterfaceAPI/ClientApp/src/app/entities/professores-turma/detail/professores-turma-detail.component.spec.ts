import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { ProfessoresTurmaDetailComponent } from "./professores-turma-detail.component";

describe("Component Tests", () => {
  describe("ProfessoresTurma Management Detail Component", () => {
    let comp: ProfessoresTurmaDetailComponent;
    let fixture: ComponentFixture<ProfessoresTurmaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProfessoresTurmaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ professoresTurma: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ProfessoresTurmaDetailComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(ProfessoresTurmaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe("OnInit", () => {
      it("Should load professoresTurma on init", () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.professoresTurma).toEqual(
          expect.objectContaining({ id: 123 })
        );
      });
    });
  });
});
