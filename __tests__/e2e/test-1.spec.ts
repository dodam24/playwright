/**
 * Playwright Codegen (테스트 자동 생성)
 *
 * 개념
 * - 브라우저에서 수행한 행동을 자동으로 테스트 코드로 생성
 * - 빠르게 테스트 초안 작성 가능
 *
 * 실행 방법
 * npx playwright codegen https://example.com
 *
 * 예시 (자동 생성 코드)
 */

import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Vercel logomark Deploy Now" }).click();
    const page1 = await page1Promise;
    await expect(page1.getByTestId("new-project/title")).toContainText("Let's build something new");
});

test("new test", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Documentation" }).click();
    const page1 = await page1Promise;
    await page1.getByRole("button", { name: "Search documentation... ⌘K" }).click();
    await page1
        .getByRole("article")
        .getByRole("link", { name: "Getting Started", exact: true })
        .click();
    await page1.getByTestId("copy/button").nth(1).click();
});
