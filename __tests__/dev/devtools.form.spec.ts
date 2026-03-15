import { test, expect } from "@playwright/test";

// 📦 테스트 그룹: 회원가입(sign-in) 관련 테스트
test.describe("sign-in", () => {
    // 하위 그룹: 입력값 validation 테스트
    test.describe("validation", () => {
        // 🚫 CI 환경에서는 Next.js DevTools가 없기 때문에 테스트를 건너뜀
        test.skip(!!process.env.CI, "Skip Next.js DevTools test in CI");

        // 테스트 케이스
        // 플랜 선택 + 이름 입력 시 Continue 버튼이 활성화되는지 확인
        test("If select plan type and fill name, submit enabled", async ({ page }) => {
            const startUrl = "https://vercel.com/signup";

            await page.goto(startUrl);

            // 1️⃣ 페이지 처음 로드 시 Continue 버튼은 비활성화 상태여야 함
            await expect(page.getByRole("button", { name: "Continue" })).toBeDisabled();

            // 2️⃣ 플랜 타입 선택
            await page.getByRole("option", { name: "I'm working on personal projects" }).click();

            // 3️⃣ 이름 입력 (label 기반 selector 사용)
            await page.getByLabel("Your Name").fill("vercel");

            // 4️⃣ 필수 입력 완료 시, 버튼 비활성화 확인
            await expect(page.getByRole("button", { name: "Continue" })).toBeEnabled();
        });
    });
});
