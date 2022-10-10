using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Positivo.InterfaceAPI.Domain
{
    [Table("professores_turma")]
    public class ProfessoresTurma : BaseEntity<long>
    {
        public DateTime? Dtatualizacao { get; set; }

        public long? ProfessoresId { get; set; }
        public Professores Professores { get; set; }

        public long? TurmasId { get; set; }
        public Turmas Turmas { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var professoresTurma = obj as ProfessoresTurma;
            if (professoresTurma?.Id == null || professoresTurma?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, professoresTurma.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "ProfessoresTurma{" +
                    $"ID='{Id}'" +
                    $", Dtatualizacao='{Dtatualizacao}'" +
                    "}";
        }
    }
}
