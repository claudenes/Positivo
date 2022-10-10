jest.mock("@angular/router");

import { TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { of } from "rxjs";

import { IPessoasContato, PessoasContato } from "../pessoas-contato.model";
import { PessoasContatoService } from "../service/pessoas-contato.service";

import { PessoasContatoRoutingResolveService } from "./pessoas-contato-routing-resolve.service";

describe("Service Tests", () => {
  describe("PessoasContato routing resolve service", () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PessoasContatoRoutingResolveService;
    let service: PessoasContatoService;
    let resultPessoasContato: IPessoasContato | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(
        PessoasContatoRoutingResolveService
      );
      service = TestBed.inject(PessoasContatoService);
      resultPessoasContato = undefined;
    });

    describe("resolve", () => {
      it("should return IPessoasContato returned by find", () => {
        // GIVEN
        service.find = jest.fn((id) => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultPessoasContato = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPessoasContato).toEqual({ id: 123 });
      });

      it("should return new IPessoasContato if id is not provided", () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultPessoasContato = result;
          });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPessoasContato).toEqual(new PessoasContato());
      });

      it("should route to 404 page if data not found in server", () => {
        // GIVEN
        jest
          .spyOn(service, "find")
          .mockReturnValue(
            of(new HttpResponse({ body: null as unknown as PessoasContato }))
          );
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService
          .resolve(mockActivatedRouteSnapshot)
          .subscribe((result) => {
            resultPessoasContato = result;
          });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPessoasContato).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["404"]);
      });
    });
  });
});
