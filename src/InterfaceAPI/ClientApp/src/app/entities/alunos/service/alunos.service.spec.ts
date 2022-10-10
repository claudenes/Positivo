import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import * as dayjs from "dayjs";

import { DATE_FORMAT } from "app/config/input.constants";
import { IAlunos, Alunos } from "../alunos.model";

import { AlunosService } from "./alunos.service";

describe("Service Tests", () => {
  describe("Alunos Service", () => {
    let service: AlunosService;
    let httpMock: HttpTestingController;
    let elemDefault: IAlunos;
    let expectedResult: IAlunos | IAlunos[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(AlunosService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        aluno: "AAAAAAA",
        pessoa: 0,
        nome: "AAAAAAA",
        sobrenome: "AAAAAAA",
        primeironome: "AAAAAAA",
        situacao: "AAAAAAA",
        turno: "AAAAAAA",
        curriculo: "AAAAAAA",
        serie: 0,
        anoingresso: 0,
        senha: "AAAAAAA",
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

      it("should create a Alunos", () => {
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
          .create(new Alunos())
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "POST" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should update a Alunos", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            aluno: "BBBBBB",
            pessoa: 1,
            nome: "BBBBBB",
            sobrenome: "BBBBBB",
            primeironome: "BBBBBB",
            situacao: "BBBBBB",
            turno: "BBBBBB",
            curriculo: "BBBBBB",
            serie: 1,
            anoingresso: 1,
            senha: "BBBBBB",
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

      it("should partial update a Alunos", () => {
        const patchObject = Object.assign(
          {
            situacao: "BBBBBB",
            turno: "BBBBBB",
            serie: 1,
            senha: "BBBBBB",
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          new Alunos()
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

      it("should return a list of Alunos", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            aluno: "BBBBBB",
            pessoa: 1,
            nome: "BBBBBB",
            sobrenome: "BBBBBB",
            primeironome: "BBBBBB",
            situacao: "BBBBBB",
            turno: "BBBBBB",
            curriculo: "BBBBBB",
            serie: 1,
            anoingresso: 1,
            senha: "BBBBBB",
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

      it("should delete a Alunos", () => {
        service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: "DELETE" });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe("addAlunosToCollectionIfMissing", () => {
        it("should add a Alunos to an empty array", () => {
          const alunos: IAlunos = { id: 123 };
          expectedResult = service.addAlunosToCollectionIfMissing([], alunos);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(alunos);
        });

        it("should not add a Alunos to an array that contains it", () => {
          const alunos: IAlunos = { id: 123 };
          const alunosCollection: IAlunos[] = [
            {
              ...alunos,
            },
            { id: 456 },
          ];
          expectedResult = service.addAlunosToCollectionIfMissing(
            alunosCollection,
            alunos
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Alunos to an array that doesn't contain it", () => {
          const alunos: IAlunos = { id: 123 };
          const alunosCollection: IAlunos[] = [{ id: 456 }];
          expectedResult = service.addAlunosToCollectionIfMissing(
            alunosCollection,
            alunos
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(alunos);
        });

        it("should add only unique Alunos to an array", () => {
          const alunosArray: IAlunos[] = [
            { id: 123 },
            { id: 456 },
            { id: 57825 },
          ];
          const alunosCollection: IAlunos[] = [{ id: 123 }];
          expectedResult = service.addAlunosToCollectionIfMissing(
            alunosCollection,
            ...alunosArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it("should accept varargs", () => {
          const alunos: IAlunos = { id: 123 };
          const alunos2: IAlunos = { id: 456 };
          expectedResult = service.addAlunosToCollectionIfMissing(
            [],
            alunos,
            alunos2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(alunos);
          expect(expectedResult).toContain(alunos2);
        });

        it("should accept null and undefined values", () => {
          const alunos: IAlunos = { id: 123 };
          expectedResult = service.addAlunosToCollectionIfMissing(
            [],
            null,
            alunos,
            undefined
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(alunos);
        });

        it("should return initial array if no Alunos is added", () => {
          const alunosCollection: IAlunos[] = [{ id: 123 }];
          expectedResult = service.addAlunosToCollectionIfMissing(
            alunosCollection,
            undefined,
            null
          );
          expect(expectedResult).toEqual(alunosCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
