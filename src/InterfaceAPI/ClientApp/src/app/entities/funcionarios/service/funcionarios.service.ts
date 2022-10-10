import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as dayjs from "dayjs";

import { isPresent } from "app/core/util/operators";
import { DATE_FORMAT } from "app/config/input.constants";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import {
  IFuncionarios,
  getFuncionariosIdentifier,
} from "../funcionarios.model";

export type EntityResponseType = HttpResponse<IFuncionarios>;
export type EntityArrayResponseType = HttpResponse<IFuncionarios[]>;

@Injectable({ providedIn: "root" })
export class FuncionariosService {
  protected resourceUrl =
    this.applicationConfigService.getEndpointFor("api/funcionarios");

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(funcionarios: IFuncionarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(funcionarios);
    return this.http
      .post<IFuncionarios>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(funcionarios: IFuncionarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(funcionarios);
    return this.http
      .put<IFuncionarios>(
        `${this.resourceUrl}/${
          getFuncionariosIdentifier(funcionarios) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(funcionarios: IFuncionarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(funcionarios);
    return this.http
      .patch<IFuncionarios>(
        `${this.resourceUrl}/${
          getFuncionariosIdentifier(funcionarios) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFuncionarios>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFuncionarios[]>(this.resourceUrl, {
        params: options,
        observe: "response",
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  addFuncionariosToCollectionIfMissing(
    funcionariosCollection: IFuncionarios[],
    ...funcionariosToCheck: (IFuncionarios | null | undefined)[]
  ): IFuncionarios[] {
    const funcionarios: IFuncionarios[] = funcionariosToCheck.filter(isPresent);
    if (funcionarios.length > 0) {
      const funcionariosCollectionIdentifiers = funcionariosCollection.map(
        (funcionariosItem) => getFuncionariosIdentifier(funcionariosItem)!
      );
      const funcionariosToAdd = funcionarios.filter((funcionariosItem) => {
        const funcionariosIdentifier =
          getFuncionariosIdentifier(funcionariosItem);
        if (
          funcionariosIdentifier == null ||
          funcionariosCollectionIdentifiers.includes(funcionariosIdentifier)
        ) {
          return false;
        }
        funcionariosCollectionIdentifiers.push(funcionariosIdentifier);
        return true;
      });
      return [...funcionariosToAdd, ...funcionariosCollection];
    }
    return funcionariosCollection;
  }

  protected convertDateFromClient(funcionarios: IFuncionarios): IFuncionarios {
    return Object.assign({}, funcionarios, {
      datanascimento: funcionarios.datanascimento?.isValid()
        ? funcionarios.datanascimento.format(DATE_FORMAT)
        : undefined,
      dtatualizacao: funcionarios.dtatualizacao?.isValid()
        ? funcionarios.dtatualizacao.format(DATE_FORMAT)
        : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datanascimento = res.body.datanascimento
        ? dayjs(res.body.datanascimento)
        : undefined;
      res.body.dtatualizacao = res.body.dtatualizacao
        ? dayjs(res.body.dtatualizacao)
        : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((funcionarios: IFuncionarios) => {
        funcionarios.datanascimento = funcionarios.datanascimento
          ? dayjs(funcionarios.datanascimento)
          : undefined;
        funcionarios.dtatualizacao = funcionarios.dtatualizacao
          ? dayjs(funcionarios.dtatualizacao)
          : undefined;
      });
    }
    return res;
  }
}
