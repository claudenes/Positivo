jest.mock("@angular/router");

import { TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { of } from "rxjs";

import { IAlunos, Alunos } from "../alunos.model";
import { AlunosService } from "../service/alunos.service";

import { AlunosRoutingResolveService } from "./alunos-routing-resolve.service";

describe("Service Tests", () => {
  describe("Alunos routing resolve service", () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: AlunosRoutingResolveService;
    let service: AlunosService;
    let resultAlunos: IAlunos | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(AlunosRoutingResolveService);
      service = TestBed.inject(AlunosService);
      resultAlunos = undefined;
    });

    describe("resolve", () => {
      it("should return IAlunos returned by find", () => {
        // GIVEN
        service.find = jest.fn((id) => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultAlunos = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAlunos).toEqual({ id: 123 });
      });

      it("should return new IAlunos if id is not provided", () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultAlunos = result;
          });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultAlunos).toEqual(new Alunos());
      });

      it("should route to 404 page if data not found in server", () => {
        // GIVEN
        jest
          .spyOn(service, "find")
          .mockReturnValue(
            of(new HttpResponse({ body: null as unknown as Alunos }))
          );
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultAlunos = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAlunos).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["404"]);
      });
    });
  });
});
