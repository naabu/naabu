Import the ``$t()`` function from [Svelte-intl-precompile](https://github.com/cibernox/svelte-intl-precompile)

```js
  import { t } from "svelte-intl-precompile";
```

Use it in javascript code:
```js
  let string = $t("key-of-translation");
``` 

Or in Svelte code 

```js
<p>
  {$t("key-of-translation")}
</p>
```

Add config files in ``locales/...json`` manually or better use the [i18n Ally extension](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally)

In the config of i18n Ally add the ``svelte`` framework and make sure it can find the ``locales`` folder.
