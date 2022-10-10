using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Positivo.InterfaceAPI.Dto
{

    public class NiveisEnsinoDto
    {

        public long Id { get; set; }

        [Required]
        public string Nivelensino { get; set; }
        public string Nome { get; set; }
        public string Unidaderesponsavel { get; set; }
        public string Situacao { get; set; }
        public DateTime? Dtatualizacao { get; set; }

        // jhipster-needle-dto-add-field - JHipster will add fields here, do not remove
    }
}
