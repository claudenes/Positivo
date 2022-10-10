import * as dayjs from "dayjs";
import { INiveisEnsino } from "app/entities/niveis-ensino/niveis-ensino.model";
import { IUnidadesFisicas } from "app/entities/unidades-fisicas/unidades-fisicas.model";

export interface IAlunos {
  id?: number;
  aluno?: string;
  pessoa?: number | null;
  nome?: string | null;
  sobrenome?: string | null;
  primeironome?: string | null;
  situacao?: string | null;
  turno?: string | null;
  curriculo?: string | null;
  serie?: number | null;
  anoingresso?: number | null;
  senha?: string | null;
  dtatualizacao?: dayjs.Dayjs | null;
  niveisEnsino?: INiveisEnsino | null;
  unidadesFisicas?: IUnidadesFisicas | null;
}

export class Alunos implements IAlunos {
  constructor(
    public id?: number,
    public aluno?: string,
    public pessoa?: number | null,
    public nome?: string | null,
    public sobrenome?: string | null,
    public primeironome?: string | null,
    public situacao?: string | null,
    public turno?: string | null,
    public curriculo?: string | null,
    public serie?: number | null,
    public anoingresso?: number | null,
    public senha?: string | null,
    public dtatualizacao?: dayjs.Dayjs | null,
    public niveisEnsino?: INiveisEnsino | null,
    public unidadesFisicas?: IUnidadesFisicas | null
  ) {}
}

export function getAlunosIdentifier(alunos: IAlunos): number | undefined {
  return alunos.id;
}
