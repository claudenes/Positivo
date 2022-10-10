import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import * as dayjs from "dayjs";

import { DATE_FORMAT } from "app/config/input.constants";
import { IProfessores, Professores } from "../professores.model";

import { ProfessoresService } from "./professores.service";

describe("Service Tests", () => {
  describe("Professores Service", () => {
    let service: ProfessoresService;
    let httpMock: HttpTestingController;
    let elemDefault: IProfessores;
    let expectedResult: IProfessores | IProfessores[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ProfessoresService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        professor: "AAAAAAA",
        pessoa: 0,
        nome: "AAAAAAA",
        primeironome: "AAAAAAA",
        sobrenome: "AAAAAAA",
        situacao: "AAAAAAA",
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

      it("should create a Professores", () => {
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
          .create(new Professores())
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "POST" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should update a Professores", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            professor: "BBBBBB",
            pessoa: 1,
            nome: "BBBBBB",
            primeironome: "BBBBBB",
            sobrenome: "BBBBBB",
            situacao: "BBBBBB",
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

      it("should partial update a Professores", () => {
        const patchObject = Object.assign(
          {
            professor: "BBBBBB",
            pessoa: 1,
            primeironome: "BBBBBB",
            sobrenome: "BBBBBB",
            situacao: "BBBBBB",
            senha: "BBBBBB",
            dtatualizacao: currentDate.format(DATE_FORMAT),
          },
          new Professores()
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

      it("should return a list of Professores", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            professor: "BBBBBB",
            pessoa: 1,
            nome: "BBBBBB",
            primeironome: "BBBBBB",
            sobrenome: "BBBBBB",
            situacao: "BBBBBB",
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

      it("should delete a Professores", () => {
        service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: "DELETE" });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe("addProfessoresToCollectionIfMissing", () => {
        it("should add a Professores to an empty array", () => {
          const professores: IProfessores = { id: 123 };
          expectedResult = service.addProfessoresToCollectionIfMissing(
            [],
            professores
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(professores);
        });

        it("should not add a Professores to an array that contains it", () => {
          const professores: IProfessores = { id: 123 };
          const professoresCollection: IProfessores[] = [
            {
              ...professores,
            },
            { id: 456 },
          ];
          expectedResult = service.addProfessoresToCollectionIfMissing(
            professoresCollection,
            professores
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Professores to an array that doesn't contain it", () => {
          const professores: IProfessores = { id: 123 };
          const professoresCollection: IProfessores[] = [{ id: 456 }];
          expectedResult = service.addProfessoresToCollectionIfMissing(
            professoresCollection,
            professores
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(professores);
        });

        it("should add only unique Professores to an array", () => {
          const professoresArray: IProfessores[] = [
            { id: 123 },
            { id: 456 },
            { id: 10903 },
          ];
          const professoresCollection: IProfessores[] = [{ id: 123 }];
          expectedResult = service.addProfessoresToCollectionIfMissing(
            professoresCollection,
            ...professoresArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it("should accept varargs", () => {
          const professores: IProfessores = { id: 123 };
          const professores2: IProfessores = { id: 456 };
          expectedResult = service.addProfessoresToCollectionIfMissing(
            [],
            professores,
            professores2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(professores);
          expect(expectedResult).toContain(professores2);
        });

        it("should accept null and undefined values", () => {
          const professores: IProfessores = { id: 123 };
          expectedResult = service.addProfessoresToCollectionIfMissing(
            [],
            null,
            professores,
            undefined
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(professores);
        });

        it("should return initial array if no Professores is added", () => {
          const professoresCollection: IProfessores[] = [{ id: 123 }];
          expectedResult = service.addProfessoresToCollectionIfMissing(
            professoresCollection,
            undefined,
            null
          );
          expect(expectedResult).toEqual(professoresCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
