/**
 * Playwright Actions
 *
 * 사용자가 페이지의 HTML 요소와 상호작용할 수 있도록 제공되는 기능
 * 예: 텍스트 입력, 체크박스/라디오 버튼 선택, 옵션 선택, 마우스 클릭, 키보드 입력, 파일 업로드 등
 */

import { test, expect } from "@playwright/test";

test("actions test", async ({ page }) => {
    // ✏️ Text Input
    await page.getByRole("textbox").fill("안녕하세요"); // 텍스트 입력
    await expect(page.getByRole("textbox")).toHaveValue("안녕하세요"); // input 값 확인

    // ☑️ 체크박스/라디오 버튼
    await page.getByRole("checkbox").setChecked(true); // true(체크)
    await page.getByRole("checkbox").setChecked(false); // false(체크 해제)

    // 🔘 Select Option(셀렉트 박스)
    // select 요소에서 옵션 선택
    await page.getByLabel("Select").selectOption("hello"); // value 기준 선택
    await page.getByLabel("Select").selectOption(["hello", "hi"]); // 다중 선택
    await page.getByLabel("Select").selectOption({ label: "Hello" }); // label 기준 선택

    // 검증
    await expect(page.getByLabel("Select")).toHaveValue("hello"); // 단일 선택
    await expect(page.getByLabel("Select")).toHaveValues(["hello", "hi"]); // 다중 선택

    // 🖱️ Mouse Click
    await page.getByRole("button").click(); // 기본 클릭
    await page.getByRole("button").dblclick(); // 더블 클릭
    await page.getByRole("button").click({ button: "right" }); // 마우스 우클릭
    await page.getByRole("button").hover(); // 마우스 호버

    // ⌨️ 키보드 입력
    // press() → keydown / keypress / keyup 이벤트 실행
    await page.getByText("Submit").press("Enter"); // Enter 입력

    // 📁 파일 업로드
    // input[type=file]에 파일 업로드
    await page.getByLabel("Upload").setInputFiles("test.txt"); // 단일 파일
    await page.getByLabel("Upload").setInputFiles(["test1.txt", "test2.txt"]); // 다중 파일
    await page.getByLabel("Upload").setInputFiles([]); // 파일 제거

    // 🎯 포커싱
    await page.getByLabel("Password").focus();

    // 🫳 Drag and Drop
    // 요소 hover → 마우스 버튼 클릭 → 대상 위치로 이동 → 마우스 버튼 해제
    await page.locator(".item").dragTo(page.locator(".area"));

    // 📜 스크롤
    // Playwright는 대부분의 action(click 등)을 수행할 때
    // 대상 요소가 화면에 보이도록 자동 스크롤 수행
    // 1️⃣ scrollIntoViewIfNeeded()  2️⃣ mouse.wheel()  3️⃣ evaluate(scrollTop)

    // 필요할 때만 명시적으로 스크롤 (⭐️ 가장 안정적인 방법)
    await page.getByText("Footer text").scrollIntoViewIfNeeded();

    // 직접 스크롤 (마우스 휠 방식)
    page.mouse.wheel(0, 500); // y축 방향으로 500px 만큼 스크롤

    // JS로 스크롤 (특정 컨테이너룰 제어할 때 사용)
    const scrollArea = page.locator(".scroll-container");
    await scrollArea.evaluate((e: HTMLElement) => {
        e.scrollTop += 100;
    });
    // scrollTop 값을 변경하여 컨테이너 내부 스크롤 이동
});
