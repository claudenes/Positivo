using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Positivo.InterfaceAPI.Domain
{
    [Table("funcionarios")]
    public class Funcionarios : BaseEntity<long>
    {
        [Required]
        public decimal? Funcionario { get; set; }
        public string Nome { get; set; }
        public string Primeironome { get; set; }
        public string Sobrenome { get; set; }
        public DateTime? Datanascimento { get; set; }
        public decimal? Cpf { get; set; }
        public string UnidadefisicaFolha { get; set; }
        public string Senha { get; set; }
        public string Situacao { get; set; }
        public DateTime? Dtatualizacao { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var funcionarios = obj as Funcionarios;
            if (funcionarios?.Id == null || funcionarios?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, funcionarios.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Funcionarios{" +
                    $"ID='{Id}'" +
                    $", Funcionario='{Funcionario}'" +
                    $", Nome='{Nome}'" +
                    $", Primeironome='{Primeironome}'" +
                    $", Sobrenome='{Sobrenome}'" +
                    $", Datanascimento='{Datanascimento}'" +
                    $", Cpf='{Cpf}'" +
                    $", UnidadefisicaFolha='{UnidadefisicaFolha}'" +
                    $", Senha='{Senha}'" +
                    $", Situacao='{Situacao}'" +
                    $", Dtatualizacao='{Dtatualizacao}'" +
                    "}";
        }
    }
}
