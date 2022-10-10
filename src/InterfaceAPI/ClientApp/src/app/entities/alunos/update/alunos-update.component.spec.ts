jest.mock("@angular/router");

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of, Subject } from "rxjs";

import { AlunosService } from "../service/alunos.service";
import { IAlunos, Alunos } from "../alunos.model";
import { INiveisEnsino } from "app/entities/niveis-ensino/niveis-ensino.model";
import { NiveisEnsinoService } from "app/entities/niveis-ensino/service/niveis-ensino.service";
import { IUnidadesFisicas } from "app/entities/unidades-fisicas/unidades-fisicas.model";
import { UnidadesFisicasService } from "app/entities/unidades-fisicas/service/unidades-fisicas.service";

import { AlunosUpdateComponent } from "./alunos-update.component";

describe("Component Tests", () => {
  describe("Alunos Management Update Component", () => {
    let comp: AlunosUpdateComponent;
    let fixture: ComponentFixture<AlunosUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let alunosService: AlunosService;
    let niveisEnsinoService: NiveisEnsinoService;
    let unidadesFisicasService: UnidadesFisicasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AlunosUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AlunosUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(AlunosUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      alunosService = TestBed.inject(AlunosService);
      niveisEnsinoService = TestBed.inject(NiveisEnsinoService);
      unidadesFisicasService = TestBed.inject(UnidadesFisicasService);

      comp = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
      it("Should call NiveisEnsino query and add missing value", () => {
        const alunos: IAlunos = { id: 456 };
        const niveisEnsino: INiveisEnsino = { id: 5482 };
        alunos.niveisEnsino = niveisEnsino;

        const niveisEnsinoCollection: INiveisEnsino[] = [{ id: 37619 }];
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

        activatedRoute.data = of({ alunos });
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
        const alunos: IAlunos = { id: 456 };
        const unidadesFisicas: IUnidadesFisicas = { id: 25068 };
        alunos.unidadesFisicas = unidadesFisicas;

        const unidadesFisicasCollection: IUnidadesFisicas[] = [{ id: 70800 }];
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

        activatedRoute.data = of({ alunos });
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
        const alunos: IAlunos = { id: 456 };
        const niveisEnsino: INiveisEnsino = { id: 62740 };
        alunos.niveisEnsino = niveisEnsino;
        const unidadesFisicas: IUnidadesFisicas = { id: 66587 };
        alunos.unidadesFisicas = unidadesFisicas;

        activatedRoute.data = of({ alunos });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(alunos));
        expect(comp.niveisEnsinosSharedCollection).toContain(niveisEnsino);
        expect(comp.unidadesFisicasSharedCollection).toContain(unidadesFisicas);
      });
    });

    describe("save", () => {
      it("Should call update service on save for existing entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Alunos>>();
        const alunos = { id: 123 };
        jest.spyOn(alunosService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ alunos });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: alunos }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(alunosService.update).toHaveBeenCalledWith(alunos);
        expect(comp.isSaving).toEqual(false);
      });

      it("Should call create service on save for new entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Alunos>>();
        const alunos = new Alunos();
        jest.spyOn(alunosService, "create").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ alunos });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: alunos }));
        saveSubject.complete();

        // THEN
        expect(alunosService.create).toHaveBeenCalledWith(alunos);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it("Should set isSaving to false on error", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Alunos>>();
        const alunos = { id: 123 };
        jest.spyOn(alunosService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ alunos });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error("This is an error!");

        // THEN
        expect(alunosService.update).toHaveBeenCalledWith(alunos);
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
