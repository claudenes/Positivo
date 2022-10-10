using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Positivo.InterfaceAPI.Dto
{

    public class TurmasDto
    {

        public long Id { get; set; }

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

        public long? UnidadesFisicasId { get; set; }


        // jhipster-needle-dto-add-field - JHipster will add fields here, do not remove
    }
}
