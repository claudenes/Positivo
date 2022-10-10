import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { UnidadesFisicasService } from "../service/unidades-fisicas.service";

import { UnidadesFisicasComponent } from "./unidades-fisicas.component";

describe("Component Tests", () => {
  describe("UnidadesFisicas Management Component", () => {
    let comp: UnidadesFisicasComponent;
    let fixture: ComponentFixture<UnidadesFisicasComponent>;
    let service: UnidadesFisicasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UnidadesFisicasComponent],
      })
        .overrideTemplate(UnidadesFisicasComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(UnidadesFisicasComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(UnidadesFisicasService);

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
      expect(comp.unidadesFisicas?.[0]).toEqual(
        expect.objectContaining({ id: 123 })
      );
    });
  });
});
