import { test, expect } from "@playwright/test";

// 📦 테스트 그룹: 버튼 클릭 관련 테스트
test.describe("button click", () => {
    // 개별 테스트 케이스: Preferences 메뉴 열기
    test("Open preferences menu", async ({ page }) => {
        const startUrl = "http://localhost:3000";

        // 브라우저가 해당 페이지로 이동
        await page.goto(startUrl);

        // 1️⃣ 첫 번째 테스트 단계: Next.js DevTools 메뉴 열기
        await test.step("If click Next.Js icon, Show dropdown menu", async () => {
            // Next.js DevTools 버튼 클릭
            await page.getByRole("button", { name: "Open Next.js Dev Tools" }).click();

            // dropdown 메뉴에 Preferences 메뉴가 나타나는지 확인
            // menu 내부 항목이므로 role = munuitem
            await expect(page.getByRole("menuitem", { name: "Preferences" })).toBeVisible();
        });

        // 2️⃣ 두 번째 테스트 단계: Preferences 메뉴 클릭
        await test.step("If click Preferences, Show preferences menu", async () => {
            // Preferences 메뉴 클릭
            await page.getByRole("menuitem", { name: "Preferences" }).click();

            // Preferences 화면이 정상적으로 열렸는지 확인
            await expect(page.getByRole("heading", { name: "Preferences" })).toBeVisible();
        });
    });
});
