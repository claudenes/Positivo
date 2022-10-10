using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Positivo.InterfaceAPI.Domain
{
    [Table("turmas")]
    public class Turmas : BaseEntity<long>
    {
        [Required]
        public string Turma { get; set; }
        [Required]
        public string Turno { get; set; }
        [Required]
        public string Curriculo { get; set; }
        public int? Serie { get; set; }
        public int? Ano { get; set; }
        public DateTime? Dtatualizacao { get; set; }

        public long? NiveisEnsinoId { get; set; }
        public NiveisEnsino NiveisEnsino { get; set; }

        public long? UnidadesFisicasId { get; set; }
        public UnidadesFisicas UnidadesFisicas { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var turmas = obj as Turmas;
            if (turmas?.Id == null || turmas?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, turmas.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Turmas{" +
                    $"ID='{Id}'" +
                    $", Turma='{Turma}'" +
                    $", Turno='{Turno}'" +
                    $", Curriculo='{Curriculo}'" +
                    $", Serie='{Serie}'" +
                    $", Ano='{Ano}'" +
                    $", Dtatualizacao='{Dtatualizacao}'" +
                    "}";
        }
    }
}
