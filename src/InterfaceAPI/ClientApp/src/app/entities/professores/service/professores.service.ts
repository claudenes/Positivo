import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as dayjs from "dayjs";

import { isPresent } from "app/core/util/operators";
import { DATE_FORMAT } from "app/config/input.constants";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { IProfessores, getProfessoresIdentifier } from "../professores.model";

export type EntityResponseType = HttpResponse<IProfessores>;
export type EntityArrayResponseType = HttpResponse<IProfessores[]>;

@Injectable({ providedIn: "root" })
export class ProfessoresService {
  protected resourceUrl =
    this.applicationConfigService.getEndpointFor("api/professores");

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(professores: IProfessores): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professores);
    return this.http
      .post<IProfessores>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(professores: IProfessores): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professores);
    return this.http
      .put<IProfessores>(
        `${this.resourceUrl}/${
          getProfessoresIdentifier(professores) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(professores: IProfessores): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professores);
    return this.http
      .patch<IProfessores>(
        `${this.resourceUrl}/${
          getProfessoresIdentifier(professores) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfessores>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfessores[]>(this.resourceUrl, {
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

  addProfessoresToCollectionIfMissing(
    professoresCollection: IProfessores[],
    ...professoresToCheck: (IProfessores | null | undefined)[]
  ): IProfessores[] {
    const professores: IProfessores[] = professoresToCheck.filter(isPresent);
    if (professores.length > 0) {
      const professoresCollectionIdentifiers = professoresCollection.map(
        (professoresItem) => getProfessoresIdentifier(professoresItem)!
      );
      const professoresToAdd = professores.filter((professoresItem) => {
        const professoresIdentifier = getProfessoresIdentifier(professoresItem);
        if (
          professoresIdentifier == null ||
          professoresCollectionIdentifiers.includes(professoresIdentifier)
        ) {
          return false;
        }
        professoresCollectionIdentifiers.push(professoresIdentifier);
        return true;
      });
      return [...professoresToAdd, ...professoresCollection];
    }
    return professoresCollection;
  }

  protected convertDateFromClient(professores: IProfessores): IProfessores {
    return Object.assign({}, professores, {
      dtatualizacao: professores.dtatualizacao?.isValid()
        ? professores.dtatualizacao.format(DATE_FORMAT)
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
      res.body.forEach((professores: IProfessores) => {
        professores.dtatualizacao = professores.dtatualizacao
          ? dayjs(professores.dtatualizacao)
          : undefined;
      });
    }
    return res;
  }
}
