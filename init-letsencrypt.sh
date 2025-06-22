#!/bin/bash

# Configuration
domains=(chainsmokers.duckdns.org)
rsa_key_size=4096
data_path="./certbot"
email="andrey.a.sotnikov@gmail.com" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

echo "### Stopping nginx to free port 80 ..."
docker compose down

echo "### Requesting Let's Encrypt certificate for $domains ..."
# Join $domains to -d args
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

# Create certbot directories
mkdir -p "$data_path/conf"
mkdir -p "$data_path/www"

# Use standalone mode - certbot will run its own web server
docker run --rm --name certbot \
  -v "$(pwd)/$data_path/conf:/etc/letsencrypt" \
  -v "$(pwd)/$data_path/www:/var/www/certbot" \
  -p 80:80 \
  certbot/certbot \
  certonly --standalone \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal

if [ $? -eq 0 ]; then
  echo "### SSL certificate obtained successfully!"
  echo "### Starting nginx with SSL ..."
  docker compose up -d
  echo "### Setup complete! Your site should be available at https://$domains"
else
  echo "### Failed to obtain SSL certificate"
  echo "### Starting nginx without SSL (HTTP only) ..."
  # You could start with HTTP-only config here if needed
  exit 1
fi
