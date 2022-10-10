import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import * as dayjs from "dayjs";

import { DATE_FORMAT } from "app/config/input.constants";
import { IPessoasContato, PessoasContato } from "../pessoas-contato.model";

import { PessoasContatoService } from "./pessoas-contato.service";

describe("Service Tests", () => {
  describe("PessoasContato Service", () => {
    let service: PessoasContatoService;
    let httpMock: HttpTestingController;
    let elemDefault: IPessoasContato;
    let expectedResult: IPessoasContato | IPessoasContato[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PessoasContatoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        pessoa: 0,
        email: "AAAAAAA",
        emailgoogle: "AAAAAAA",
        endereco: "AAAAAAA",
        endnum: "AAAAAAA",
        endcompl: "AAAAAAA",
        bairro: "AAAAAAA",
        municipio: "AAAAAAA",
        uf: "AAAAAAA",
        cep: "AAAAAAA",
        dddfone: "AAAAAAA",
        fone: "AAAAAAA",
        dddcelular: "AAAAAAA",
        celular: "AAAAAAA",
        dddcomercial: "AAAAAAA",
        comercial: "AAAAAAA",
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

      it("should create a PessoasContato", () => {
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
          .create(new PessoasContato())
          .subscribe((resp) => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: "POST" });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it("should update a PessoasContato", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            pessoa: 1,
            email: "BBBBBB",
            emailgoogle: "BBBBBB",
            endereco: "BBBBBB",
            endnum: "BBBBBB",
            endcompl: "BBBBBB",
            bairro: "BBBBBB",
            municipio: "BBBBBB",
            uf: "BBBBBB",
            cep: "BBBBBB",
            dddfone: "BBBBBB",
            fone: "BBBBBB",
            dddcelular: "BBBBBB",
            celular: "BBBBBB",
            dddcomercial: "BBBBBB",
            comercial: "BBBBBB",
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

      it("should partial update a PessoasContato", () => {
        const patchObject = Object.assign(
          {
            pessoa: 1,
            email: "BBBBBB",
            emailgoogle: "BBBBBB",
            endnum: "BBBBBB",
            endcompl: "BBBBBB",
            bairro: "BBBBBB",
            municipio: "BBBBBB",
            dddfone: "BBBBBB",
            celular: "BBBBBB",
            comercial: "BBBBBB",
          },
          new PessoasContato()
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

      it("should return a list of PessoasContato", () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            pessoa: 1,
            email: "BBBBBB",
            emailgoogle: "BBBBBB",
            endereco: "BBBBBB",
            endnum: "BBBBBB",
            endcompl: "BBBBBB",
            bairro: "BBBBBB",
            municipio: "BBBBBB",
            uf: "BBBBBB",
            cep: "BBBBBB",
            dddfone: "BBBBBB",
            fone: "BBBBBB",
            dddcelular: "BBBBBB",
            celular: "BBBBBB",
            dddcomercial: "BBBBBB",
            comercial: "BBBBBB",
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

      it("should delete a PessoasContato", () => {
        service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: "DELETE" });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe("addPessoasContatoToCollectionIfMissing", () => {
        it("should add a PessoasContato to an empty array", () => {
          const pessoasContato: IPessoasContato = { id: 123 };
          expectedResult = service.addPessoasContatoToCollectionIfMissing(
            [],
            pessoasContato
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(pessoasContato);
        });

        it("should not add a PessoasContato to an array that contains it", () => {
          const pessoasContato: IPessoasContato = { id: 123 };
          const pessoasContatoCollection: IPessoasContato[] = [
            {
              ...pessoasContato,
            },
            { id: 456 },
          ];
          expectedResult = service.addPessoasContatoToCollectionIfMissing(
            pessoasContatoCollection,
            pessoasContato
          );
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a PessoasContato to an array that doesn't contain it", () => {
          const pessoasContato: IPessoasContato = { id: 123 };
          const pessoasContatoCollection: IPessoasContato[] = [{ id: 456 }];
          expectedResult = service.addPessoasContatoToCollectionIfMissing(
            pessoasContatoCollection,
            pessoasContato
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(pessoasContato);
        });

        it("should add only unique PessoasContato to an array", () => {
          const pessoasContatoArray: IPessoasContato[] = [
            { id: 123 },
            { id: 456 },
            { id: 44486 },
          ];
          const pessoasContatoCollection: IPessoasContato[] = [{ id: 123 }];
          expectedResult = service.addPessoasContatoToCollectionIfMissing(
            pessoasContatoCollection,
            ...pessoasContatoArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it("should accept varargs", () => {
          const pessoasContato: IPessoasContato = { id: 123 };
          const pessoasContato2: IPessoasContato = { id: 456 };
          expectedResult = service.addPessoasContatoToCollectionIfMissing(
            [],
            pessoasContato,
            pessoasContato2
          );
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(pessoasContato);
          expect(expectedResult).toContain(pessoasContato2);
        });

        it("should accept null and undefined values", () => {
          const pessoasContato: IPessoasContato = { id: 123 };
          expectedResult = service.addPessoasContatoToCollectionIfMissing(
            [],
            null,
            pessoasContato,
            undefined
          );
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(pessoasContato);
        });

        it("should return initial array if no PessoasContato is added", () => {
          const pessoasContatoCollection: IPessoasContato[] = [{ id: 123 }];
          expectedResult = service.addPessoasContatoToCollectionIfMissing(
            pessoasContatoCollection,
            undefined,
            null
          );
          expect(expectedResult).toEqual(pessoasContatoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
