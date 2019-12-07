# Sample

## Android

### aab 테스트 진행

0. npm run android:aab
1. bundletool build-apks --bundle=./android/app/build/outputs/bundle/release/app-release.aab --output=./android/app/build/outputs/bundle/release/app-release.apks --ks=./android/app/fitsme-production-key.keystore --ks-pass=pass:android --ks-key-alias=fitsme-production-alias --key-pass=pass:android
2. bundletool install-apks --apks=./android/app/build/outputs/bundle/release/app-release.apks --device-id=LMX625ON6PLF5HJZPJ

## Code Push

- 코드푸쉬 키 가져오는 커멘드

```
appcenter codepush deployment list -a cosmochain/fitsme-ios
appcenter codepush deployment list -a cosmochain/fitsme-android
```

- 코드푸쉬 apply 예시

```
code-push release-react cosmochain/fitsme-android android -d Staging -m true --privateKeyPath ~/private.pem --description "헬로우 월드44"

code-push release-react cosmochain/fitsme-ios ios -d Staging -m true --privateKeyPath ~/private.pem --description "헬로우 월드44" --plistFile "ios/FitsMe/Info.plist"
```

- Code Push cli 설치 https://github.com/Microsoft/code-push/tree/master/cli#installation
- 코드 푸쉬 간단한 설명서
  - https://github.com/kjk7034/ReactNativeStudy/blob/master/docs/CodePush.md
- 코드 푸쉬가 감지하는 버젼 변경점
  React Native (Android) The android.defaultConfig.versionName property in your build.gradle file
  React Native (iOS) The CFBundleShortVersionString key in the Info.plist file

- multi-deployment
  - https://github.com/Microsoft/react-native-code-push/blob/master/docs/multi-deployment-testing-android.md
  - https://github.com/Microsoft/react-native-code-push/blob/master/docs/multi-deployment-testing-ios.md


### Tips
- 안드로이드 adb install
  - adb devices
  - adb -s "<deviceIDfromlist>" install "<path-to-apk>"
   - ex) adb -s 9842c0f3 install ./android/app/build/outputs/apk/release/app-release.apk

- ios devices
  - xcrun simctl list

## FIX

Catalina OS 이슈
- https://github.com/facebook/react-native/issues/23282#issuecomment-533856658

## Document
- https://github.com/microsoft/react-native-code-push/issues/1672
- Font: https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e