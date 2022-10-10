using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Positivo.InterfaceAPI.Dto
{

    public class AlunosDto
    {

        public long Id { get; set; }

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

        public long? UnidadesFisicasId { get; set; }


        // jhipster-needle-dto-add-field - JHipster will add fields here, do not remove
    }
}
