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
    public class AlunosTurmaRepository : GenericRepository<AlunosTurma, long>, IAlunosTurmaRepository
    {
        public AlunosTurmaRepository(IUnitOfWork context) : base(context)
        {
        }

        public override async Task<AlunosTurma> CreateOrUpdateAsync(AlunosTurma alunosTurma)
        {
            return await base.CreateOrUpdateAsync(alunosTurma);
        }
    }
}
