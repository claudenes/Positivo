import * as dayjs from "dayjs";

export interface IUnidadesFisicas {
  id?: number;
  unidadefisica?: string;
  unidadefisicafolha?: string | null;
  nome?: string | null;
  cnpj?: string | null;
  situacao?: string | null;
  dtatualizacao?: dayjs.Dayjs | null;
}

export class UnidadesFisicas implements IUnidadesFisicas {
  constructor(
    public id?: number,
    public unidadefisica?: string,
    public unidadefisicafolha?: string | null,
    public nome?: string | null,
    public cnpj?: string | null,
    public situacao?: string | null,
    public dtatualizacao?: dayjs.Dayjs | null
  ) {}
}

export function getUnidadesFisicasIdentifier(
  unidadesFisicas: IUnidadesFisicas
): number | undefined {
  return unidadesFisicas.id;
}
