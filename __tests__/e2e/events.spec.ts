/**
 * Playwright Events
 *
 * Playwright는 웹 페이지에서 발생하는 다양한 이벤트를 감지할 수 있다.
 * 예: 네트워크 요청, 팝업 생성, 다운로드, 다이얼로그 등
 *
 * 📌 이벤트 패턴
 * 이벤트를 기다릴 때는
 * "이벤트 대기 시작 → 이벤트 발생 동작 실행" 순서로 작성한다.
 *
 * 예:
 *   const [download] = await Promise.all([
 *     page.waitForEvent("download"),
 *     page.click("button"),
 *   ]);
 */

import { test, expect, Request } from "@playwright/test";

test("playwright events playground", async ({ page, context }) => {
    // 이벤트 대기 (waitForRequest)
    // 특정 네트워크 요청이 발생할 때까지 기다림
    const requestPromise = page.waitForRequest("**/*logo*.png");
    await page.goto("https://wikipedia.org");
    const request = await requestPromise;
    console.log("Request URL:", request.url());

    // 팝업 이벤트 (waitForEvent)
    // 버튼 클릭 시 새 페이지 생성
    const popupPromise = page.waitForEvent("popup");
    await page.getByText("open the popup").click();
    const popup = await popupPromise;
    await popup.goto("https://example.com");

    // 이벤트 리스너 등록 (pag.on)
    // 네트워크 요청 발생 시 실행
    page.on("request", (request) => {
        console.log("Request sent:", request.url());
    });
    const listener = (request: Request) => {
        console.log("Request finished:", request.url());
    };
    page.on("requestfinished", listener);
    await page.goto("https://wikipedia.org");

    // 이벤트 리스너 제거
    page.off("requestfinished", listener);
    await page.goto("https://openstreetmap.org");

    // 일회성 이벤트 처리 (page.once)
    page.once("dialog", (dialog) => {
        console.log(dialog.message());
        dialog.accept("2026");
    });
    await page.evaluate("prompt('Enter a number:')");

    // =================================================
    // ⭐ 실무에서 가장 많이 쓰는 이벤트 패턴 6개
    // =================================================

    // Popup 이벤트
    // 새 창 / 새 탭 테스트
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.getByRole("button", { name: "Open new page" }).click(),
    ]);
    await expect(newPage).toBeTruthy();

    // Dialog 이벤트
    // alert / confirm / prompt 처리
    page.once("dialog", (dialog) => dialog.accept());
    await page.evaluate("alert('Hello')");

    // Download 이벤트
    // 파일 다운로드 테스트
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.getByRole("button", { name: "Download" }).click(),
    ]);
    console.log(await download.suggestedFilename());

    // Request 이벤트
    // 특정 API 요청 감지
    const apiRequest = await page.waitForRequest("**/aopi/**");
    console.log("API Request:", apiRequest.url());

    // Response 이벤트
    // 서버 응답 확인
    const response = await page.waitForResponse("**/api/**");
    console.log("Response status:", response.status());

    // Load 상태 대기
    // 페이지 로딩 완료
    await page.waitForLoadState("load");
});
