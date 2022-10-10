import * as dayjs from "dayjs";

export interface IPessoasContato {
  id?: number;
  pessoa?: number;
  email?: string | null;
  emailgoogle?: string | null;
  endereco?: string | null;
  endnum?: string | null;
  endcompl?: string | null;
  bairro?: string | null;
  municipio?: string | null;
  uf?: string | null;
  cep?: string | null;
  dddfone?: string | null;
  fone?: string | null;
  dddcelular?: string | null;
  celular?: string | null;
  dddcomercial?: string | null;
  comercial?: string | null;
  dtatualizacao?: dayjs.Dayjs | null;
}

export class PessoasContato implements IPessoasContato {
  constructor(
    public id?: number,
    public pessoa?: number,
    public email?: string | null,
    public emailgoogle?: string | null,
    public endereco?: string | null,
    public endnum?: string | null,
    public endcompl?: string | null,
    public bairro?: string | null,
    public municipio?: string | null,
    public uf?: string | null,
    public cep?: string | null,
    public dddfone?: string | null,
    public fone?: string | null,
    public dddcelular?: string | null,
    public celular?: string | null,
    public dddcomercial?: string | null,
    public comercial?: string | null,
    public dtatualizacao?: dayjs.Dayjs | null
  ) {}
}

export function getPessoasContatoIdentifier(
  pessoasContato: IPessoasContato
): number | undefined {
  return pessoasContato.id;
}
