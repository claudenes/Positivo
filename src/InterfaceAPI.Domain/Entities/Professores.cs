using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Positivo.InterfaceAPI.Domain
{
    [Table("professores")]
    public class Professores : BaseEntity<long>
    {
        [Required]
        public string Professor { get; set; }
        [Required]
        public decimal? Pessoa { get; set; }
        public string Nome { get; set; }
        public string Primeironome { get; set; }
        public string Sobrenome { get; set; }
        public string Situacao { get; set; }
        public string Senha { get; set; }
        public DateTime? Dtatualizacao { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var professores = obj as Professores;
            if (professores?.Id == null || professores?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, professores.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Professores{" +
                    $"ID='{Id}'" +
                    $", Professor='{Professor}'" +
                    $", Pessoa='{Pessoa}'" +
                    $", Nome='{Nome}'" +
                    $", Primeironome='{Primeironome}'" +
                    $", Sobrenome='{Sobrenome}'" +
                    $", Situacao='{Situacao}'" +
                    $", Senha='{Senha}'" +
                    $", Dtatualizacao='{Dtatualizacao}'" +
                    "}";
        }
    }
}
