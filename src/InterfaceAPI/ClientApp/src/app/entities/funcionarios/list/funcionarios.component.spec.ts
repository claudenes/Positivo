import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { FuncionariosService } from "../service/funcionarios.service";

import { FuncionariosComponent } from "./funcionarios.component";

describe("Component Tests", () => {
  describe("Funcionarios Management Component", () => {
    let comp: FuncionariosComponent;
    let fixture: ComponentFixture<FuncionariosComponent>;
    let service: FuncionariosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [FuncionariosComponent],
      })
        .overrideTemplate(FuncionariosComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(FuncionariosComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(FuncionariosService);

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
      expect(comp.funcionarios?.[0]).toEqual(
        expect.objectContaining({ id: 123 })
      );
    });
  });
});
