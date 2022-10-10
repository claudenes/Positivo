jest.mock("@angular/router");

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of, Subject } from "rxjs";

import { ProfessoresService } from "../service/professores.service";
import { IProfessores, Professores } from "../professores.model";

import { ProfessoresUpdateComponent } from "./professores-update.component";

describe("Component Tests", () => {
  describe("Professores Management Update Component", () => {
    let comp: ProfessoresUpdateComponent;
    let fixture: ComponentFixture<ProfessoresUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let professoresService: ProfessoresService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProfessoresUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ProfessoresUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(ProfessoresUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      professoresService = TestBed.inject(ProfessoresService);

      comp = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
      it("Should update editForm", () => {
        const professores: IProfessores = { id: 456 };

        activatedRoute.data = of({ professores });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(
          expect.objectContaining(professores)
        );
      });
    });

    describe("save", () => {
      it("Should call update service on save for existing entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Professores>>();
        const professores = { id: 123 };
        jest.spyOn(professoresService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ professores });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: professores }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(professoresService.update).toHaveBeenCalledWith(professores);
        expect(comp.isSaving).toEqual(false);
      });

      it("Should call create service on save for new entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Professores>>();
        const professores = new Professores();
        jest.spyOn(professoresService, "create").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ professores });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: professores }));
        saveSubject.complete();

        // THEN
        expect(professoresService.create).toHaveBeenCalledWith(professores);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it("Should set isSaving to false on error", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Professores>>();
        const professores = { id: 123 };
        jest.spyOn(professoresService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ professores });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error("This is an error!");

        // THEN
        expect(professoresService.update).toHaveBeenCalledWith(professores);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
