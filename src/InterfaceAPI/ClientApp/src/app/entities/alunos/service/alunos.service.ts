import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as dayjs from "dayjs";

import { isPresent } from "app/core/util/operators";
import { DATE_FORMAT } from "app/config/input.constants";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { IAlunos, getAlunosIdentifier } from "../alunos.model";

export type EntityResponseType = HttpResponse<IAlunos>;
export type EntityArrayResponseType = HttpResponse<IAlunos[]>;

@Injectable({ providedIn: "root" })
export class AlunosService {
  protected resourceUrl =
    this.applicationConfigService.getEndpointFor("api/alunos");

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(alunos: IAlunos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alunos);
    return this.http
      .post<IAlunos>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(alunos: IAlunos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alunos);
    return this.http
      .put<IAlunos>(
        `${this.resourceUrl}/${getAlunosIdentifier(alunos) as number}`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(alunos: IAlunos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alunos);
    return this.http
      .patch<IAlunos>(
        `${this.resourceUrl}/${getAlunosIdentifier(alunos) as number}`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAlunos>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAlunos[]>(this.resourceUrl, {
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

  addAlunosToCollectionIfMissing(
    alunosCollection: IAlunos[],
    ...alunosToCheck: (IAlunos | null | undefined)[]
  ): IAlunos[] {
    const alunos: IAlunos[] = alunosToCheck.filter(isPresent);
    if (alunos.length > 0) {
      const alunosCollectionIdentifiers = alunosCollection.map(
        (alunosItem) => getAlunosIdentifier(alunosItem)!
      );
      const alunosToAdd = alunos.filter((alunosItem) => {
        const alunosIdentifier = getAlunosIdentifier(alunosItem);
        if (
          alunosIdentifier == null ||
          alunosCollectionIdentifiers.includes(alunosIdentifier)
        ) {
          return false;
        }
        alunosCollectionIdentifiers.push(alunosIdentifier);
        return true;
      });
      return [...alunosToAdd, ...alunosCollection];
    }
    return alunosCollection;
  }

  protected convertDateFromClient(alunos: IAlunos): IAlunos {
    return Object.assign({}, alunos, {
      dtatualizacao: alunos.dtatualizacao?.isValid()
        ? alunos.dtatualizacao.format(DATE_FORMAT)
        : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
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
      res.body.forEach((alunos: IAlunos) => {
        alunos.dtatualizacao = alunos.dtatualizacao
          ? dayjs(alunos.dtatualizacao)
          : undefined;
      });
    }
    return res;
  }
}
