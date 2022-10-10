import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import * as dayjs from "dayjs";

import { DATE_FORMAT } from "app/config/input.constants";
import { INiveisEnsino, NiveisEnsino } from "../niveis-ensino.model";

import { NiveisEnsinoService } from "./niveis-ensino.service";

describe("Service Tests", () => {
  describe("NiveisEnsino Service", () => {
    let service: NiveisEnsinoService;
    let httpMock: HttpTestingController;
    let elemDefault: INiveisEnsino;
    let expectedResult: INiveisEnsino | INiveisEnsino[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(NiveisEnsinoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        nivelensino: "AAAAAAA",
        nome: "AAAAAAA",
        unidaderesponsavel: "AAAAAAA",
        situacao: "AAAAAAA",
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

      it("should create a NiveisEnsino", () => {
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
          .create(new NiveisEnsino())
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "POST" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should update a NiveisEnsino", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nivelensino: "BBBBBB",
            nome: "BBBBBB",
            unidaderesponsavel: "BBBBBB",
            situacao: "BBBBBB",
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

      it("should partial update a NiveisEnsino", () => {
        const patchObject = Object.assign(
          {
            nivelensino: "BBBBBB",
            unidaderesponsavel: "BBBBBB",
            situacao: "BBBBBB",
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          new NiveisEnsino()
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

      it("should return a list of NiveisEnsino", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nivelensino: "BBBBBB",
            nome: "BBBBBB",
            unidaderesponsavel: "BBBBBB",
            situacao: "BBBBBB",
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

      it("should delete a NiveisEnsino", () => {
        service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: "DELETE" });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe("addNiveisEnsinoToCollectionIfMissing", () => {
        it("should add a NiveisEnsino to an empty array", () => {
          const niveisEnsino: INiveisEnsino = { id: 123 };
          expectedResult = service.addNiveisEnsinoToCollectionIfMissing(
            [],
            niveisEnsino
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(niveisEnsino);
        });

        it("should not add a NiveisEnsino to an array that contains it", () => {
          const niveisEnsino: INiveisEnsino = { id: 123 };
          const niveisEnsinoCollection: INiveisEnsino[] = [
            {
              ...niveisEnsino,
            },
            { id: 456 },
          ];
          expectedResult = service.addNiveisEnsinoToCollectionIfMissing(
            niveisEnsinoCollection,
            niveisEnsino
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a NiveisEnsino to an array that doesn't contain it", () => {
          const niveisEnsino: INiveisEnsino = { id: 123 };
          const niveisEnsinoCollection: INiveisEnsino[] = [{ id: 456 }];
          expectedResult = service.addNiveisEnsinoToCollectionIfMissing(
            niveisEnsinoCollection,
            niveisEnsino
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(niveisEnsino);
        });

        it("should add only unique NiveisEnsino to an array", () => {
          const niveisEnsinoArray: INiveisEnsino[] = [
            { id: 123 },
            { id: 456 },
            { id: 6175 },
          ];
          const niveisEnsinoCollection: INiveisEnsino[] = [{ id: 123 }];
          expectedResult = service.addNiveisEnsinoToCollectionIfMissing(
            niveisEnsinoCollection,
            ...niveisEnsinoArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it("should accept varargs", () => {
          const niveisEnsino: INiveisEnsino = { id: 123 };
          const niveisEnsino2: INiveisEnsino = { id: 456 };
          expectedResult = service.addNiveisEnsinoToCollectionIfMissing(
            [],
            niveisEnsino,
            niveisEnsino2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(niveisEnsino);
          expect(expectedResult).toContain(niveisEnsino2);
        });

        it("should accept null and undefined values", () => {
          const niveisEnsino: INiveisEnsino = { id: 123 };
          expectedResult = service.addNiveisEnsinoToCollectionIfMissing(
            [],
            null,
            niveisEnsino,
            undefined
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(niveisEnsino);
        });

        it("should return initial array if no NiveisEnsino is added", () => {
          const niveisEnsinoCollection: INiveisEnsino[] = [{ id: 123 }];
          expectedResult = service.addNiveisEnsinoToCollectionIfMissing(
            niveisEnsinoCollection,
            undefined,
            null
          );
          expect(expectedResult).toEqual(niveisEnsinoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
