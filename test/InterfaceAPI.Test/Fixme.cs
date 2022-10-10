using Positivo.InterfaceAPI.Infrastructure.Data;
using Positivo.InterfaceAPI.Domain;
using Positivo.InterfaceAPI.Test.Setup;

namespace Positivo.InterfaceAPI.Test
{
    public static class Fixme
    {
        public static User ReloadUser<TEntryPoint>(AppWebApplicationFactory<TEntryPoint> factory, User user)
            where TEntryPoint : class
        {
            var applicationDatabaseContext = factory.GetRequiredService<ApplicationDatabaseContext>();
            applicationDatabaseContext.Entry(user).Reload();
            return user;
        }
    }
}
