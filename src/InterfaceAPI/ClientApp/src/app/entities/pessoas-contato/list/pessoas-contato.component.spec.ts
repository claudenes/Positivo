import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { PessoasContatoService } from "../service/pessoas-contato.service";

import { PessoasContatoComponent } from "./pessoas-contato.component";

describe("Component Tests", () => {
  describe("PessoasContato Management Component", () => {
    let comp: PessoasContatoComponent;
    let fixture: ComponentFixture<PessoasContatoComponent>;
    let service: PessoasContatoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PessoasContatoComponent],
      })
        .overrideTemplate(PessoasContatoComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(PessoasContatoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PessoasContatoService);

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
      expect(comp.pessoasContatoes?.[0]).toEqual(
        expect.objectContaining({ id: 123 })
      );
    });
  });
});
