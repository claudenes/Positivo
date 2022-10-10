import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { ProfessoresDetailComponent } from "./professores-detail.component";

describe("Component Tests", () => {
  describe("Professores Management Detail Component", () => {
    let comp: ProfessoresDetailComponent;
    let fixture: ComponentFixture<ProfessoresDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProfessoresDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ professores: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ProfessoresDetailComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(ProfessoresDetailComponent);
      comp = fixture.componentInstance;
    });

    describe("OnInit", () => {
      it("Should load professores on init", () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.professores).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
