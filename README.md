# Playwright 기초 실습

![Playwright](https://img.shields.io/badge/Playwright-E2E%20Testing-2EAD33?logo=playwright)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

이 저장소는 **Playwright를 이용한 E2E(End-to-End) 테스트 기초 학습 및 실습 코드**를 정리한 프로젝트입니다.  
Playwright의 기본 개념과 테스트 작성 방법을 단계별로 학습하고 실습한 내용을 기록합니다.

---

## 🚀 사용 기술 (Tech Stack)

- Playwright
- Node.js
- TypeScript
- Visual Studio Code

---

## 📚 학습 내용

이 프로젝트에서는 다음과 같은 Playwright의 핵심 기능을 학습했습니다.

- Playwright 설치 및 프로젝트 설정
- 웹 페이지 **네비게이션 테스트 작성**
- **폼(Form) 제출 테스트**
- Playwright의 **핵심 개념 이해**
- **Locator를 활용한 요소 선택**
- **Locator Filtering**
- 사용자 인터랙션을 위한 **Actions**
- **내장 이벤트 처리**
- 테스트 검증을 위한 **Assertions**
- **Codegen을 활용한 테스트 자동 생성**

---

## 📂 프로젝트 구조

```
.
├── tests/                # Playwright 테스트 코드
├── node_modules/         # 프로젝트 의존성
├── playwright.config.ts  # Playwright 설정 파일
├── package.json
└── README.md
```

---

## ⚙️ 프로젝트 설치 및 실행 방법

### 1️⃣ 프로젝트 의존성 설치

```bash
npm install
```

### 2️⃣ Playwright 테스트 실행

```bash
npx playwright test
```

### 3️⃣ UI 모드에서 테스트 실행

```bash
npx playwright test --ui
```

### 4️⃣ 테스트 리포트 확인

```bash
npx playwright show-report
```

---

## 🧪 테스트 예제

Playwright를 이용하여 다음과 같은 테스트를 작성했습니다.

- Navigation Test
- Button Click Test
- Form Submission Test
- Locator 기반 요소 선택 테스트
- Assertion을 활용한 UI 상태 검증

---

## 🎯 프로젝트 목적

이 프로젝트의 목표는 다음과 같습니다.

- Playwright를 활용한 **웹 자동화 테스트 학습**
- **E2E 테스트 기본 개념 이해**
- 테스트 자동화 도구 사용 경험 축적
- 실무에서 활용 가능한 테스트 작성 능력 향상

---

## 📈 향후 계획

- Playwright **고급 테스트 시나리오 추가**
- **GitHub Actions를 활용한 CI 테스트 자동화**
- 테스트 코드 구조 개선
- 실제 웹 서비스 기반 테스트 작성
