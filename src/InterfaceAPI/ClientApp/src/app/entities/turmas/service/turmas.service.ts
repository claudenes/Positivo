import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as dayjs from "dayjs";

import { isPresent } from "app/core/util/operators";
import { DATE_FORMAT } from "app/config/input.constants";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { ITurmas, getTurmasIdentifier } from "../turmas.model";

export type EntityResponseType = HttpResponse<ITurmas>;
export type EntityArrayResponseType = HttpResponse<ITurmas[]>;

@Injectable({ providedIn: "root" })
export class TurmasService {
  protected resourceUrl =
    this.applicationConfigService.getEndpointFor("api/turmas");

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(turmas: ITurmas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turmas);
    return this.http
      .post<ITurmas>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(turmas: ITurmas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turmas);
    return this.http
      .put<ITurmas>(
        `${this.resourceUrl}/${getTurmasIdentifier(turmas) as number}`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(turmas: ITurmas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turmas);
    return this.http
      .patch<ITurmas>(
        `${this.resourceUrl}/${getTurmasIdentifier(turmas) as number}`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITurmas>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITurmas[]>(this.resourceUrl, {
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

  addTurmasToCollectionIfMissing(
    turmasCollection: ITurmas[],
    ...turmasToCheck: (ITurmas | null | undefined)[]
  ): ITurmas[] {
    const turmas: ITurmas[] = turmasToCheck.filter(isPresent);
    if (turmas.length > 0) {
      const turmasCollectionIdentifiers = turmasCollection.map(
        (turmasItem) => getTurmasIdentifier(turmasItem)!
      );
      const turmasToAdd = turmas.filter((turmasItem) => {
        const turmasIdentifier = getTurmasIdentifier(turmasItem);
        if (
          turmasIdentifier == null ||
          turmasCollectionIdentifiers.includes(turmasIdentifier)
        ) {
          return false;
        }
        turmasCollectionIdentifiers.push(turmasIdentifier);
        return true;
      });
      return [...turmasToAdd, ...turmasCollection];
    }
    return turmasCollection;
  }

  protected convertDateFromClient(turmas: ITurmas): ITurmas {
    return Object.assign({}, turmas, {
      dtatualizacao: turmas.dtatualizacao?.isValid()
        ? turmas.dtatualizacao.format(DATE_FORMAT)
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
      res.body.forEach((turmas: ITurmas) => {
        turmas.dtatualizacao = turmas.dtatualizacao
          ? dayjs(turmas.dtatualizacao)
          : undefined;
      });
    }
    return res;
  }
}
