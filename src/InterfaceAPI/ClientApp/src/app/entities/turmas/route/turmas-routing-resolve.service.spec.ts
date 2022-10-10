jest.mock("@angular/router");

import { TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { of } from "rxjs";

import { ITurmas, Turmas } from "../turmas.model";
import { TurmasService } from "../service/turmas.service";

import { TurmasRoutingResolveService } from "./turmas-routing-resolve.service";

describe("Service Tests", () => {
  describe("Turmas routing resolve service", () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TurmasRoutingResolveService;
    let service: TurmasService;
    let resultTurmas: ITurmas | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TurmasRoutingResolveService);
      service = TestBed.inject(TurmasService);
      resultTurmas = undefined;
    });

    describe("resolve", () => {
      it("should return ITurmas returned by find", () => {
        // GIVEN
        service.find = jest.fn((id) => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultTurmas = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTurmas).toEqual({ id: 123 });
      });

      it("should return new ITurmas if id is not provided", () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultTurmas = result;
          });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTurmas).toEqual(new Turmas());
      });

      it("should route to 404 page if data not found in server", () => {
        // GIVEN
        jest
          .spyOn(service, "find")
          .mockReturnValue(
            of(new HttpResponse({ body: null as unknown as Turmas }))
          );
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultTurmas = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTurmas).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["404"]);
      });
    });
  });
});
