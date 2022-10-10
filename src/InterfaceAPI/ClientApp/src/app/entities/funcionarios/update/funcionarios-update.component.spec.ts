jest.mock("@angular/router");

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of, Subject } from "rxjs";

import { FuncionariosService } from "../service/funcionarios.service";
import { IFuncionarios, Funcionarios } from "../funcionarios.model";

import { FuncionariosUpdateComponent } from "./funcionarios-update.component";

describe("Component Tests", () => {
  describe("Funcionarios Management Update Component", () => {
    let comp: FuncionariosUpdateComponent;
    let fixture: ComponentFixture<FuncionariosUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let funcionariosService: FuncionariosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [FuncionariosUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(FuncionariosUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(FuncionariosUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      funcionariosService = TestBed.inject(FuncionariosService);

      comp = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
      it("Should update editForm", () => {
        const funcionarios: IFuncionarios = { id: 456 };

        activatedRoute.data = of({ funcionarios });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(
          expect.objectContaining(funcionarios)
        );
      });
    });

    describe("save", () => {
      it("Should call update service on save for existing entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Funcionarios>>();
        const funcionarios = { id: 123 };
        jest.spyOn(funcionariosService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ funcionarios });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: funcionarios }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(funcionariosService.update).toHaveBeenCalledWith(funcionarios);
        expect(comp.isSaving).toEqual(false);
      });

      it("Should call create service on save for new entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Funcionarios>>();
        const funcionarios = new Funcionarios();
        jest.spyOn(funcionariosService, "create").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ funcionarios });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: funcionarios }));
        saveSubject.complete();

        // THEN
        expect(funcionariosService.create).toHaveBeenCalledWith(funcionarios);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it("Should set isSaving to false on error", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Funcionarios>>();
        const funcionarios = { id: 123 };
        jest.spyOn(funcionariosService, "update").mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ funcionarios });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error("This is an error!");

        // THEN
        expect(funcionariosService.update).toHaveBeenCalledWith(funcionarios);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
