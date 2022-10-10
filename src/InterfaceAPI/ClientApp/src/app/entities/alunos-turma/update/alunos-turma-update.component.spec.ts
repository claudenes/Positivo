jest.mock("@angular/router");

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of, Subject } from "rxjs";

import { AlunosTurmaService } from "../service/alunos-turma.service";
import { IAlunosTurma, AlunosTurma } from "../alunos-turma.model";
import { IAlunos } from "app/entities/alunos/alunos.model";
import { AlunosService } from "app/entities/alunos/service/alunos.service";
import { ITurmas } from "app/entities/turmas/turmas.model";
import { TurmasService } from "app/entities/turmas/service/turmas.service";

import { AlunosTurmaUpdateComponent } from "./alunos-turma-update.component";

describe("Component Tests", () => {
  describe("AlunosTurma Management Update Component", () => {
    let comp: AlunosTurmaUpdateComponent;
    let fixture: ComponentFixture<AlunosTurmaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let alunosTurmaService: AlunosTurmaService;
    let alunosService: AlunosService;
    let turmasService: TurmasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AlunosTurmaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AlunosTurmaUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(AlunosTurmaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      alunosTurmaService = TestBed.inject(AlunosTurmaService);
      alunosService = TestBed.inject(AlunosService);
      turmasService = TestBed.inject(TurmasService);

      comp = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
      it("Should call Alunos query and add missing value", () => {
        const alunosTurma: IAlunosTurma = { id: 456 };
        const alunos: IAlunos = { id: 6950 };
        alunosTurma.alunos = alunos;

        const alunosCollection: IAlunos[] = [{ id: 53545 }];
        jest
          .spyOn(alunosService, "query")
          .mockReturnValue(of(new HttpResponse({ body: alunosCollection })));
        const additionalAlunos = [alunos];
        const expectedCollection: IAlunos[] = [
          ...additionalAlunos,
          ...alunosCollection,
        ];
        jest
          .spyOn(alunosService, "addAlunosToCollectionIfMissing")
          .mockReturnValue(expectedCollection);

        activatedRoute.data = of({ alunosTurma });
        comp.ngOnInit();

        expect(alunosService.query).toHaveBeenCalled();
        expect(
          alunosService.addAlunosToCollectionIfMissing
        ).toHaveBeenCalledWith(alunosCollection, ...additionalAlunos);
        expect(comp.alunosSharedCollection).toEqual(expectedCollection);
      });

      it("Should call Turmas query and add missing value", () => {
        const alunosTurma: IAlunosTurma = { id: 456 };
        const turmas: ITurmas = { id: 54348 };
        alunosTurma.turmas = turmas;

        const turmasCollection: ITurmas[] = [{ id: 25140 }];
        jest
          .spyOn(turmasService, "query")
          .mockReturnValue(of(new HttpResponse({ body: turmasCollection })));
        const additionalTurmas = [turmas];
        const expectedCollection: ITurmas[] = [
          ...additionalTurmas,
          ...turmasCollection,
        ];
        jest
          .spyOn(turmasService, "addTurmasToCollectionIfMissing")
          .mockReturnValue(expectedCollection);

        activatedRoute.data = of({ alunosTurma });
        comp.ngOnInit();

        expect(turmasService.query).toHaveBeenCalled();
        expect(
          turmasService.addTurmasToCollectionIfMissing
        ).toHaveBeenCalledWith(turmasCollection, ...additionalTurmas);
        expect(comp.turmasSharedCollection).toEqual(expectedCollection);
      });

      it("Should update editForm", () => {
        const alunosTurma: IAlunosTurma = { id: 456 };
        const alunos: IAlunos = { id: 43465 };
        alunosTurma.alunos = alunos;
        const turmas: ITurmas = { id: 35881 };
        alunosTurma.turmas = turmas;

        activatedRoute.data = of({ alunosTurma });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(
          expect.objectContaining(alunosTurma)
        );
        expect(comp.alunosSharedCollection).toContain(alunos);
        expect(comp.turmasSharedCollection).toContain(turmas);
      });
    });

    describe("save", () => {
      it("Should call update service on save for existing entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<AlunosTurma>>();
        const alunosTurma = { id: 123 };
        jest.spyOn(alunosTurmaService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ alunosTurma });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: alunosTurma }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(alunosTurmaService.update).toHaveBeenCalledWith(alunosTurma);
        expect(comp.isSaving).toEqual(false);
      });

      it("Should call create service on save for new entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<AlunosTurma>>();
        const alunosTurma = new AlunosTurma();
        jest.spyOn(alunosTurmaService, "create").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ alunosTurma });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: alunosTurma }));
        saveSubject.complete();

        // THEN
        expect(alunosTurmaService.create).toHaveBeenCalledWith(alunosTurma);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it("Should set isSaving to false on error", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<AlunosTurma>>();
        const alunosTurma = { id: 123 };
        jest.spyOn(alunosTurmaService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ alunosTurma });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error("This is an error!");

        // THEN
        expect(alunosTurmaService.update).toHaveBeenCalledWith(alunosTurma);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe("Tracking relationships identifiers", () => {
      describe("trackAlunosById", () => {
        it("Should return tracked Alunos primary key", () => {
          const entity = { id: 123 };
          const trackResult = comp.trackAlunosById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe("trackTurmasById", () => {
        it("Should return tracked Turmas primary key", () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTurmasById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
