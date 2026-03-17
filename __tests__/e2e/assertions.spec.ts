/**
 * Playwright Assertions
 *
 * expect()를 사용해 실제 결과와 기대값을 비교하여 검증
 *
 * Matcher 종류
 * - 동기 Matcher → 즉시 검사 (재시도 없음)
 * - 비동기 Matcher → 조건 만족까지 자동 재시도
 *
 * 특징
 * - locator 기반 assertion은 자동 대기(auto-waiting)
 * - 기본 timeout: 5초
 * - 웹 테스트는 비동기 matcher 사용 권장
 */

import { test, expect } from "@playwright/test";

test("assertions playground", async ({ page }) => {
    // 동기 Matcher (재시도 없음)
    expect(1 + 1).toBe(2);
    expect("hello").toEqual("hello");
    expect(true).toBeTruthy();

    // 비동기 Matcher
    // → 조건 만족할 때까지 자동 재시도 (await 필수)
    await page.goto("http://localhost:3000");
    await expect(page.getByLabel("title")).toHaveText("안녕하세요");

    // 자주 사용하는 비동기 Matcher
    await expect(page.getByRole("checkbox")).toBeChecked(); // 체크 상태
    await expect(page.getByRole("button")).toBeDisabled(); // 비활성화
    await expect(page.getByText("Hello")).toContainText("Hell"); // 텍스트 포함
    await expect(page.locator(".item")).toHaveCount(3); // 개수
    await expect(page.getByText("Title")).toHaveText("Title"); // 텍스트 일치
    await expect(page.getByRole("textbox")).toHaveValue("hi"); // input 값

    // 부정 Matcher
    await expect(page.getByText("Error")).not.toBeVisible();

    // Sofrt Assertions
    // → 실패해도 테스트 계속 진행
    await expect.soft(page.getByText("Status")).toHaveText("Success");

    // Custom Message
    await expect(page.getByText("Name"), "로그인 상태여야 함").toBeVisible();

    // expect 설정
    const softExpect = expect.configure({ soft: true, timeout: 10000 });
    await softExpect(page.getByText("Hello")).toHaveText("Hello");

    // expect.poll (비동기 polling)
    // → 값이 원하는 상태가 될 때까지 반복 실행
    await expect
        .poll(async () => {
            return 1 + 1;
        })
        .toBe(2);

    // expect.toPass (블록 재시도)
    // → assertion이 통과할 때까지 전체 코드 블록 재실행
    await expect(async () => {
        const result = 1 + 1;
        expect(result).toBe(2);
    }).toPass();
});
