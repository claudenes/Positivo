jest.mock("@angular/router");

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of, Subject } from "rxjs";

import { ProfessoresTurmaService } from "../service/professores-turma.service";
import {
  IProfessoresTurma,
  ProfessoresTurma,
} from "../professores-turma.model";
import { IProfessores } from "app/entities/professores/professores.model";
import { ProfessoresService } from "app/entities/professores/service/professores.service";
import { ITurmas } from "app/entities/turmas/turmas.model";
import { TurmasService } from "app/entities/turmas/service/turmas.service";

import { ProfessoresTurmaUpdateComponent } from "./professores-turma-update.component";

describe("Component Tests", () => {
  describe("ProfessoresTurma Management Update Component", () => {
    let comp: ProfessoresTurmaUpdateComponent;
    let fixture: ComponentFixture<ProfessoresTurmaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let professoresTurmaService: ProfessoresTurmaService;
    let professoresService: ProfessoresService;
    let turmasService: TurmasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProfessoresTurmaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ProfessoresTurmaUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(ProfessoresTurmaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      professoresTurmaService = TestBed.inject(ProfessoresTurmaService);
      professoresService = TestBed.inject(ProfessoresService);
      turmasService = TestBed.inject(TurmasService);

      comp = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
      it("Should call Professores query and add missing value", () => {
        const professoresTurma: IProfessoresTurma = { id: 456 };
        const professores: IProfessores = { id: 43142 };
        professoresTurma.professores = professores;

        const professoresCollection: IProfessores[] = [{ id: 81961 }];
        jest
          .spyOn(professoresService, "query")
          .mockReturnValue(
            of(new HttpResponse({ body: professoresCollection }))
          );
        const additionalProfessores = [professores];
        const expectedCollection: IProfessores[] = [
          ...additionalProfessores,
          ...professoresCollection,
        ];
        jest
          .spyOn(professoresService, "addProfessoresToCollectionIfMissing")
          .mockReturnValue(expectedCollection);

        activatedRoute.data = of({ professoresTurma });
        comp.ngOnInit();

        expect(professoresService.query).toHaveBeenCalled();
        expect(
          professoresService.addProfessoresToCollectionIfMissing
        ).toHaveBeenCalledWith(professoresCollection, ...additionalProfessores);
        expect(comp.professoresSharedCollection).toEqual(expectedCollection);
      });

      it("Should call Turmas query and add missing value", () => {
        const professoresTurma: IProfessoresTurma = { id: 456 };
        const turmas: ITurmas = { id: 52872 };
        professoresTurma.turmas = turmas;

        const turmasCollection: ITurmas[] = [{ id: 15530 }];
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

        activatedRoute.data = of({ professoresTurma });
        comp.ngOnInit();

        expect(turmasService.query).toHaveBeenCalled();
        expect(
          turmasService.addTurmasToCollectionIfMissing
        ).toHaveBeenCalledWith(turmasCollection, ...additionalTurmas);
        expect(comp.turmasSharedCollection).toEqual(expectedCollection);
      });

      it("Should update editForm", () => {
        const professoresTurma: IProfessoresTurma = { id: 456 };
        const professores: IProfessores = { id: 99245 };
        professoresTurma.professores = professores;
        const turmas: ITurmas = { id: 25721 };
        professoresTurma.turmas = turmas;

        activatedRoute.data = of({ professoresTurma });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(
          expect.objectContaining(professoresTurma)
        );
        expect(comp.professoresSharedCollection).toContain(professores);
        expect(comp.turmasSharedCollection).toContain(turmas);
      });
    });

    describe("save", () => {
      it("Should call update service on save for existing entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ProfessoresTurma>>();
        const professoresTurma = { id: 123 };
        jest
          .spyOn(professoresTurmaService, "update")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ professoresTurma });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: professoresTurma }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(professoresTurmaService.update).toHaveBeenCalledWith(
          professoresTurma
        );
        expect(comp.isSaving).toEqual(false);
      });

      it("Should call create service on save for new entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ProfessoresTurma>>();
        const professoresTurma = new ProfessoresTurma();
        jest
          .spyOn(professoresTurmaService, "create")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ professoresTurma });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: professoresTurma }));
        saveSubject.complete();

        // THEN
        expect(professoresTurmaService.create).toHaveBeenCalledWith(
          professoresTurma
        );
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it("Should set isSaving to false on error", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ProfessoresTurma>>();
        const professoresTurma = { id: 123 };
        jest
          .spyOn(professoresTurmaService, "update")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ professoresTurma });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error("This is an error!");

        // THEN
        expect(professoresTurmaService.update).toHaveBeenCalledWith(
          professoresTurma
        );
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe("Tracking relationships identifiers", () => {
      describe("trackProfessoresById", () => {
        it("Should return tracked Professores primary key", () => {
          const entity = { id: 123 };
          const trackResult = comp.trackProfessoresById(0, entity);
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
