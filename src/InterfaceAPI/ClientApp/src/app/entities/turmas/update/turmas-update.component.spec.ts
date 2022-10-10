jest.mock("@angular/router");

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of, Subject } from "rxjs";

import { TurmasService } from "../service/turmas.service";
import { ITurmas, Turmas } from "../turmas.model";
import { INiveisEnsino } from "app/entities/niveis-ensino/niveis-ensino.model";
import { NiveisEnsinoService } from "app/entities/niveis-ensino/service/niveis-ensino.service";
import { IUnidadesFisicas } from "app/entities/unidades-fisicas/unidades-fisicas.model";
import { UnidadesFisicasService } from "app/entities/unidades-fisicas/service/unidades-fisicas.service";

import { TurmasUpdateComponent } from "./turmas-update.component";

describe("Component Tests", () => {
  describe("Turmas Management Update Component", () => {
    let comp: TurmasUpdateComponent;
    let fixture: ComponentFixture<TurmasUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let turmasService: TurmasService;
    let niveisEnsinoService: NiveisEnsinoService;
    let unidadesFisicasService: UnidadesFisicasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TurmasUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TurmasUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(TurmasUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      turmasService = TestBed.inject(TurmasService);
      niveisEnsinoService = TestBed.inject(NiveisEnsinoService);
      unidadesFisicasService = TestBed.inject(UnidadesFisicasService);

      comp = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
      it("Should call NiveisEnsino query and add missing value", () => {
        const turmas: ITurmas = { id: 456 };
        const niveisEnsino: INiveisEnsino = { id: 68146 };
        turmas.niveisEnsino = niveisEnsino;

        const niveisEnsinoCollection: INiveisEnsino[] = [{ id: 66487 }];
        jest
          .spyOn(niveisEnsinoService, "query")
          .mockReturnValue(
            of(new HttpResponse({ body: niveisEnsinoCollection }))
          );
        const additionalNiveisEnsinos = [niveisEnsino];
        const expectedCollection: INiveisEnsino[] = [
          ...additionalNiveisEnsinos,
          ...niveisEnsinoCollection,
        ];
        jest
          .spyOn(niveisEnsinoService, "addNiveisEnsinoToCollectionIfMissing")
          .mockReturnValue(expectedCollection);

        activatedRoute.data = of({ turmas });
        comp.ngOnInit();

        expect(niveisEnsinoService.query).toHaveBeenCalled();
        expect(
          niveisEnsinoService.addNiveisEnsinoToCollectionIfMissing
        ).toHaveBeenCalledWith(
          niveisEnsinoCollection,
          ...additionalNiveisEnsinos
        );
        expect(comp.niveisEnsinosSharedCollection).toEqual(expectedCollection);
      });

      it("Should call UnidadesFisicas query and add missing value", () => {
        const turmas: ITurmas = { id: 456 };
        const unidadesFisicas: IUnidadesFisicas = { id: 2871 };
        turmas.unidadesFisicas = unidadesFisicas;

        const unidadesFisicasCollection: IUnidadesFisicas[] = [{ id: 4492 }];
        jest
          .spyOn(unidadesFisicasService, "query")
          .mockReturnValue(
            of(new HttpResponse({ body: unidadesFisicasCollection }))
          );
        const additionalUnidadesFisicas = [unidadesFisicas];
        const expectedCollection: IUnidadesFisicas[] = [
          ...additionalUnidadesFisicas,
          ...unidadesFisicasCollection,
        ];
        jest
          .spyOn(
            unidadesFisicasService,
            "addUnidadesFisicasToCollectionIfMissing"
          )
          .mockReturnValue(expectedCollection);

        activatedRoute.data = of({ turmas });
        comp.ngOnInit();

        expect(unidadesFisicasService.query).toHaveBeenCalled();
        expect(
          unidadesFisicasService.addUnidadesFisicasToCollectionIfMissing
        ).toHaveBeenCalledWith(
          unidadesFisicasCollection,
          ...additionalUnidadesFisicas
        );
        expect(comp.unidadesFisicasSharedCollection).toEqual(
          expectedCollection
        );
      });

      it("Should update editForm", () => {
        const turmas: ITurmas = { id: 456 };
        const niveisEnsino: INiveisEnsino = { id: 31946 };
        turmas.niveisEnsino = niveisEnsino;
        const unidadesFisicas: IUnidadesFisicas = { id: 96311 };
        turmas.unidadesFisicas = unidadesFisicas;

        activatedRoute.data = of({ turmas });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(turmas));
        expect(comp.niveisEnsinosSharedCollection).toContain(niveisEnsino);
        expect(comp.unidadesFisicasSharedCollection).toContain(unidadesFisicas);
      });
    });

    describe("save", () => {
      it("Should call update service on save for existing entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Turmas>>();
        const turmas = { id: 123 };
        jest.spyOn(turmasService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ turmas });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: turmas }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(turmasService.update).toHaveBeenCalledWith(turmas);
        expect(comp.isSaving).toEqual(false);
      });

      it("Should call create service on save for new entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Turmas>>();
        const turmas = new Turmas();
        jest.spyOn(turmasService, "create").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ turmas });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: turmas }));
        saveSubject.complete();

        // THEN
        expect(turmasService.create).toHaveBeenCalledWith(turmas);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it("Should set isSaving to false on error", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Turmas>>();
        const turmas = { id: 123 };
        jest.spyOn(turmasService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ turmas });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error("This is an error!");

        // THEN
        expect(turmasService.update).toHaveBeenCalledWith(turmas);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe("Tracking relationships identifiers", () => {
      describe("trackNiveisEnsinoById", () => {
        it("Should return tracked NiveisEnsino primary key", () => {
          const entity = { id: 123 };
          const trackResult = comp.trackNiveisEnsinoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe("trackUnidadesFisicasById", () => {
        it("Should return tracked UnidadesFisicas primary key", () => {
          const entity = { id: 123 };
          const trackResult = comp.trackUnidadesFisicasById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
