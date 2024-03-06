using Microsoft.EntityFrameworkCore;
using Volo.Abp.DependencyInjection;

namespace Promact.CustomerSuccess.Platform.Data;

public class PlatformEFCoreDbSchemaMigrator : ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public PlatformEFCoreDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the PlatformDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<PlatformDbContext>()
            .Database
            .MigrateAsync();
    }
}
