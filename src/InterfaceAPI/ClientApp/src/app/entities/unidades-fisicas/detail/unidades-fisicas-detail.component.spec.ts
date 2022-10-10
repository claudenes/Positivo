import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { UnidadesFisicasDetailComponent } from "./unidades-fisicas-detail.component";

describe("Component Tests", () => {
  describe("UnidadesFisicas Management Detail Component", () => {
    let comp: UnidadesFisicasDetailComponent;
    let fixture: ComponentFixture<UnidadesFisicasDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [UnidadesFisicasDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ unidadesFisicas: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(UnidadesFisicasDetailComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(UnidadesFisicasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe("OnInit", () => {
      it("Should load unidadesFisicas on init", () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.unidadesFisicas).toEqual(
          expect.objectContaining({ id: 123 })
        );
      });
    });
  });
});
