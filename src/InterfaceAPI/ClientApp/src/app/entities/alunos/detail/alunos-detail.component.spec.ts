import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { AlunosDetailComponent } from "./alunos-detail.component";

describe("Component Tests", () => {
  describe("Alunos Management Detail Component", () => {
    let comp: AlunosDetailComponent;
    let fixture: ComponentFixture<AlunosDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AlunosDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ alunos: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(AlunosDetailComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(AlunosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe("OnInit", () => {
      it("Should load alunos on init", () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.alunos).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
