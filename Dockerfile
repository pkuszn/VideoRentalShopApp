FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

RUN dotnet tool install --global dotnet-certificate-tool
RUN apt-get update && apt-get install -y dos2unix openssl

RUN dos2unix /app/docker-entrypoint.sh

RUN apt-get update && apt-get install -y openssl

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build-env /app/out .
COPY --from=build-env /root/.dotnet/tools /tools
COPY --from=build-env /app/docker-entrypoint.sh /app/docker-entrypoint.sh
ENV PATH="/tools:${PATH}" 
COPY ./docker-entrypoint.sh /app/docker-entrypoint.sh
COPY ./src/new-myservice.local.pfx /app/new-myservice.local.pfx

RUN ls

RUN chmod 600 /app/new-myservice.local.pfx
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 6000
EXPOSE 6001

ENTRYPOINT ["bash", "/app/docker-entrypoint.sh"]
