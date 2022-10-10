using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Positivo.InterfaceAPI.Dto
{

    public class ProfessoresDto
    {

        public long Id { get; set; }

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

        // jhipster-needle-dto-add-field - JHipster will add fields here, do not remove
    }
}
