jest.mock("@angular/router");

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of, Subject } from "rxjs";

import { PessoasContatoService } from "../service/pessoas-contato.service";
import { IPessoasContato, PessoasContato } from "../pessoas-contato.model";

import { PessoasContatoUpdateComponent } from "./pessoas-contato-update.component";

describe("Component Tests", () => {
  describe("PessoasContato Management Update Component", () => {
    let comp: PessoasContatoUpdateComponent;
    let fixture: ComponentFixture<PessoasContatoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let pessoasContatoService: PessoasContatoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PessoasContatoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PessoasContatoUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(PessoasContatoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      pessoasContatoService = TestBed.inject(PessoasContatoService);

      comp = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
      it("Should update editForm", () => {
        const pessoasContato: IPessoasContato = { id: 456 };

        activatedRoute.data = of({ pessoasContato });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(
          expect.objectContaining(pessoasContato)
        );
      });
    });

    describe("save", () => {
      it("Should call update service on save for existing entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PessoasContato>>();
        const pessoasContato = { id: 123 };
        jest
          .spyOn(pessoasContatoService, "update")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ pessoasContato });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pessoasContato }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(pessoasContatoService.update).toHaveBeenCalledWith(
          pessoasContato
        );
        expect(comp.isSaving).toEqual(false);
      });

      it("Should call create service on save for new entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PessoasContato>>();
        const pessoasContato = new PessoasContato();
        jest
          .spyOn(pessoasContatoService, "create")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ pessoasContato });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pessoasContato }));
        saveSubject.complete();

        // THEN
        expect(pessoasContatoService.create).toHaveBeenCalledWith(
          pessoasContato
        );
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it("Should set isSaving to false on error", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PessoasContato>>();
        const pessoasContato = { id: 123 };
        jest
          .spyOn(pessoasContatoService, "update")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ pessoasContato });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error("This is an error!");

        // THEN
        expect(pessoasContatoService.update).toHaveBeenCalledWith(
          pessoasContato
        );
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
