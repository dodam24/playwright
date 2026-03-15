import { test, expect } from "@playwright/test";

test('If user visit home and click "Get Started", h1 "Introduction" is visible and page title contains "Introduction"', async ({
    page,
}) => {
    const startUrl = "https://nextjs.org/";
    const h1 = /Next/;
    // const title = /Next/;

    // 테스트 브라우저가 실제 웹페이지를 로드
    // Playwright는 테스트 코드(Node.js)와 브라우저(Chromium 등)가 서로 다른 프로세스에서 실행되는 구조
    await page.goto(startUrl);

    // 실제 사용자가 클릭하는 것처럼 DOM에서 role="link"인 요소를 찾아 클릭
    await page.getByRole("link", { name: "Get Started" }).click();

    /**
     * E2E 테스트의 특징
     * 테스트 코드와 웹 앱은 서로 다른 프로세스에서 동작한다.
     *
     * 즉 Node.js에서 await을 했다고 해서
     * 브라우저의 렌더링 / React Hydration / 네트워크 / DOM 업데이트가 모두 끝났다는 보장이 없다.
     *
     * 그래서 다음과 같은 상황이 발생한다.
     */

    // 아래처럼 짧은 wait은 페이지 렌더링이 끝나기 전에 실행될 수 있다.
    // → 테스트가 불안정(flaky)해짐
    await page.waitForTimeout(100); // success
    await page.waitForTimeout(20); // fail

    // DOM 상태를 직접 확인
    const isVisible = await page.getByRole("heading", { name: h1, level: 1 }).isVisible();

    // 단순 boolean 검증
    // 이 방식은 "현재 순간"의 상태만 검사하기 때문에 아직 렌더링이 안 끝났다면 false가 나올 수 있다.
    expect(isVisible).toEqual(true);

    /**
     * Playwright의 Web-first assertion
     *
     * Playwright는 웹 환경을 고려해 자동 대기(auth-wait)를 수행한다.
     * 즉, 아래 aseertion은:
     *
     * - 요소가 나타날 때까지
     * - timeout 동안
     * - 계속 polling 하면서 기다린다.
     *
     * 그래서 flaky 테스트를 줄일 수 있다.
     */
    await expect(page.getByRole("heading", { name: h1, level: 1 })).toBeVisible();
    // await expect(page).toHaveTitle(title);
});

/**
 * 📌 정리: Playwright의 "웹 친화적(Web-first)" 테스트 방식
 *
 * 테스트 코드(Node)와 브라우저는 서로 다른 프로세스
 * → await만으로 DOM 상태 완료를 보장 불가
 *
 * 단순 값 검사 (isVisible)
 * → 현재 순간의 상태만 확인
 *
 * Playwright assertion (toBeVisible, toHaveTitle 등)
 * → 자동 대기(auth-wait)
 * → DOM이 준비될 때까지 polling
 *
 * 따라서 Playwright에서는
 *    waitForTimeout 같은 sleep 기반 테스트보다
 *    expect(locator).toBeVisible() 같은 "Web-first assertion" 사용 권장
 */
