using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Positivo.InterfaceAPI.Dto
{

    public class PessoasContatoDto
    {

        public long Id { get; set; }

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

        // jhipster-needle-dto-add-field - JHipster will add fields here, do not remove
    }
}
