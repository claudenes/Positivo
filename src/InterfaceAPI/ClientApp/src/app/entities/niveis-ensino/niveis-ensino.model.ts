import * as dayjs from "dayjs";

export interface INiveisEnsino {
  id?: number;
  nivelensino?: string;
  nome?: string | null;
  unidaderesponsavel?: string | null;
  situacao?: string | null;
  dtatualizacao?: dayjs.Dayjs | null;
}

export class NiveisEnsino implements INiveisEnsino {
  constructor(
    public id?: number,
    public nivelensino?: string,
    public nome?: string | null,
    public unidaderesponsavel?: string | null,
    public situacao?: string | null,
    public dtatualizacao?: dayjs.Dayjs | null
  ) {}
}

export function getNiveisEnsinoIdentifier(
  niveisEnsino: INiveisEnsino
): number | undefined {
  return niveisEnsino.id;
}
