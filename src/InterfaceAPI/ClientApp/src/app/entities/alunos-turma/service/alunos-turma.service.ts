import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as dayjs from "dayjs";

import { isPresent } from "app/core/util/operators";
import { DATE_FORMAT } from "app/config/input.constants";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { IAlunosTurma, getAlunosTurmaIdentifier } from "../alunos-turma.model";

export type EntityResponseType = HttpResponse<IAlunosTurma>;
export type EntityArrayResponseType = HttpResponse<IAlunosTurma[]>;

@Injectable({ providedIn: "root" })
export class AlunosTurmaService {
  protected resourceUrl =
    this.applicationConfigService.getEndpointFor("api/alunos-turmas");

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(alunosTurma: IAlunosTurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alunosTurma);
    return this.http
      .post<IAlunosTurma>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(alunosTurma: IAlunosTurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alunosTurma);
    return this.http
      .put<IAlunosTurma>(
        `${this.resourceUrl}/${
          getAlunosTurmaIdentifier(alunosTurma) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(alunosTurma: IAlunosTurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alunosTurma);
    return this.http
      .patch<IAlunosTurma>(
        `${this.resourceUrl}/${
          getAlunosTurmaIdentifier(alunosTurma) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAlunosTurma>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAlunosTurma[]>(this.resourceUrl, {
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

  addAlunosTurmaToCollectionIfMissing(
    alunosTurmaCollection: IAlunosTurma[],
    ...alunosTurmasToCheck: (IAlunosTurma | null | undefined)[]
  ): IAlunosTurma[] {
    const alunosTurmas: IAlunosTurma[] = alunosTurmasToCheck.filter(isPresent);
    if (alunosTurmas.length > 0) {
      const alunosTurmaCollectionIdentifiers = alunosTurmaCollection.map(
        (alunosTurmaItem) => getAlunosTurmaIdentifier(alunosTurmaItem)!
      );
      const alunosTurmasToAdd = alunosTurmas.filter((alunosTurmaItem) => {
        const alunosTurmaIdentifier = getAlunosTurmaIdentifier(alunosTurmaItem);
        if (
          alunosTurmaIdentifier == null ||
          alunosTurmaCollectionIdentifiers.includes(alunosTurmaIdentifier)
        ) {
          return false;
        }
        alunosTurmaCollectionIdentifiers.push(alunosTurmaIdentifier);
        return true;
      });
      return [...alunosTurmasToAdd, ...alunosTurmaCollection];
    }
    return alunosTurmaCollection;
  }

  protected convertDateFromClient(alunosTurma: IAlunosTurma): IAlunosTurma {
    return Object.assign({}, alunosTurma, {
      dtatualizacao: alunosTurma.dtatualizacao?.isValid()
        ? alunosTurma.dtatualizacao.format(DATE_FORMAT)
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
      res.body.forEach((alunosTurma: IAlunosTurma) => {
        alunosTurma.dtatualizacao = alunosTurma.dtatualizacao
          ? dayjs(alunosTurma.dtatualizacao)
          : undefined;
      });
    }
    return res;
  }
}
