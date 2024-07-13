# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Stage 2: Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build-env /app/out .

# Install OpenSSL (for certificate generation)
RUN apt-get update && apt-get install -y openssl

# Generate self-signed certificate (adjust validity period as needed)
RUN openssl req -newkey rsa:2048 -nodes -keyout cert.key -x509 -days 365 -out cert.crt -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Trust the self-signed certificate (for development purposes)
RUN mkdir -p /usr/local/share/ca-certificates \
    && cp cert.crt /usr/local/share/ca-certificates \
    && update-ca-certificates

# Expose port 80 (HTTP) and 443 (HTTPS)
EXPOSE 80
EXPOSE 443

# Set entry point for the container
ENTRYPOINT ["dotnet", "VideoRentalStoreApp.dll"]