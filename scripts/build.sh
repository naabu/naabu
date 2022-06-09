rm -rf /var/www/public/_app;
rm -rf /var/www/.svelte-kit;
rm -rf /var/www/functions/ssr;
mkdir /var/www/functions/ssr;
svelte-kit build;
