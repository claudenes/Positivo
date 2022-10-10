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
    public class TurmasRepository : GenericRepository<Turmas, long>, ITurmasRepository
    {
        public TurmasRepository(IUnitOfWork context) : base(context)
        {
        }

        public override async Task<Turmas> CreateOrUpdateAsync(Turmas turmas)
        {
            return await base.CreateOrUpdateAsync(turmas);
        }
    }
}
