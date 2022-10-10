import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { InterfaceIntegracaoService } from "../service/interface-integracao.service";

import { InterfaceIntegracaoComponent } from "./interface-integracao.component";

describe("Component Tests", () => {
  describe("InterfaceIntegracao Management Component", () => {
    let comp: InterfaceIntegracaoComponent;
    let fixture: ComponentFixture<InterfaceIntegracaoComponent>;
    let service: InterfaceIntegracaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [InterfaceIntegracaoComponent],
      })
        .overrideTemplate(InterfaceIntegracaoComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(InterfaceIntegracaoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(InterfaceIntegracaoService);

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
      expect(comp.interfaceIntegracaos?.[0]).toEqual(
        expect.objectContaining({ id: 123 })
      );
    });
  });
});
