using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Positivo.InterfaceAPI.Dto
{

    public class InterfaceIntegracaoDto
    {

        public long Id { get; set; }

        public string Nomeintegracao { get; set; }
        public string Servidorondeestainstalado { get; set; }
        public string Usuario { get; set; }
        public string Senha { get; set; }
        public string Status { get; set; }
        public DateTime? Dtatualizacao { get; set; }

        // jhipster-needle-dto-add-field - JHipster will add fields here, do not remove
    }
}
