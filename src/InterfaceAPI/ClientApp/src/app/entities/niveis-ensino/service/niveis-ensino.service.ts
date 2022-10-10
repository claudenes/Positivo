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
  INiveisEnsino,
  getNiveisEnsinoIdentifier,
} from "../niveis-ensino.model";

export type EntityResponseType = HttpResponse<INiveisEnsino>;
export type EntityArrayResponseType = HttpResponse<INiveisEnsino[]>;

@Injectable({ providedIn: "root" })
export class NiveisEnsinoService {
  protected resourceUrl =
    this.applicationConfigService.getEndpointFor("api/niveis-ensinos");

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(niveisEnsino: INiveisEnsino): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(niveisEnsino);
    return this.http
      .post<INiveisEnsino>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(niveisEnsino: INiveisEnsino): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(niveisEnsino);
    return this.http
      .put<INiveisEnsino>(
        `${this.resourceUrl}/${
          getNiveisEnsinoIdentifier(niveisEnsino) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(niveisEnsino: INiveisEnsino): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(niveisEnsino);
    return this.http
      .patch<INiveisEnsino>(
        `${this.resourceUrl}/${
          getNiveisEnsinoIdentifier(niveisEnsino) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INiveisEnsino>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INiveisEnsino[]>(this.resourceUrl, {
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

  addNiveisEnsinoToCollectionIfMissing(
    niveisEnsinoCollection: INiveisEnsino[],
    ...niveisEnsinosToCheck: (INiveisEnsino | null | undefined)[]
  ): INiveisEnsino[] {
    const niveisEnsinos: INiveisEnsino[] =
      niveisEnsinosToCheck.filter(isPresent);
    if (niveisEnsinos.length > 0) {
      const niveisEnsinoCollectionIdentifiers = niveisEnsinoCollection.map(
        (niveisEnsinoItem) => getNiveisEnsinoIdentifier(niveisEnsinoItem)!
      );
      const niveisEnsinosToAdd = niveisEnsinos.filter((niveisEnsinoItem) => {
        const niveisEnsinoIdentifier =
          getNiveisEnsinoIdentifier(niveisEnsinoItem);
        if (
          niveisEnsinoIdentifier == null ||
          niveisEnsinoCollectionIdentifiers.includes(niveisEnsinoIdentifier)
        ) {
          return false;
        }
        niveisEnsinoCollectionIdentifiers.push(niveisEnsinoIdentifier);
        return true;
      });
      return [...niveisEnsinosToAdd, ...niveisEnsinoCollection];
    }
    return niveisEnsinoCollection;
  }

  protected convertDateFromClient(niveisEnsino: INiveisEnsino): INiveisEnsino {
    return Object.assign({}, niveisEnsino, {
      dtatualizacao: niveisEnsino.dtatualizacao?.isValid()
        ? niveisEnsino.dtatualizacao.format(DATE_FORMAT)
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
      res.body.forEach((niveisEnsino: INiveisEnsino) => {
        niveisEnsino.dtatualizacao = niveisEnsino.dtatualizacao
          ? dayjs(niveisEnsino.dtatualizacao)
          : undefined;
      });
    }
    return res;
  }
}
