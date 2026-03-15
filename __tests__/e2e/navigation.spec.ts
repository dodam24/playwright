import { test, expect } from "@playwright/test";

test('If user visit home and click "Get Started", h1 "Introduction" is visible and page title contains "Introduction"', async ({
    page,
}) => {
    const startUrl = "https://nextjs.org/";
    const h1 = /Next/;
    const title = /Next/;

    await page.goto(startUrl);
    await page.getByRole("link", { name: "Get Started" }).click();

    await expect(page.getByRole("heading", { name: h1, level: 1 })).toBeVisible();
    await expect(page).toHaveTitle(title);
});
