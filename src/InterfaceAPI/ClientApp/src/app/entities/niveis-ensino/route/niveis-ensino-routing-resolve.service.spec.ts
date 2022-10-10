jest.mock("@angular/router");

import { TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { of } from "rxjs";

import { INiveisEnsino, NiveisEnsino } from "../niveis-ensino.model";
import { NiveisEnsinoService } from "../service/niveis-ensino.service";

import { NiveisEnsinoRoutingResolveService } from "./niveis-ensino-routing-resolve.service";

describe("Service Tests", () => {
  describe("NiveisEnsino routing resolve service", () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: NiveisEnsinoRoutingResolveService;
    let service: NiveisEnsinoService;
    let resultNiveisEnsino: INiveisEnsino | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(NiveisEnsinoRoutingResolveService);
      service = TestBed.inject(NiveisEnsinoService);
      resultNiveisEnsino = undefined;
    });

    describe("resolve", () => {
      it("should return INiveisEnsino returned by find", () => {
        // GIVEN
        service.find = jest.fn((id) => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultNiveisEnsino = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultNiveisEnsino).toEqual({ id: 123 });
      });

      it("should return new INiveisEnsino if id is not provided", () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultNiveisEnsino = result;
          });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultNiveisEnsino).toEqual(new NiveisEnsino());
      });

      it("should route to 404 page if data not found in server", () => {
        // GIVEN
        jest
          .spyOn(service, "find")
          .mockReturnValue(
            of(new HttpResponse({ body: null as unknown as NiveisEnsino }))
          );
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultNiveisEnsino = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultNiveisEnsino).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["404"]);
      });
    });
  });
});
