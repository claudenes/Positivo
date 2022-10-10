jest.mock("@angular/router");

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of, Subject } from "rxjs";

import { NiveisEnsinoService } from "../service/niveis-ensino.service";
import { INiveisEnsino, NiveisEnsino } from "../niveis-ensino.model";

import { NiveisEnsinoUpdateComponent } from "./niveis-ensino-update.component";

describe("Component Tests", () => {
  describe("NiveisEnsino Management Update Component", () => {
    let comp: NiveisEnsinoUpdateComponent;
    let fixture: ComponentFixture<NiveisEnsinoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let niveisEnsinoService: NiveisEnsinoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [NiveisEnsinoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(NiveisEnsinoUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(NiveisEnsinoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      niveisEnsinoService = TestBed.inject(NiveisEnsinoService);

      comp = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
      it("Should update editForm", () => {
        const niveisEnsino: INiveisEnsino = { id: 456 };

        activatedRoute.data = of({ niveisEnsino });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(
          expect.objectContaining(niveisEnsino)
        );
      });
    });

    describe("save", () => {
      it("Should call update service on save for existing entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<NiveisEnsino>>();
        const niveisEnsino = { id: 123 };
        jest.spyOn(niveisEnsinoService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ niveisEnsino });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: niveisEnsino }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(niveisEnsinoService.update).toHaveBeenCalledWith(niveisEnsino);
        expect(comp.isSaving).toEqual(false);
      });

      it("Should call create service on save for new entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<NiveisEnsino>>();
        const niveisEnsino = new NiveisEnsino();
        jest.spyOn(niveisEnsinoService, "create").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ niveisEnsino });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: niveisEnsino }));
        saveSubject.complete();

        // THEN
        expect(niveisEnsinoService.create).toHaveBeenCalledWith(niveisEnsino);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it("Should set isSaving to false on error", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<NiveisEnsino>>();
        const niveisEnsino = { id: 123 };
        jest.spyOn(niveisEnsinoService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ niveisEnsino });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error("This is an error!");

        // THEN
        expect(niveisEnsinoService.update).toHaveBeenCalledWith(niveisEnsino);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
