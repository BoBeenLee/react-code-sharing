# react-code-sharing

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/github/barbajs/barba/master.svg?style=flat-square)](https://coveralls.io/github/barbajs/barba?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=flat-square)](https://lernajs.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/barbajs/barba/blob/master/LICENSE)
[![All Contributors](https://img.shields.io/badge/all_contributors-73-orange.svg?style=flat-square)](#contributors)

## 📖 Introduction

- React기반으로 앱, 웹 공통 부분을 공유할 수 있습니다.
- Lerna를 이용하여 packages를 관리하고 Shared 패키지를 통해 App과 Web을 공유합니다.
- 기존 react-native-web, react-primitives 과 다른점은 App, Web 각각 독립적인 부분은 각 패키지에서 구현하고 공통적인 모듈은 Shared에 구현함으로 앱과 웹이 분리된 상태에서 코드를 쉐어링할 수 있다는 점
- Shared패키지도 실시간 코드 변경을 감지하여 앱, 웹에 반영해줍니다. ( webpack, metro에서 Watching이 가능함 )

## 📂 Directory structure

- packages
    - app
    - shared
    - web

## 🌇 Getting Started

### prepare

```sh
npm install
```

### **Create new package**

```sh
    npx lerna create <Package-Name>
```

### **Install library**

```sh
    npx lerna add <npm-library-name>
```

- add specific version

```sh
    npx lerna add <npm-library-name> [@version]
```

- add specific project

```sh
    npx lerna add <npm-library-name> --scope=@rnapp/app
```

- add devDependencies

```sh
    npx lerna add <npm-library-name> --dev
```

- Add local package to another package

```sh
    npx lerna add @rnapp/app
```

### **Run npm command**

```sh
   npx lerna run lint
```

- if pecific project

```sh
   npx lerna run --scope="@rnapp/app" lint
```

### **Run arbitrary command**

```sh
   npx lerna exec -- rm -rf ./node_modules
```

- if pecific project

```sh
   npx lerna exec --scope="@rnapp/app" -- rm -rf ./node_modules
```

## Commit

- https://gist.github.com/stephenparish/9941e89d80e2bc58a153

### ISSUE

#### Error: EPERM: operation not permitted

- https://github.com/npm/npm/issues/18380

### Fastlane을 이용한 배포전략

- https://bigcheeseapp.com/2019/09/14/react-native-continuous-delivery-with-github-actions-and-fastlane/

### Components 스타일 분리 전략

- App, Web 둘다 존재하는 컴포넌트일 경우
  - Shared 패키지에 컴포넌트 폴더를 생성 후, example.app.tsx, example.web.tsx 파일을 각각 생성하여 구현합니다.
  - 공통된 스타일은 style.ts 를 만들어 스타일을 추출합니다.
- App, Web 중 하나만 존재하는 컴포넌트일 경우
  - App, Web 패키지에 컴포넌트를 생성하여 구현합니다.

### Reference

- https://www.slideshare.net/2j2e/monorepo-react-web-react-native
