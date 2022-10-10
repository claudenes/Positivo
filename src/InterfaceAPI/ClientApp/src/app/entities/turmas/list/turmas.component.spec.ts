import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { TurmasService } from "../service/turmas.service";

import { TurmasComponent } from "./turmas.component";

describe("Component Tests", () => {
  describe("Turmas Management Component", () => {
    let comp: TurmasComponent;
    let fixture: ComponentFixture<TurmasComponent>;
    let service: TurmasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TurmasComponent],
      })
        .overrideTemplate(TurmasComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(TurmasComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TurmasService);

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
      expect(comp.turmas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
