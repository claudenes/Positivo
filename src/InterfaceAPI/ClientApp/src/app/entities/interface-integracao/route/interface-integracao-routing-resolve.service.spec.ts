jest.mock("@angular/router");

import { TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { of } from "rxjs";

import {
  IInterfaceIntegracao,
  InterfaceIntegracao,
} from "../interface-integracao.model";
import { InterfaceIntegracaoService } from "../service/interface-integracao.service";

import { InterfaceIntegracaoRoutingResolveService } from "./interface-integracao-routing-resolve.service";

describe("Service Tests", () => {
  describe("InterfaceIntegracao routing resolve service", () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: InterfaceIntegracaoRoutingResolveService;
    let service: InterfaceIntegracaoService;
    let resultInterfaceIntegracao: IInterfaceIntegracao | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(
        InterfaceIntegracaoRoutingResolveService
      );
      service = TestBed.inject(InterfaceIntegracaoService);
      resultInterfaceIntegracao = undefined;
    });

    describe("resolve", () => {
      it("should return IInterfaceIntegracao returned by find", () => {
        // GIVEN
        service.find = jest.fn((id) => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultInterfaceIntegracao = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultInterfaceIntegracao).toEqual({ id: 123 });
      });

      it("should return new IInterfaceIntegracao if id is not provided", () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultInterfaceIntegracao = result;
          });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultInterfaceIntegracao).toEqual(new InterfaceIntegracao());
      });

      it("should route to 404 page if data not found in server", () => {
        // GIVEN
        jest
          .spyOn(service, "find")
          .mockReturnValue(
            of(
              new HttpResponse({ body: null as unknown as InterfaceIntegracao })
            )
          );
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultInterfaceIntegracao = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultInterfaceIntegracao).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["404"]);
      });
    });
  });
});
