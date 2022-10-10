import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import * as dayjs from "dayjs";

import { DATE_FORMAT } from "app/config/input.constants";
import { ITurmas, Turmas } from "../turmas.model";

import { TurmasService } from "./turmas.service";

describe("Service Tests", () => {
  describe("Turmas Service", () => {
    let service: TurmasService;
    let httpMock: HttpTestingController;
    let elemDefault: ITurmas;
    let expectedResult: ITurmas | ITurmas[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TurmasService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        turma: "AAAAAAA",
        turno: "AAAAAAA",
        curriculo: "AAAAAAA",
        serie: 0,
        ano: 0,
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

      it("should create a Turmas", () => {
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
          .create(new Turmas())
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "POST" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should update a Turmas", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            turma: "BBBBBB",
            turno: "BBBBBB",
            curriculo: "BBBBBB",
            serie: 1,
            ano: 1,
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

      it("should partial update a Turmas", () => {
        const patchObject = Object.assign(
          {
            turma: "BBBBBB",
            turno: "BBBBBB",
            serie: 1,
          },
          new Turmas()
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

      it("should return a list of Turmas", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            turma: "BBBBBB",
            turno: "BBBBBB",
            curriculo: "BBBBBB",
            serie: 1,
            ano: 1,
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

      it("should delete a Turmas", () => {
        service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: "DELETE" });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe("addTurmasToCollectionIfMissing", () => {
        it("should add a Turmas to an empty array", () => {
          const turmas: ITurmas = { id: 123 };
          expectedResult = service.addTurmasToCollectionIfMissing([], turmas);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(turmas);
        });

        it("should not add a Turmas to an array that contains it", () => {
          const turmas: ITurmas = { id: 123 };
          const turmasCollection: ITurmas[] = [
            {
              ...turmas,
            },
            { id: 456 },
          ];
          expectedResult = service.addTurmasToCollectionIfMissing(
            turmasCollection,
            turmas
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Turmas to an array that doesn't contain it", () => {
          const turmas: ITurmas = { id: 123 };
          const turmasCollection: ITurmas[] = [{ id: 456 }];
          expectedResult = service.addTurmasToCollectionIfMissing(
            turmasCollection,
            turmas
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(turmas);
        });

        it("should add only unique Turmas to an array", () => {
          const turmasArray: ITurmas[] = [
            { id: 123 },
            { id: 456 },
            { id: 59868 },
          ];
          const turmasCollection: ITurmas[] = [{ id: 123 }];
          expectedResult = service.addTurmasToCollectionIfMissing(
            turmasCollection,
            ...turmasArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it("should accept varargs", () => {
          const turmas: ITurmas = { id: 123 };
          const turmas2: ITurmas = { id: 456 };
          expectedResult = service.addTurmasToCollectionIfMissing(
            [],
            turmas,
            turmas2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(turmas);
          expect(expectedResult).toContain(turmas2);
        });

        it("should accept null and undefined values", () => {
          const turmas: ITurmas = { id: 123 };
          expectedResult = service.addTurmasToCollectionIfMissing(
            [],
            null,
            turmas,
            undefined
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(turmas);
        });

        it("should return initial array if no Turmas is added", () => {
          const turmasCollection: ITurmas[] = [{ id: 123 }];
          expectedResult = service.addTurmasToCollectionIfMissing(
            turmasCollection,
            undefined,
            null
          );
          expect(expectedResult).toEqual(turmasCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
