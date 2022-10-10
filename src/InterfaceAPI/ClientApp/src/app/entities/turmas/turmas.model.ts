import * as dayjs from "dayjs";
import { INiveisEnsino } from "app/entities/niveis-ensino/niveis-ensino.model";
import { IUnidadesFisicas } from "app/entities/unidades-fisicas/unidades-fisicas.model";

export interface ITurmas {
  id?: number;
  turma?: string;
  turno?: string;
  curriculo?: string;
  serie?: number | null;
  ano?: number | null;
  dtatualizacao?: dayjs.Dayjs | null;
  niveisEnsino?: INiveisEnsino | null;
  unidadesFisicas?: IUnidadesFisicas | null;
}

export class Turmas implements ITurmas {
  constructor(
    public id?: number,
    public turma?: string,
    public turno?: string,
    public curriculo?: string,
    public serie?: number | null,
    public ano?: number | null,
    public dtatualizacao?: dayjs.Dayjs | null,
    public niveisEnsino?: INiveisEnsino | null,
    public unidadesFisicas?: IUnidadesFisicas | null
  ) {}
}

export function getTurmasIdentifier(turmas: ITurmas): number | undefined {
  return turmas.id;
}
