using Microsoft.EntityFrameworkCore;
using Polly;
using UptimePinger.Server.Data;

namespace UptimePinger.Server.Extensions
{
    public static class DbMigrationExtension
    {
        public static void ApplyMigrations(this WebApplication? app)
        {
            using var scope = app!.Services.CreateScope();
            using var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var policy = Policy
                .Handle<Exception>()
                .WaitAndRetry(5, retryAttempt => TimeSpan.FromSeconds(5));

            policy.Execute(() => dbContext.Database.Migrate());
        }
    }
}
