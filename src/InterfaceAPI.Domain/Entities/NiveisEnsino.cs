using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Positivo.InterfaceAPI.Domain
{
    [Table("niveis_ensino")]
    public class NiveisEnsino : BaseEntity<long>
    {
        [Required]
        public string Nivelensino { get; set; }
        public string Nome { get; set; }
        public string Unidaderesponsavel { get; set; }
        public string Situacao { get; set; }
        public DateTime? Dtatualizacao { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var niveisEnsino = obj as NiveisEnsino;
            if (niveisEnsino?.Id == null || niveisEnsino?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, niveisEnsino.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "NiveisEnsino{" +
                    $"ID='{Id}'" +
                    $", Nivelensino='{Nivelensino}'" +
                    $", Nome='{Nome}'" +
                    $", Unidaderesponsavel='{Unidaderesponsavel}'" +
                    $", Situacao='{Situacao}'" +
                    $", Dtatualizacao='{Dtatualizacao}'" +
                    "}";
        }
    }
}
