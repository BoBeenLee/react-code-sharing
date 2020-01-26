# Webview

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/github/barbajs/barba/master.svg?style=flat-square)](https://coveralls.io/github/barbajs/barba?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=flat-square)](https://lernajs.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/barbajs/barba/blob/master/LICENSE)
[![All Contributors](https://img.shields.io/badge/all_contributors-73-orange.svg?style=flat-square)](#contributors)

## 📖 Introduction

TBD

## 📂 Directory structure

## 👨‍💻 System requirements

[nvm](https://github.com/nvm-sh/nvm) or [asdf](https://github.com/asdf-vm/asdf) 을 통해 node version 을 관리하고있습니다.
올바른 node version 사용을 위해 위 두개의 version management tool 중 하나를 사용해 주시기 바랍니다.

## 🌇 Getting Started

### prepare

```sh
npm install
```

if you have over npm version 5.7.0 [link](https://medium.com/@trustyoo86/ci-%ED%99%98%EA%B2%BD%EC%9D%84-%EC%9C%84%ED%95%9C-npm-ci-npm-ci-for-continous-integration-850fc48dd4cc)

```sh
npm ci
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

# Package별 설명

https://bigcheeseapp.com/2019/09/14/react-native-continuous-delivery-with-github-actions-and-fastlane/
