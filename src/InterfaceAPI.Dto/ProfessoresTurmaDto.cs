using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Positivo.InterfaceAPI.Dto
{

    public class ProfessoresTurmaDto
    {

        public long Id { get; set; }

        public DateTime? Dtatualizacao { get; set; }
        public long? ProfessoresId { get; set; }

        public long? TurmasId { get; set; }


        // jhipster-needle-dto-add-field - JHipster will add fields here, do not remove
    }
}
