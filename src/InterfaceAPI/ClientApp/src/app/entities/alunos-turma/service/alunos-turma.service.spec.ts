import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import * as dayjs from "dayjs";

import { DATE_FORMAT } from "app/config/input.constants";
import { IAlunosTurma, AlunosTurma } from "../alunos-turma.model";

import { AlunosTurmaService } from "./alunos-turma.service";

describe("Service Tests", () => {
  describe("AlunosTurma Service", () => {
    let service: AlunosTurmaService;
    let httpMock: HttpTestingController;
    let elemDefault: IAlunosTurma;
    let expectedResult: IAlunosTurma | IAlunosTurma[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(AlunosTurmaService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
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

      it("should create a AlunosTurma", () => {
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
          .create(new AlunosTurma())
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "POST" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should update a AlunosTurma", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
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

      it("should partial update a AlunosTurma", () => {
        const patchObject = Object.assign({}, new AlunosTurma());

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

      it("should return a list of AlunosTurma", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
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

      it("should delete a AlunosTurma", () => {
        service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: "DELETE" });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe("addAlunosTurmaToCollectionIfMissing", () => {
        it("should add a AlunosTurma to an empty array", () => {
          const alunosTurma: IAlunosTurma = { id: 123 };
          expectedResult = service.addAlunosTurmaToCollectionIfMissing(
            [],
            alunosTurma
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(alunosTurma);
        });

        it("should not add a AlunosTurma to an array that contains it", () => {
          const alunosTurma: IAlunosTurma = { id: 123 };
          const alunosTurmaCollection: IAlunosTurma[] = [
            {
              ...alunosTurma,
            },
            { id: 456 },
          ];
          expectedResult = service.addAlunosTurmaToCollectionIfMissing(
            alunosTurmaCollection,
            alunosTurma
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a AlunosTurma to an array that doesn't contain it", () => {
          const alunosTurma: IAlunosTurma = { id: 123 };
          const alunosTurmaCollection: IAlunosTurma[] = [{ id: 456 }];
          expectedResult = service.addAlunosTurmaToCollectionIfMissing(
            alunosTurmaCollection,
            alunosTurma
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(alunosTurma);
        });

        it("should add only unique AlunosTurma to an array", () => {
          const alunosTurmaArray: IAlunosTurma[] = [
            { id: 123 },
            { id: 456 },
            { id: 13813 },
          ];
          const alunosTurmaCollection: IAlunosTurma[] = [{ id: 123 }];
          expectedResult = service.addAlunosTurmaToCollectionIfMissing(
            alunosTurmaCollection,
            ...alunosTurmaArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it("should accept varargs", () => {
          const alunosTurma: IAlunosTurma = { id: 123 };
          const alunosTurma2: IAlunosTurma = { id: 456 };
          expectedResult = service.addAlunosTurmaToCollectionIfMissing(
            [],
            alunosTurma,
            alunosTurma2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(alunosTurma);
          expect(expectedResult).toContain(alunosTurma2);
        });

        it("should accept null and undefined values", () => {
          const alunosTurma: IAlunosTurma = { id: 123 };
          expectedResult = service.addAlunosTurmaToCollectionIfMissing(
            [],
            null,
            alunosTurma,
            undefined
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(alunosTurma);
        });

        it("should return initial array if no AlunosTurma is added", () => {
          const alunosTurmaCollection: IAlunosTurma[] = [{ id: 123 }];
          expectedResult = service.addAlunosTurmaToCollectionIfMissing(
            alunosTurmaCollection,
            undefined,
            null
          );
          expect(expectedResult).toEqual(alunosTurmaCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
