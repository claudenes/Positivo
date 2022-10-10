using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Positivo.InterfaceAPI.Domain
{
    [Table("interface_integracao")]
    public class InterfaceIntegracao : BaseEntity<long>
    {
        public string Nomeintegracao { get; set; }
        public string Servidorondeestainstalado { get; set; }
        public string Usuario { get; set; }
        public string Senha { get; set; }
        public string Status { get; set; }
        public DateTime? Dtatualizacao { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var interfaceIntegracao = obj as InterfaceIntegracao;
            if (interfaceIntegracao?.Id == null || interfaceIntegracao?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, interfaceIntegracao.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "InterfaceIntegracao{" +
                    $"ID='{Id}'" +
                    $", Nomeintegracao='{Nomeintegracao}'" +
                    $", Servidorondeestainstalado='{Servidorondeestainstalado}'" +
                    $", Usuario='{Usuario}'" +
                    $", Senha='{Senha}'" +
                    $", Status='{Status}'" +
                    $", Dtatualizacao='{Dtatualizacao}'" +
                    "}";
        }
    }
}
