using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Positivo.InterfaceAPI.Domain
{
    [Table("alunos_turma")]
    public class AlunosTurma : BaseEntity<long>
    {
        public DateTime? Dtatualizacao { get; set; }

        public long? AlunosId { get; set; }
        public Alunos Alunos { get; set; }

        public long? TurmasId { get; set; }
        public Turmas Turmas { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var alunosTurma = obj as AlunosTurma;
            if (alunosTurma?.Id == null || alunosTurma?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, alunosTurma.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "AlunosTurma{" +
                    $"ID='{Id}'" +
                    $", Dtatualizacao='{Dtatualizacao}'" +
                    "}";
        }
    }
}
