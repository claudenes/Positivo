jest.mock("@angular/router");

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of, Subject } from "rxjs";

import { UnidadesFisicasService } from "../service/unidades-fisicas.service";
import { IUnidadesFisicas, UnidadesFisicas } from "../unidades-fisicas.model";

import { UnidadesFisicasUpdateComponent } from "./unidades-fisicas-update.component";

describe("Component Tests", () => {
  describe("UnidadesFisicas Management Update Component", () => {
    let comp: UnidadesFisicasUpdateComponent;
    let fixture: ComponentFixture<UnidadesFisicasUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let unidadesFisicasService: UnidadesFisicasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UnidadesFisicasUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(UnidadesFisicasUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(UnidadesFisicasUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      unidadesFisicasService = TestBed.inject(UnidadesFisicasService);

      comp = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
      it("Should update editForm", () => {
        const unidadesFisicas: IUnidadesFisicas = { id: 456 };

        activatedRoute.data = of({ unidadesFisicas });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(
          expect.objectContaining(unidadesFisicas)
        );
      });
    });

    describe("save", () => {
      it("Should call update service on save for existing entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<UnidadesFisicas>>();
        const unidadesFisicas = { id: 123 };
        jest
          .spyOn(unidadesFisicasService, "update")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ unidadesFisicas });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: unidadesFisicas }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(unidadesFisicasService.update).toHaveBeenCalledWith(
          unidadesFisicas
        );
        expect(comp.isSaving).toEqual(false);
      });

      it("Should call create service on save for new entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<UnidadesFisicas>>();
        const unidadesFisicas = new UnidadesFisicas();
        jest
          .spyOn(unidadesFisicasService, "create")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ unidadesFisicas });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: unidadesFisicas }));
        saveSubject.complete();

        // THEN
        expect(unidadesFisicasService.create).toHaveBeenCalledWith(
          unidadesFisicas
        );
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it("Should set isSaving to false on error", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<UnidadesFisicas>>();
        const unidadesFisicas = { id: 123 };
        jest
          .spyOn(unidadesFisicasService, "update")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ unidadesFisicas });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error("This is an error!");

        // THEN
        expect(unidadesFisicasService.update).toHaveBeenCalledWith(
          unidadesFisicas
        );
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
