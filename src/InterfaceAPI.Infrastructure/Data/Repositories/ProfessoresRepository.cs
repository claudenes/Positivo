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
    public class ProfessoresRepository : GenericRepository<Professores, long>, IProfessoresRepository
    {
        public ProfessoresRepository(IUnitOfWork context) : base(context)
        {
        }

    }
}