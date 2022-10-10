jest.mock("@angular/router");

import { TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { of } from "rxjs";

import { IAlunosTurma, AlunosTurma } from "../alunos-turma.model";
import { AlunosTurmaService } from "../service/alunos-turma.service";

import { AlunosTurmaRoutingResolveService } from "./alunos-turma-routing-resolve.service";

describe("Service Tests", () => {
  describe("AlunosTurma routing resolve service", () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: AlunosTurmaRoutingResolveService;
    let service: AlunosTurmaService;
    let resultAlunosTurma: IAlunosTurma | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(AlunosTurmaRoutingResolveService);
      service = TestBed.inject(AlunosTurmaService);
      resultAlunosTurma = undefined;
    });

    describe("resolve", () => {
      it("should return IAlunosTurma returned by find", () => {
        // GIVEN
        service.find = jest.fn((id) => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultAlunosTurma = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAlunosTurma).toEqual({ id: 123 });
      });

      it("should return new IAlunosTurma if id is not provided", () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultAlunosTurma = result;
          });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultAlunosTurma).toEqual(new AlunosTurma());
      });

      it("should route to 404 page if data not found in server", () => {
        // GIVEN
        jest
          .spyOn(service, "find")
          .mockReturnValue(
            of(new HttpResponse({ body: null as unknown as AlunosTurma }))
          );
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultAlunosTurma = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAlunosTurma).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["404"]);
      });
    });
  });
});
