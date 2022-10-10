import * as dayjs from "dayjs";
import { IProfessores } from "app/entities/professores/professores.model";
import { ITurmas } from "app/entities/turmas/turmas.model";

export interface IProfessoresTurma {
  id?: number;
  dtatualizacao?: dayjs.Dayjs | null;
  professores?: IProfessores | null;
  turmas?: ITurmas | null;
}

export class ProfessoresTurma implements IProfessoresTurma {
  constructor(
    public id?: number,
    public dtatualizacao?: dayjs.Dayjs | null,
    public professores?: IProfessores | null,
    public turmas?: ITurmas | null
  ) {}
}

export function getProfessoresTurmaIdentifier(
  professoresTurma: IProfessoresTurma
): number | undefined {
  return professoresTurma.id;
}
