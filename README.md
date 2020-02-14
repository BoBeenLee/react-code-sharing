# react-code-sharing

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?style=flat-square)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=flat-square)](https://lernajs.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/barbajs/barba/blob/master/LICENSE)

## 📖 Introduction

- React, React Native기반으로 code sharing boilerplate

## Storybook

- https://bobeenlee.github.io/react-code-sharing

## 📂 Directory structure


    packages
    ├── app                   # Compiled files (alternatively `dist`)
    ├────── test
    ├── shared                    # Documentation files (alternatively `doc`)
    ├── web                     # Source files (alternatively `lib` or `app`)
    ├── LICENSE
    └── README.md


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
  - Shared 패키지에 react-native 기준 컴포넌트를 작성합니다.
  - 공통된 스타일은 style.ts 를 만들어 스타일을 추출합니다.
- App, Web 중 하나만 존재하는 컴포넌트일 경우
  - App, Web 패키지에 컴포넌트에 작성합니다.

### Reference

- https://www.slideshare.net/2j2e/monorepo-react-web-react-native
