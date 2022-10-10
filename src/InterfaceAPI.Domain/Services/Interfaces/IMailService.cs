using System.Threading.Tasks;
using Positivo.InterfaceAPI.Domain;

namespace Positivo.InterfaceAPI.Domain.Services.Interfaces
{
    public interface IMailService
    {
        Task SendPasswordResetMail(User user);
        Task SendActivationEmail(User user);
        Task SendCreationEmail(User user);
    }
}
