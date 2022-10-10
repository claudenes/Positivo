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
  IUnidadesFisicas,
  getUnidadesFisicasIdentifier,
} from "../unidades-fisicas.model";

export type EntityResponseType = HttpResponse<IUnidadesFisicas>;
export type EntityArrayResponseType = HttpResponse<IUnidadesFisicas[]>;

@Injectable({ providedIn: "root" })
export class UnidadesFisicasService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor(
    "api/unidades-fisicas"
  );

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(unidadesFisicas: IUnidadesFisicas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(unidadesFisicas);
    return this.http
      .post<IUnidadesFisicas>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(unidadesFisicas: IUnidadesFisicas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(unidadesFisicas);
    return this.http
      .put<IUnidadesFisicas>(
        `${this.resourceUrl}/${
          getUnidadesFisicasIdentifier(unidadesFisicas) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(
    unidadesFisicas: IUnidadesFisicas
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(unidadesFisicas);
    return this.http
      .patch<IUnidadesFisicas>(
        `${this.resourceUrl}/${
          getUnidadesFisicasIdentifier(unidadesFisicas) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUnidadesFisicas>(`${this.resourceUrl}/${id}`, {
        observe: "response",
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUnidadesFisicas[]>(this.resourceUrl, {
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

  addUnidadesFisicasToCollectionIfMissing(
    unidadesFisicasCollection: IUnidadesFisicas[],
    ...unidadesFisicasToCheck: (IUnidadesFisicas | null | undefined)[]
  ): IUnidadesFisicas[] {
    const unidadesFisicas: IUnidadesFisicas[] =
      unidadesFisicasToCheck.filter(isPresent);
    if (unidadesFisicas.length > 0) {
      const unidadesFisicasCollectionIdentifiers =
        unidadesFisicasCollection.map(
          (unidadesFisicasItem) =>
            getUnidadesFisicasIdentifier(unidadesFisicasItem)!
        );
      const unidadesFisicasToAdd = unidadesFisicas.filter(
        (unidadesFisicasItem) => {
          const unidadesFisicasIdentifier =
            getUnidadesFisicasIdentifier(unidadesFisicasItem);
          if (
            unidadesFisicasIdentifier == null ||
            unidadesFisicasCollectionIdentifiers.includes(
              unidadesFisicasIdentifier
            )
          ) {
            return false;
          }
          unidadesFisicasCollectionIdentifiers.push(unidadesFisicasIdentifier);
          return true;
        }
      );
      return [...unidadesFisicasToAdd, ...unidadesFisicasCollection];
    }
    return unidadesFisicasCollection;
  }

  protected convertDateFromClient(
    unidadesFisicas: IUnidadesFisicas
  ): IUnidadesFisicas {
    return Object.assign({}, unidadesFisicas, {
      dtatualizacao: unidadesFisicas.dtatualizacao?.isValid()
        ? unidadesFisicas.dtatualizacao.format(DATE_FORMAT)
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
      res.body.forEach((unidadesFisicas: IUnidadesFisicas) => {
        unidadesFisicas.dtatualizacao = unidadesFisicas.dtatualizacao
          ? dayjs(unidadesFisicas.dtatualizacao)
          : undefined;
      });
    }
    return res;
  }
}
