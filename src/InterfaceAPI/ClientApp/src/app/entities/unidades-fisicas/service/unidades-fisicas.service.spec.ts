import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import * as dayjs from "dayjs";

import { DATE_FORMAT } from "app/config/input.constants";
import { IUnidadesFisicas, UnidadesFisicas } from "../unidades-fisicas.model";

import { UnidadesFisicasService } from "./unidades-fisicas.service";

describe("Service Tests", () => {
  describe("UnidadesFisicas Service", () => {
    let service: UnidadesFisicasService;
    let httpMock: HttpTestingController;
    let elemDefault: IUnidadesFisicas;
    let expectedResult: IUnidadesFisicas | IUnidadesFisicas[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(UnidadesFisicasService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        unidadefisica: "AAAAAAA",
        unidadefisicafolha: "AAAAAAA",
        nome: "AAAAAAA",
        cnpj: "AAAAAAA",
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

      it("should create a UnidadesFisicas", () => {
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
          .create(new UnidadesFisicas())
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "POST" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should update a UnidadesFisicas", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            unidadefisica: "BBBBBB",
            unidadefisicafolha: "BBBBBB",
            nome: "BBBBBB",
            cnpj: "BBBBBB",
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

      it("should partial update a UnidadesFisicas", () => {
        const patchObject = Object.assign(
          {
            unidadefisicafolha: "BBBBBB",
            nome: "BBBBBB",
            cnpj: "BBBBBB",
            situacao: "BBBBBB",
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          new UnidadesFisicas()
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

      it("should return a list of UnidadesFisicas", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            unidadefisica: "BBBBBB",
            unidadefisicafolha: "BBBBBB",
            nome: "BBBBBB",
            cnpj: "BBBBBB",
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

      it("should delete a UnidadesFisicas", () => {
        service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: "DELETE" });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe("addUnidadesFisicasToCollectionIfMissing", () => {
        it("should add a UnidadesFisicas to an empty array", () => {
          const unidadesFisicas: IUnidadesFisicas = { id: 123 };
          expectedResult = service.addUnidadesFisicasToCollectionIfMissing(
            [],
            unidadesFisicas
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(unidadesFisicas);
        });

        it("should not add a UnidadesFisicas to an array that contains it", () => {
          const unidadesFisicas: IUnidadesFisicas = { id: 123 };
          const unidadesFisicasCollection: IUnidadesFisicas[] = [
            {
              ...unidadesFisicas,
            },
            { id: 456 },
          ];
          expectedResult = service.addUnidadesFisicasToCollectionIfMissing(
            unidadesFisicasCollection,
            unidadesFisicas
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a UnidadesFisicas to an array that doesn't contain it", () => {
          const unidadesFisicas: IUnidadesFisicas = { id: 123 };
          const unidadesFisicasCollection: IUnidadesFisicas[] = [{ id: 456 }];
          expectedResult = service.addUnidadesFisicasToCollectionIfMissing(
            unidadesFisicasCollection,
            unidadesFisicas
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(unidadesFisicas);
        });

        it("should add only unique UnidadesFisicas to an array", () => {
          const unidadesFisicasArray: IUnidadesFisicas[] = [
            { id: 123 },
            { id: 456 },
            { id: 29486 },
          ];
          const unidadesFisicasCollection: IUnidadesFisicas[] = [{ id: 123 }];
          expectedResult = service.addUnidadesFisicasToCollectionIfMissing(
            unidadesFisicasCollection,
            ...unidadesFisicasArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it("should accept varargs", () => {
          const unidadesFisicas: IUnidadesFisicas = { id: 123 };
          const unidadesFisicas2: IUnidadesFisicas = { id: 456 };
          expectedResult = service.addUnidadesFisicasToCollectionIfMissing(
            [],
            unidadesFisicas,
            unidadesFisicas2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(unidadesFisicas);
          expect(expectedResult).toContain(unidadesFisicas2);
        });

        it("should accept null and undefined values", () => {
          const unidadesFisicas: IUnidadesFisicas = { id: 123 };
          expectedResult = service.addUnidadesFisicasToCollectionIfMissing(
            [],
            null,
            unidadesFisicas,
            undefined
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(unidadesFisicas);
        });

        it("should return initial array if no UnidadesFisicas is added", () => {
          const unidadesFisicasCollection: IUnidadesFisicas[] = [{ id: 123 }];
          expectedResult = service.addUnidadesFisicasToCollectionIfMissing(
            unidadesFisicasCollection,
            undefined,
            null
          );
          expect(expectedResult).toEqual(unidadesFisicasCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
