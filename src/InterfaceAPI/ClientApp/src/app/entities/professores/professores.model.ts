import * as dayjs from "dayjs";

export interface IProfessores {
  id?: number;
  professor?: string;
  pessoa?: number;
  nome?: string | null;
  primeironome?: string | null;
  sobrenome?: string | null;
  situacao?: string | null;
  senha?: string | null;
  dtatualizacao?: dayjs.Dayjs | null;
}

export class Professores implements IProfessores {
  constructor(
    public id?: number,
    public professor?: string,
    public pessoa?: number,
    public nome?: string | null,
    public primeironome?: string | null,
    public sobrenome?: string | null,
    public situacao?: string | null,
    public senha?: string | null,
    public dtatualizacao?: dayjs.Dayjs | null
  ) {}
}

export function getProfessoresIdentifier(
  professores: IProfessores
): number | undefined {
  return professores.id;
}
