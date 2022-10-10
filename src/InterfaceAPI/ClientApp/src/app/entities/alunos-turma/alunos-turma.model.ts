import * as dayjs from "dayjs";
import { IAlunos } from "app/entities/alunos/alunos.model";
import { ITurmas } from "app/entities/turmas/turmas.model";

export interface IAlunosTurma {
  id?: number;
  dtatualizacao?: dayjs.Dayjs | null;
  alunos?: IAlunos | null;
  turmas?: ITurmas | null;
}

export class AlunosTurma implements IAlunosTurma {
  constructor(
    public id?: number,
    public dtatualizacao?: dayjs.Dayjs | null,
    public alunos?: IAlunos | null,
    public turmas?: ITurmas | null
  ) {}
}

export function getAlunosTurmaIdentifier(
  alunosTurma: IAlunosTurma
): number | undefined {
  return alunosTurma.id;
}
