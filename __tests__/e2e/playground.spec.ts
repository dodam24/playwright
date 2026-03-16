/**
 * Playwright Locator
 *
 * locator는 페이지에서 특정 시점에 요소(Element)를 찾기 위한 객체
 * 실제 동작(click, fill 등)이 실행될 때 요소를 찾는 방식 (lazy evaluation)
 *
 * 특징
 * - 자동 대기(auto wait)
 * - 재시도(retry)
 * - DOM 변경에도 안정적
 */

import { test, expect } from "@playwright/test";

test("locator playground", async ({ page }) => {
    // 기본 locator
    const button = page.getByRole("button", { name: "Add to cart" });
    await button.click();

    // 여러 요소 중 선택
    // page.getByRole("button", { name: "Add to cart" }).nth(2);
    const thirdButton = page.getByRole("button", { name: "Add to cart" }).nth(2); // nth(index) → 여러 요소 중 특정 index 선택 (0부터 시작)
    await thirdButton.click();

    // locator chaining
    // 부모 → 자식 범위 축소
    const cardButton = page.locator(".product-card").getByRole("button", { name: "Add to cart" });
    await cardButton.click();

    // filtering (hasText)
    // 특정 텍스트를 포함하는 요소 찾기
    const product = page.locator(".product-card").filter({ hasText: "Playwright Book" });
    await product.getByRole("button", { name: "Add to cart" }).click();

    // filtering (has)
    // 특정 자식 요소를 포함하는 부모 찾기
    const product2 = page
        .locator(".product-cart")
        .filter({ has: page.getByRole("button", { name: "Add to cart" }) });
    await product2.first().click();

    // assertion
    // expect(locator)는 자동 wait 포함
    await expect(page.getByText("Added to cart")).toBeVisible();
});
