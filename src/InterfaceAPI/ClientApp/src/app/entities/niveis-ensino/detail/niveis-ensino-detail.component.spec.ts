import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { NiveisEnsinoDetailComponent } from "./niveis-ensino-detail.component";

describe("Component Tests", () => {
  describe("NiveisEnsino Management Detail Component", () => {
    let comp: NiveisEnsinoDetailComponent;
    let fixture: ComponentFixture<NiveisEnsinoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [NiveisEnsinoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ niveisEnsino: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(NiveisEnsinoDetailComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(NiveisEnsinoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe("OnInit", () => {
      it("Should load niveisEnsino on init", () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.niveisEnsino).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
