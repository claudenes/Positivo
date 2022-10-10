import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { TurmasDetailComponent } from "./turmas-detail.component";

describe("Component Tests", () => {
  describe("Turmas Management Detail Component", () => {
    let comp: TurmasDetailComponent;
    let fixture: ComponentFixture<TurmasDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TurmasDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ turmas: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TurmasDetailComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(TurmasDetailComponent);
      comp = fixture.componentInstance;
    });

    describe("OnInit", () => {
      it("Should load turmas on init", () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.turmas).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
