import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { ProfessoresService } from "../service/professores.service";

import { ProfessoresComponent } from "./professores.component";

describe("Component Tests", () => {
  describe("Professores Management Component", () => {
    let comp: ProfessoresComponent;
    let fixture: ComponentFixture<ProfessoresComponent>;
    let service: ProfessoresService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProfessoresComponent],
      })
        .overrideTemplate(ProfessoresComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(ProfessoresComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ProfessoresService);

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
      expect(comp.professores?.[0]).toEqual(
        expect.objectContaining({ id: 123 })
      );
    });
  });
});
