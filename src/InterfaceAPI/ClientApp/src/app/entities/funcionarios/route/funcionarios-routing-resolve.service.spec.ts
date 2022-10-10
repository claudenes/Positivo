jest.mock("@angular/router");

import { TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { of } from "rxjs";

import { IFuncionarios, Funcionarios } from "../funcionarios.model";
import { FuncionariosService } from "../service/funcionarios.service";

import { FuncionariosRoutingResolveService } from "./funcionarios-routing-resolve.service";

describe("Service Tests", () => {
  describe("Funcionarios routing resolve service", () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: FuncionariosRoutingResolveService;
    let service: FuncionariosService;
    let resultFuncionarios: IFuncionarios | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(FuncionariosRoutingResolveService);
      service = TestBed.inject(FuncionariosService);
      resultFuncionarios = undefined;
    });

    describe("resolve", () => {
      it("should return IFuncionarios returned by find", () => {
        // GIVEN
        service.find = jest.fn((id) => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultFuncionarios = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultFuncionarios).toEqual({ id: 123 });
      });

      it("should return new IFuncionarios if id is not provided", () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultFuncionarios = result;
          });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultFuncionarios).toEqual(new Funcionarios());
      });

      it("should route to 404 page if data not found in server", () => {
        // GIVEN
        jest
          .spyOn(service, "find")
          .mockReturnValue(
            of(new HttpResponse({ body: null as unknown as Funcionarios }))
          );
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultFuncionarios = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultFuncionarios).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["404"]);
      });
    });
  });
});
