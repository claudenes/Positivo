import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import * as dayjs from "dayjs";

import { DATE_FORMAT } from "app/config/input.constants";
import { IFuncionarios, Funcionarios } from "../funcionarios.model";

import { FuncionariosService } from "./funcionarios.service";

describe("Service Tests", () => {
  describe("Funcionarios Service", () => {
    let service: FuncionariosService;
    let httpMock: HttpTestingController;
    let elemDefault: IFuncionarios;
    let expectedResult: IFuncionarios | IFuncionarios[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(FuncionariosService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        funcionario: 0,
        nome: "AAAAAAA",
        primeironome: "AAAAAAA",
        sobrenome: "AAAAAAA",
        datanascimento: currentDate,
        cpf: 0,
        unidadefisicaFolha: "AAAAAAA",
        senha: "AAAAAAA",
        situacao: "AAAAAAA",
        dtatualizacao: currentDate,
      };
    });

    describe("Service methods", () => {
      it("should find an element", () => {
        const returnedFromService = Object.assign(
          {
            datanascimento: currentDate.format(DATE_FORMAT),
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "GET" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it("should create a Funcionarios", () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datanascimento: currentDate.format(DATE_FORMAT),
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datanascimento: currentDate,
            dtatualizacao: currentDate,
          },
          returnedFromService
        );

        service
          .create(new Funcionarios())
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "POST" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should update a Funcionarios", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            funcionario: 1,
            nome: "BBBBBB",
            primeironome: "BBBBBB",
            sobrenome: "BBBBBB",
            datanascimento: currentDate.format(DATE_FORMAT),
            cpf: 1,
            unidadefisicaFolha: "BBBBBB",
            senha: "BBBBBB",
            situacao: "BBBBBB",
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datanascimento: currentDate,
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

      it("should partial update a Funcionarios", () => {
        const patchObject = Object.assign(
          {
            funcionario: 1,
            nome: "BBBBBB",
            primeironome: "BBBBBB",
            senha: "BBBBBB",
            situacao: "BBBBBB",
          },
          new Funcionarios()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            datanascimento: currentDate,
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

      it("should return a list of Funcionarios", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            funcionario: 1,
            nome: "BBBBBB",
            primeironome: "BBBBBB",
            sobrenome: "BBBBBB",
            datanascimento: currentDate.format(DATE_FORMAT),
            cpf: 1,
            unidadefisicaFolha: "BBBBBB",
            senha: "BBBBBB",
            situacao: "BBBBBB",
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datanascimento: currentDate,
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

      it("should delete a Funcionarios", () => {
        service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: "DELETE" });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe("addFuncionariosToCollectionIfMissing", () => {
        it("should add a Funcionarios to an empty array", () => {
          const funcionarios: IFuncionarios = { id: 123 };
          expectedResult = service.addFuncionariosToCollectionIfMissing(
            [],
            funcionarios
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(funcionarios);
        });

        it("should not add a Funcionarios to an array that contains it", () => {
          const funcionarios: IFuncionarios = { id: 123 };
          const funcionariosCollection: IFuncionarios[] = [
            {
              ...funcionarios,
            },
            { id: 456 },
          ];
          expectedResult = service.addFuncionariosToCollectionIfMissing(
            funcionariosCollection,
            funcionarios
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Funcionarios to an array that doesn't contain it", () => {
          const funcionarios: IFuncionarios = { id: 123 };
          const funcionariosCollection: IFuncionarios[] = [{ id: 456 }];
          expectedResult = service.addFuncionariosToCollectionIfMissing(
            funcionariosCollection,
            funcionarios
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(funcionarios);
        });

        it("should add only unique Funcionarios to an array", () => {
          const funcionariosArray: IFuncionarios[] = [
            { id: 123 },
            { id: 456 },
            { id: 56317 },
          ];
          const funcionariosCollection: IFuncionarios[] = [{ id: 123 }];
          expectedResult = service.addFuncionariosToCollectionIfMissing(
            funcionariosCollection,
            ...funcionariosArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it("should accept varargs", () => {
          const funcionarios: IFuncionarios = { id: 123 };
          const funcionarios2: IFuncionarios = { id: 456 };
          expectedResult = service.addFuncionariosToCollectionIfMissing(
            [],
            funcionarios,
            funcionarios2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(funcionarios);
          expect(expectedResult).toContain(funcionarios2);
        });

        it("should accept null and undefined values", () => {
          const funcionarios: IFuncionarios = { id: 123 };
          expectedResult = service.addFuncionariosToCollectionIfMissing(
            [],
            null,
            funcionarios,
            undefined
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(funcionarios);
        });

        it("should return initial array if no Funcionarios is added", () => {
          const funcionariosCollection: IFuncionarios[] = [{ id: 123 }];
          expectedResult = service.addFuncionariosToCollectionIfMissing(
            funcionariosCollection,
            undefined,
            null
          );
          expect(expectedResult).toEqual(funcionariosCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
