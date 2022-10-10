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
  IProfessoresTurma,
  getProfessoresTurmaIdentifier,
} from "../professores-turma.model";

export type EntityResponseType = HttpResponse<IProfessoresTurma>;
export type EntityArrayResponseType = HttpResponse<IProfessoresTurma[]>;

@Injectable({ providedIn: "root" })
export class ProfessoresTurmaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor(
    "api/professores-turmas"
  );

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(professoresTurma: IProfessoresTurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professoresTurma);
    return this.http
      .post<IProfessoresTurma>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(professoresTurma: IProfessoresTurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professoresTurma);
    return this.http
      .put<IProfessoresTurma>(
        `${this.resourceUrl}/${
          getProfessoresTurmaIdentifier(professoresTurma) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(
    professoresTurma: IProfessoresTurma
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professoresTurma);
    return this.http
      .patch<IProfessoresTurma>(
        `${this.resourceUrl}/${
          getProfessoresTurmaIdentifier(professoresTurma) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfessoresTurma>(`${this.resourceUrl}/${id}`, {
        observe: "response",
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfessoresTurma[]>(this.resourceUrl, {
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

  addProfessoresTurmaToCollectionIfMissing(
    professoresTurmaCollection: IProfessoresTurma[],
    ...professoresTurmasToCheck: (IProfessoresTurma | null | undefined)[]
  ): IProfessoresTurma[] {
    const professoresTurmas: IProfessoresTurma[] =
      professoresTurmasToCheck.filter(isPresent);
    if (professoresTurmas.length > 0) {
      const professoresTurmaCollectionIdentifiers =
        professoresTurmaCollection.map(
          (professoresTurmaItem) =>
            getProfessoresTurmaIdentifier(professoresTurmaItem)!
        );
      const professoresTurmasToAdd = professoresTurmas.filter(
        (professoresTurmaItem) => {
          const professoresTurmaIdentifier =
            getProfessoresTurmaIdentifier(professoresTurmaItem);
          if (
            professoresTurmaIdentifier == null ||
            professoresTurmaCollectionIdentifiers.includes(
              professoresTurmaIdentifier
            )
          ) {
            return false;
          }
          professoresTurmaCollectionIdentifiers.push(
            professoresTurmaIdentifier
          );
          return true;
        }
      );
      return [...professoresTurmasToAdd, ...professoresTurmaCollection];
    }
    return professoresTurmaCollection;
  }

  protected convertDateFromClient(
    professoresTurma: IProfessoresTurma
  ): IProfessoresTurma {
    return Object.assign({}, professoresTurma, {
      dtatualizacao: professoresTurma.dtatualizacao?.isValid()
        ? professoresTurma.dtatualizacao.format(DATE_FORMAT)
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
      res.body.forEach((professoresTurma: IProfessoresTurma) => {
        professoresTurma.dtatualizacao = professoresTurma.dtatualizacao
          ? dayjs(professoresTurma.dtatualizacao)
          : undefined;
      });
    }
    return res;
  }
}
