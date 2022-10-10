using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Positivo.InterfaceAPI.Domain
{
    [Table("alunos")]
    public class Alunos : BaseEntity<long>
    {
        [Required]
        public string Aluno { get; set; }
        public decimal? Pessoa { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Primeironome { get; set; }
        public string Situacao { get; set; }
        public string Turno { get; set; }
        public string Curriculo { get; set; }
        public int? Serie { get; set; }
        public int? Anoingresso { get; set; }
        public string Senha { get; set; }
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
            var alunos = obj as Alunos;
            if (alunos?.Id == null || alunos?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, alunos.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Alunos{" +
                    $"ID='{Id}'" +
                    $", Aluno='{Aluno}'" +
                    $", Pessoa='{Pessoa}'" +
                    $", Nome='{Nome}'" +
                    $", Sobrenome='{Sobrenome}'" +
                    $", Primeironome='{Primeironome}'" +
                    $", Situacao='{Situacao}'" +
                    $", Turno='{Turno}'" +
                    $", Curriculo='{Curriculo}'" +
                    $", Serie='{Serie}'" +
                    $", Anoingresso='{Anoingresso}'" +
                    $", Senha='{Senha}'" +
                    $", Dtatualizacao='{Dtatualizacao}'" +
                    "}";
        }
    }
}
