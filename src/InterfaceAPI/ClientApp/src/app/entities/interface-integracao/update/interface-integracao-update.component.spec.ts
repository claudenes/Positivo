jest.mock("@angular/router");

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of, Subject } from "rxjs";

import { InterfaceIntegracaoService } from "../service/interface-integracao.service";
import {
  IInterfaceIntegracao,
  InterfaceIntegracao,
} from "../interface-integracao.model";

import { InterfaceIntegracaoUpdateComponent } from "./interface-integracao-update.component";

describe("Component Tests", () => {
  describe("InterfaceIntegracao Management Update Component", () => {
    let comp: InterfaceIntegracaoUpdateComponent;
    let fixture: ComponentFixture<InterfaceIntegracaoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let interfaceIntegracaoService: InterfaceIntegracaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [InterfaceIntegracaoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(InterfaceIntegracaoUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(InterfaceIntegracaoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      interfaceIntegracaoService = TestBed.inject(InterfaceIntegracaoService);

      comp = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
      it("Should update editForm", () => {
        const interfaceIntegracao: IInterfaceIntegracao = { id: 456 };

        activatedRoute.data = of({ interfaceIntegracao });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(
          expect.objectContaining(interfaceIntegracao)
        );
      });
    });

    describe("save", () => {
      it("Should call update service on save for existing entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<InterfaceIntegracao>>();
        const interfaceIntegracao = { id: 123 };
        jest
          .spyOn(interfaceIntegracaoService, "update")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ interfaceIntegracao });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: interfaceIntegracao }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(interfaceIntegracaoService.update).toHaveBeenCalledWith(
          interfaceIntegracao
        );
        expect(comp.isSaving).toEqual(false);
      });

      it("Should call create service on save for new entity", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<InterfaceIntegracao>>();
        const interfaceIntegracao = new InterfaceIntegracao();
        jest
          .spyOn(interfaceIntegracaoService, "create")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ interfaceIntegracao });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: interfaceIntegracao }));
        saveSubject.complete();

        // THEN
        expect(interfaceIntegracaoService.create).toHaveBeenCalledWith(
          interfaceIntegracao
        );
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it("Should set isSaving to false on error", () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<InterfaceIntegracao>>();
        const interfaceIntegracao = { id: 123 };
        jest
          .spyOn(interfaceIntegracaoService, "update")
          .mockReturnValue(saveSubject);
        jest.spyOn(comp, "previousState");
        activatedRoute.data = of({ interfaceIntegracao });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error("This is an error!");

        // THEN
        expect(interfaceIntegracaoService.update).toHaveBeenCalledWith(
          interfaceIntegracao
        );
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
