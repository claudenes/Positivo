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
    public class ReadOnlyInterfaceIntegracaoRepository : ReadOnlyGenericRepository<InterfaceIntegracao, long>, IReadOnlyInterfaceIntegracaoRepository
    {
        public ReadOnlyInterfaceIntegracaoRepository(IUnitOfWork context) : base(context)
        {
        }
    }
}
