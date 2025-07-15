# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY . .
RUN dotnet restore "UptimePinger.Server.csproj"
RUN dotnet build "UptimePinger.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# COPY ["UptimePinger.Server.csproj", "."]
# COPY ["uptimepinger.client/uptimepinger.client.esproj", "uptimepinger.client/"]
# RUN dotnet restore "UptimePinger.Server.csproj"
# COPY . .
# WORKDIR "/src/UptimePinger.Server"
# RUN dotnet build "UptimePinger.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "UptimePinger.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UptimePinger.Server.dll"]