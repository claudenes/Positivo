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
  IInterfaceIntegracao,
  getInterfaceIntegracaoIdentifier,
} from "../interface-integracao.model";

export type EntityResponseType = HttpResponse<IInterfaceIntegracao>;
export type EntityArrayResponseType = HttpResponse<IInterfaceIntegracao[]>;

@Injectable({ providedIn: "root" })
export class InterfaceIntegracaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor(
    "api/interface-integracaos"
  );

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(
    interfaceIntegracao: IInterfaceIntegracao
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(interfaceIntegracao);
    return this.http
      .post<IInterfaceIntegracao>(this.resourceUrl, copy, {
        observe: "response",
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(
    interfaceIntegracao: IInterfaceIntegracao
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(interfaceIntegracao);
    return this.http
      .put<IInterfaceIntegracao>(
        `${this.resourceUrl}/${
          getInterfaceIntegracaoIdentifier(interfaceIntegracao) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(
    interfaceIntegracao: IInterfaceIntegracao
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(interfaceIntegracao);
    return this.http
      .patch<IInterfaceIntegracao>(
        `${this.resourceUrl}/${
          getInterfaceIntegracaoIdentifier(interfaceIntegracao) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInterfaceIntegracao>(`${this.resourceUrl}/${id}`, {
        observe: "response",
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInterfaceIntegracao[]>(this.resourceUrl, {
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

  addInterfaceIntegracaoToCollectionIfMissing(
    interfaceIntegracaoCollection: IInterfaceIntegracao[],
    ...interfaceIntegracaosToCheck: (IInterfaceIntegracao | null | undefined)[]
  ): IInterfaceIntegracao[] {
    const interfaceIntegracaos: IInterfaceIntegracao[] =
      interfaceIntegracaosToCheck.filter(isPresent);
    if (interfaceIntegracaos.length > 0) {
      const interfaceIntegracaoCollectionIdentifiers =
        interfaceIntegracaoCollection.map(
          (interfaceIntegracaoItem) =>
            getInterfaceIntegracaoIdentifier(interfaceIntegracaoItem)!
        );
      const interfaceIntegracaosToAdd = interfaceIntegracaos.filter(
        (interfaceIntegracaoItem) => {
          const interfaceIntegracaoIdentifier =
            getInterfaceIntegracaoIdentifier(interfaceIntegracaoItem);
          if (
            interfaceIntegracaoIdentifier == null ||
            interfaceIntegracaoCollectionIdentifiers.includes(
              interfaceIntegracaoIdentifier
            )
          ) {
            return false;
          }
          interfaceIntegracaoCollectionIdentifiers.push(
            interfaceIntegracaoIdentifier
          );
          return true;
        }
      );
      return [...interfaceIntegracaosToAdd, ...interfaceIntegracaoCollection];
    }
    return interfaceIntegracaoCollection;
  }

  protected convertDateFromClient(
    interfaceIntegracao: IInterfaceIntegracao
  ): IInterfaceIntegracao {
    return Object.assign({}, interfaceIntegracao, {
      dtatualizacao: interfaceIntegracao.dtatualizacao?.isValid()
        ? interfaceIntegracao.dtatualizacao.format(DATE_FORMAT)
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
      res.body.forEach((interfaceIntegracao: IInterfaceIntegracao) => {
        interfaceIntegracao.dtatualizacao = interfaceIntegracao.dtatualizacao
          ? dayjs(interfaceIntegracao.dtatualizacao)
          : undefined;
      });
    }
    return res;
  }
}
