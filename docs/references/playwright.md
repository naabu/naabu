# Playwright references
Some helpful commands to use when writing Playwright tests

## Playwright cheatsheet:
```
await expect(page.locator()).toContainText();
await page.click();
await page.fill('', '');
await page.pause();
await expect(page.locator()).toBeVisible();
await expect(page.locator()).not.toBeVisible();
await page.selectOption('select#', '');
await expect(page.locator('')).toHaveValue('');
```
