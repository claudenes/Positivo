using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JHipsterNet.Core.Pagination;
using JHipsterNet.Core.Pagination.Extensions;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Domain.Repositories.Interfaces;
using Positivo.InterfaceAPI.Infrastructure.Data.Extensions;

namespace Positivo.InterfaceAPI.Infrastructure.Data.Repositories
{
    public class ProfessoresTurmaRepository : GenericRepository<ProfessoresTurma, long>, IProfessoresTurmaRepository
    {
        public ProfessoresTurmaRepository(IUnitOfWork context) : base(context)
        {
        }

        public override async Task<ProfessoresTurma> CreateOrUpdateAsync(ProfessoresTurma professoresTurma)
        {
            return await base.CreateOrUpdateAsync(professoresTurma);
        }
    }
}
