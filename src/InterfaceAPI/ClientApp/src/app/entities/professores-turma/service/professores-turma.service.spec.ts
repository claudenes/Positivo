import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import * as dayjs from "dayjs";

import { DATE_FORMAT } from "app/config/input.constants";
import {
  IProfessoresTurma,
  ProfessoresTurma,
} from "../professores-turma.model";

import { ProfessoresTurmaService } from "./professores-turma.service";

describe("Service Tests", () => {
  describe("ProfessoresTurma Service", () => {
    let service: ProfessoresTurmaService;
    let httpMock: HttpTestingController;
    let elemDefault: IProfessoresTurma;
    let expectedResult:
      | IProfessoresTurma
      | IProfessoresTurma[]
      | boolean
      | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ProfessoresTurmaService);
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

      it("should create a ProfessoresTurma", () => {
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
          .create(new ProfessoresTurma())
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "POST" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should update a ProfessoresTurma", () => {
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

      it("should partial update a ProfessoresTurma", () => {
        const patchObject = Object.assign(
          {
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          new ProfessoresTurma()
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

      it("should return a list of ProfessoresTurma", () => {
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

      it("should delete a ProfessoresTurma", () => {
        service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: "DELETE" });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe("addProfessoresTurmaToCollectionIfMissing", () => {
        it("should add a ProfessoresTurma to an empty array", () => {
          const professoresTurma: IProfessoresTurma = { id: 123 };
          expectedResult = service.addProfessoresTurmaToCollectionIfMissing(
            [],
            professoresTurma
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(professoresTurma);
        });

        it("should not add a ProfessoresTurma to an array that contains it", () => {
          const professoresTurma: IProfessoresTurma = { id: 123 };
          const professoresTurmaCollection: IProfessoresTurma[] = [
            {
              ...professoresTurma,
            },
            { id: 456 },
          ];
          expectedResult = service.addProfessoresTurmaToCollectionIfMissing(
            professoresTurmaCollection,
            professoresTurma
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ProfessoresTurma to an array that doesn't contain it", () => {
          const professoresTurma: IProfessoresTurma = { id: 123 };
          const professoresTurmaCollection: IProfessoresTurma[] = [{ id: 456 }];
          expectedResult = service.addProfessoresTurmaToCollectionIfMissing(
            professoresTurmaCollection,
            professoresTurma
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(professoresTurma);
        });

        it("should add only unique ProfessoresTurma to an array", () => {
          const professoresTurmaArray: IProfessoresTurma[] = [
            { id: 123 },
            { id: 456 },
            { id: 76887 },
          ];
          const professoresTurmaCollection: IProfessoresTurma[] = [{ id: 123 }];
          expectedResult = service.addProfessoresTurmaToCollectionIfMissing(
            professoresTurmaCollection,
            ...professoresTurmaArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it("should accept varargs", () => {
          const professoresTurma: IProfessoresTurma = { id: 123 };
          const professoresTurma2: IProfessoresTurma = { id: 456 };
          expectedResult = service.addProfessoresTurmaToCollectionIfMissing(
            [],
            professoresTurma,
            professoresTurma2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(professoresTurma);
          expect(expectedResult).toContain(professoresTurma2);
        });

        it("should accept null and undefined values", () => {
          const professoresTurma: IProfessoresTurma = { id: 123 };
          expectedResult = service.addProfessoresTurmaToCollectionIfMissing(
            [],
            null,
            professoresTurma,
            undefined
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(professoresTurma);
        });

        it("should return initial array if no ProfessoresTurma is added", () => {
          const professoresTurmaCollection: IProfessoresTurma[] = [{ id: 123 }];
          expectedResult = service.addProfessoresTurmaToCollectionIfMissing(
            professoresTurmaCollection,
            undefined,
            null
          );
          expect(expectedResult).toEqual(professoresTurmaCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
