import * as dayjs from "dayjs";

export interface IFuncionarios {
  id?: number;
  funcionario?: number;
  nome?: string | null;
  primeironome?: string | null;
  sobrenome?: string | null;
  datanascimento?: dayjs.Dayjs | null;
  cpf?: number | null;
  unidadefisicaFolha?: string | null;
  senha?: string | null;
  situacao?: string | null;
  dtatualizacao?: dayjs.Dayjs | null;
}

export class Funcionarios implements IFuncionarios {
  constructor(
    public id?: number,
    public funcionario?: number,
    public nome?: string | null,
    public primeironome?: string | null,
    public sobrenome?: string | null,
    public datanascimento?: dayjs.Dayjs | null,
    public cpf?: number | null,
    public unidadefisicaFolha?: string | null,
    public senha?: string | null,
    public situacao?: string | null,
    public dtatualizacao?: dayjs.Dayjs | null
  ) {}
}

export function getFuncionariosIdentifier(
  funcionarios: IFuncionarios
): number | undefined {
  return funcionarios.id;
}
