import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { InterfaceIntegracaoDetailComponent } from "./interface-integracao-detail.component";

describe("Component Tests", () => {
  describe("InterfaceIntegracao Management Detail Component", () => {
    let comp: InterfaceIntegracaoDetailComponent;
    let fixture: ComponentFixture<InterfaceIntegracaoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [InterfaceIntegracaoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ interfaceIntegracao: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(InterfaceIntegracaoDetailComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(InterfaceIntegracaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe("OnInit", () => {
      it("Should load interfaceIntegracao on init", () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.interfaceIntegracao).toEqual(
          expect.objectContaining({ id: 123 })
        );
      });
    });
  });
});
