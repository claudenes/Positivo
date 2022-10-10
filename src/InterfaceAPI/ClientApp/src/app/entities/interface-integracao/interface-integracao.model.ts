import * as dayjs from "dayjs";

export interface IInterfaceIntegracao {
  id?: number;
  nomeintegracao?: string | null;
  servidorondeestainstalado?: string | null;
  usuario?: string | null;
  senha?: string | null;
  status?: string | null;
  dtatualizacao?: dayjs.Dayjs | null;
}

export class InterfaceIntegracao implements IInterfaceIntegracao {
  constructor(
    public id?: number,
    public nomeintegracao?: string | null,
    public servidorondeestainstalado?: string | null,
    public usuario?: string | null,
    public senha?: string | null,
    public status?: string | null,
    public dtatualizacao?: dayjs.Dayjs | null
  ) {}
}

export function getInterfaceIntegracaoIdentifier(
  interfaceIntegracao: IInterfaceIntegracao
): number | undefined {
  return interfaceIntegracao.id;
}
