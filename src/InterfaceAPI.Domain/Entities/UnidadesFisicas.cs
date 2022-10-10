using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Positivo.InterfaceAPI.Domain
{
    [Table("unidades_fisicas")]
    public class UnidadesFisicas : BaseEntity<long>
    {
        [Required]
        public string Unidadefisica { get; set; }
        public string Unidadefisicafolha { get; set; }
        public string Nome { get; set; }
        public string Cnpj { get; set; }
        public string Situacao { get; set; }
        public DateTime? Dtatualizacao { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var unidadesFisicas = obj as UnidadesFisicas;
            if (unidadesFisicas?.Id == null || unidadesFisicas?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, unidadesFisicas.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "UnidadesFisicas{" +
                    $"ID='{Id}'" +
                    $", Unidadefisica='{Unidadefisica}'" +
                    $", Unidadefisicafolha='{Unidadefisicafolha}'" +
                    $", Nome='{Nome}'" +
                    $", Cnpj='{Cnpj}'" +
                    $", Situacao='{Situacao}'" +
                    $", Dtatualizacao='{Dtatualizacao}'" +
                    "}";
        }
    }
}
