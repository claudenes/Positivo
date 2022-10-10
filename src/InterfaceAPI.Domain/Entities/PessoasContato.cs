using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Positivo.InterfaceAPI.Domain
{
    [Table("pessoas_contato")]
    public class PessoasContato : BaseEntity<long>
    {
        [Required]
        public decimal? Pessoa { get; set; }
        public string Email { get; set; }
        public string Emailgoogle { get; set; }
        public string Endereco { get; set; }
        public string Endnum { get; set; }
        public string Endcompl { get; set; }
        public string Bairro { get; set; }
        public string Municipio { get; set; }
        public string Uf { get; set; }
        public string Cep { get; set; }
        public string Dddfone { get; set; }
        public string Fone { get; set; }
        public string Dddcelular { get; set; }
        public string Celular { get; set; }
        public string Dddcomercial { get; set; }
        public string Comercial { get; set; }
        public DateTime? Dtatualizacao { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var pessoasContato = obj as PessoasContato;
            if (pessoasContato?.Id == null || pessoasContato?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, pessoasContato.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "PessoasContato{" +
                    $"ID='{Id}'" +
                    $", Pessoa='{Pessoa}'" +
                    $", Email='{Email}'" +
                    $", Emailgoogle='{Emailgoogle}'" +
                    $", Endereco='{Endereco}'" +
                    $", Endnum='{Endnum}'" +
                    $", Endcompl='{Endcompl}'" +
                    $", Bairro='{Bairro}'" +
                    $", Municipio='{Municipio}'" +
                    $", Uf='{Uf}'" +
                    $", Cep='{Cep}'" +
                    $", Dddfone='{Dddfone}'" +
                    $", Fone='{Fone}'" +
                    $", Dddcelular='{Dddcelular}'" +
                    $", Celular='{Celular}'" +
                    $", Dddcomercial='{Dddcomercial}'" +
                    $", Comercial='{Comercial}'" +
                    $", Dtatualizacao='{Dtatualizacao}'" +
                    "}";
        }
    }
}
