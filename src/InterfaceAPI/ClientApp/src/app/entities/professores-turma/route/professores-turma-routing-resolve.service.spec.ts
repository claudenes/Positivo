jest.mock("@angular/router");

import { TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { of } from "rxjs";

import {
  IProfessoresTurma,
  ProfessoresTurma,
} from "../professores-turma.model";
import { ProfessoresTurmaService } from "../service/professores-turma.service";

import { ProfessoresTurmaRoutingResolveService } from "./professores-turma-routing-resolve.service";

describe("Service Tests", () => {
  describe("ProfessoresTurma routing resolve service", () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ProfessoresTurmaRoutingResolveService;
    let service: ProfessoresTurmaService;
    let resultProfessoresTurma: IProfessoresTurma | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(
        ProfessoresTurmaRoutingResolveService
      );
      service = TestBed.inject(ProfessoresTurmaService);
      resultProfessoresTurma = undefined;
    });

    describe("resolve", () => {
      it("should return IProfessoresTurma returned by find", () => {
        // GIVEN
        service.find = jest.fn((id) => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultProfessoresTurma = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultProfessoresTurma).toEqual({ id: 123 });
      });

      it("should return new IProfessoresTurma if id is not provided", () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultProfessoresTurma = result;
          });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultProfessoresTurma).toEqual(new ProfessoresTurma());
      });

      it("should route to 404 page if data not found in server", () => {
        // GIVEN
        jest
          .spyOn(service, "find")
          .mockReturnValue(
            of(new HttpResponse({ body: null as unknown as ProfessoresTurma }))
          );
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultProfessoresTurma = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultProfessoresTurma).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["404"]);
      });
    });
  });
});
