import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import * as dayjs from "dayjs";

import { DATE_FORMAT } from "app/config/input.constants";
import {
  IInterfaceIntegracao,
  InterfaceIntegracao,
} from "../interface-integracao.model";

import { InterfaceIntegracaoService } from "./interface-integracao.service";

describe("Service Tests", () => {
  describe("InterfaceIntegracao Service", () => {
    let service: InterfaceIntegracaoService;
    let httpMock: HttpTestingController;
    let elemDefault: IInterfaceIntegracao;
    let expectedResult:
      | IInterfaceIntegracao
      | IInterfaceIntegracao[]
      | boolean
      | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(InterfaceIntegracaoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        nomeintegracao: "AAAAAAA",
        servidorondeestainstalado: "AAAAAAA",
        usuario: "AAAAAAA",
        senha: "AAAAAAA",
        status: "AAAAAAA",
        dtatualizacao: currentDate,
      };
    });

    describe("Service methods", () => {
      it("should find an element", () => {
        const returnedFromService = Object.assign(
          {
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "GET" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it("should create a InterfaceIntegracao", () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dtatualizacao: currentDate,
          },
          returnedFromService
        );

        service
          .create(new InterfaceIntegracao())
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "POST" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should update a InterfaceIntegracao", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomeintegracao: "BBBBBB",
            servidorondeestainstalado: "BBBBBB",
            usuario: "BBBBBB",
            senha: "BBBBBB",
            status: "BBBBBB",
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dtatualizacao: currentDate,
          },
          returnedFromService
        );

        service
          .update(expected)
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "PUT" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should partial update a InterfaceIntegracao", () => {
        const patchObject = Object.assign(
          {
            usuario: "BBBBBB",
            senha: "BBBBBB",
            status: "BBBBBB",
          },
          new InterfaceIntegracao()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dtatualizacao: currentDate,
          },
          returnedFromService
        );

        service
          .partialUpdate(patchObject)
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "PATCH" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should return a list of InterfaceIntegracao", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomeintegracao: "BBBBBB",
            servidorondeestainstalado: "BBBBBB",
            usuario: "BBBBBB",
            senha: "BBBBBB",
            status: "BBBBBB",
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dtatualizacao: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "GET" });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it("should delete a InterfaceIntegracao", () => {
        service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: "DELETE" });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe("addInterfaceIntegracaoToCollectionIfMissing", () => {
        it("should add a InterfaceIntegracao to an empty array", () => {
          const interfaceIntegracao: IInterfaceIntegracao = { id: 123 };
          expectedResult = service.addInterfaceIntegracaoToCollectionIfMissing(
            [],
            interfaceIntegracao
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(interfaceIntegracao);
        });

        it("should not add a InterfaceIntegracao to an array that contains it", () => {
          const interfaceIntegracao: IInterfaceIntegracao = { id: 123 };
          const interfaceIntegracaoCollection: IInterfaceIntegracao[] = [
            {
              ...interfaceIntegracao,
            },
            { id: 456 },
          ];
          expectedResult = service.addInterfaceIntegracaoToCollectionIfMissing(
            interfaceIntegracaoCollection,
            interfaceIntegracao
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a InterfaceIntegracao to an array that doesn't contain it", () => {
          const interfaceIntegracao: IInterfaceIntegracao = { id: 123 };
          const interfaceIntegracaoCollection: IInterfaceIntegracao[] = [
            { id: 456 },
          ];
          expectedResult = service.addInterfaceIntegracaoToCollectionIfMissing(
            interfaceIntegracaoCollection,
            interfaceIntegracao
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(interfaceIntegracao);
        });

        it("should add only unique InterfaceIntegracao to an array", () => {
          const interfaceIntegracaoArray: IInterfaceIntegracao[] = [
            { id: 123 },
            { id: 456 },
            { id: 67746 },
          ];
          const interfaceIntegracaoCollection: IInterfaceIntegracao[] = [
            { id: 123 },
          ];
          expectedResult = service.addInterfaceIntegracaoToCollectionIfMissing(
            interfaceIntegracaoCollection,
            ...interfaceIntegracaoArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it("should accept varargs", () => {
          const interfaceIntegracao: IInterfaceIntegracao = { id: 123 };
          const interfaceIntegracao2: IInterfaceIntegracao = { id: 456 };
          expectedResult = service.addInterfaceIntegracaoToCollectionIfMissing(
            [],
            interfaceIntegracao,
            interfaceIntegracao2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(interfaceIntegracao);
          expect(expectedResult).toContain(interfaceIntegracao2);
        });

        it("should accept null and undefined values", () => {
          const interfaceIntegracao: IInterfaceIntegracao = { id: 123 };
          expectedResult = service.addInterfaceIntegracaoToCollectionIfMissing(
            [],
            null,
            interfaceIntegracao,
            undefined
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(interfaceIntegracao);
        });

        it("should return initial array if no InterfaceIntegracao is added", () => {
          const interfaceIntegracaoCollection: IInterfaceIntegracao[] = [
            { id: 123 },
          ];
          expectedResult = service.addInterfaceIntegracaoToCollectionIfMissing(
            interfaceIntegracaoCollection,
            undefined,
            null
          );
          expect(expectedResult).toEqual(interfaceIntegracaoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
