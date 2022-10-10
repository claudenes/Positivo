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
  IPessoasContato,
  getPessoasContatoIdentifier,
} from "../pessoas-contato.model";

export type EntityResponseType = HttpResponse<IPessoasContato>;
export type EntityArrayResponseType = HttpResponse<IPessoasContato[]>;

@Injectable({ providedIn: "root" })
export class PessoasContatoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor(
    "api/pessoas-contatoes"
  );

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(pessoasContato: IPessoasContato): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pessoasContato);
    return this.http
      .post<IPessoasContato>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pessoasContato: IPessoasContato): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pessoasContato);
    return this.http
      .put<IPessoasContato>(
        `${this.resourceUrl}/${
          getPessoasContatoIdentifier(pessoasContato) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(
    pessoasContato: IPessoasContato
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pessoasContato);
    return this.http
      .patch<IPessoasContato>(
        `${this.resourceUrl}/${
          getPessoasContatoIdentifier(pessoasContato) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPessoasContato>(`${this.resourceUrl}/${id}`, {
        observe: "response",
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPessoasContato[]>(this.resourceUrl, {
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

  addPessoasContatoToCollectionIfMissing(
    pessoasContatoCollection: IPessoasContato[],
    ...pessoasContatoesToCheck: (IPessoasContato | null | undefined)[]
  ): IPessoasContato[] {
    const pessoasContatoes: IPessoasContato[] =
      pessoasContatoesToCheck.filter(isPresent);
    if (pessoasContatoes.length > 0) {
      const pessoasContatoCollectionIdentifiers = pessoasContatoCollection.map(
        (pessoasContatoItem) => getPessoasContatoIdentifier(pessoasContatoItem)!
      );
      const pessoasContatoesToAdd = pessoasContatoes.filter(
        (pessoasContatoItem) => {
          const pessoasContatoIdentifier =
            getPessoasContatoIdentifier(pessoasContatoItem);
          if (
            pessoasContatoIdentifier == null ||
            pessoasContatoCollectionIdentifiers.includes(
              pessoasContatoIdentifier
            )
          ) {
            return false;
          }
          pessoasContatoCollectionIdentifiers.push(pessoasContatoIdentifier);
          return true;
        }
      );
      return [...pessoasContatoesToAdd, ...pessoasContatoCollection];
    }
    return pessoasContatoCollection;
  }

  protected convertDateFromClient(
    pessoasContato: IPessoasContato
  ): IPessoasContato {
    return Object.assign({}, pessoasContato, {
      dtatualizacao: pessoasContato.dtatualizacao?.isValid()
        ? pessoasContato.dtatualizacao.format(DATE_FORMAT)
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
      res.body.forEach((pessoasContato: IPessoasContato) => {
        pessoasContato.dtatualizacao = pessoasContato.dtatualizacao
          ? dayjs(pessoasContato.dtatualizacao)
          : undefined;
      });
    }
    return res;
  }
}
