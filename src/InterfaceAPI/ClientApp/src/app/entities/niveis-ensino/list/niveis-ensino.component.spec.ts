import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { NiveisEnsinoService } from "../service/niveis-ensino.service";

import { NiveisEnsinoComponent } from "./niveis-ensino.component";

describe("Component Tests", () => {
  describe("NiveisEnsino Management Component", () => {
    let comp: NiveisEnsinoComponent;
    let fixture: ComponentFixture<NiveisEnsinoComponent>;
    let service: NiveisEnsinoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [NiveisEnsinoComponent],
      })
        .overrideTemplate(NiveisEnsinoComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(NiveisEnsinoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(NiveisEnsinoService);

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
      expect(comp.niveisEnsinos?.[0]).toEqual(
        expect.objectContaining({ id: 123 })
      );
    });
  });
});
