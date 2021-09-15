rm -rf /var/www/svelte/public/_app;
rm -rf /var/www/svelte/.svelte-kit;
rm -rf /var/www/svelte/functions/ssr;
svelte-kit build;
firebase deploy;
