import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { PessoasContatoDetailComponent } from "./pessoas-contato-detail.component";

describe("Component Tests", () => {
  describe("PessoasContato Management Detail Component", () => {
    let comp: PessoasContatoDetailComponent;
    let fixture: ComponentFixture<PessoasContatoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PessoasContatoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ pessoasContato: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PessoasContatoDetailComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(PessoasContatoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe("OnInit", () => {
      it("Should load pessoasContato on init", () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pessoasContato).toEqual(
          expect.objectContaining({ id: 123 })
        );
      });
    });
  });
});
