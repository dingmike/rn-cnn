
### Information https://www.cnblogs.com/gdsblog/p/8540353.html
来自app.json的大多数配置都可以在运行时通过Expo.Constants.manifest从JavaScript代码访问。
诸如密钥之类的敏感信息被删除。有关如何将任意配置数据传递到您的应用程序的信息，请参阅下面的“额外”键。

### React Native: ExpoKit模式配置Push Notification Notification
https://www.dazhuanlan.com/2019/10/20/5dab7d510f23a/

### react-native 三方组件库
https://js.coach/?menu%5Bcollections%5D=React%20Native&page=1

### push message to user
https://docs.expo.io/push-notifications/overview/

### build the android production
cd android && gradlew assembleRelease

// 发布跟新bundle
 expo export -p https://listeningeng.com/static/json --output-dir ./dist --config app.json --force
// firebase serverTOken yXyF0vCN9Zandw1JMDLB-5MYNztm6yq1cNtzhuu01f1Tggf2UM_ZjQtx6i5uBSTYOwsfZ9tD93X6tU1URfi-zpvbZmK
// expo push:android:upload --api-key CN9Zandw1JMDLB-5MYNztm6yq1cNtzhuu01f1Tggf2UM_ZjQtx6i5uBSTYOwsfZ9tD93X6tU1URfi-zpvbZmK
### 2020.12.16 
更新expo 40
更新package.json

### APPLE DEVELOP DOCUMENT
https://developer.apple.com/library/archive/documentation/Cocaoa

### iOS configuration
Bare projects are initialized using CocoaPods, a dependency manager for iOS projects.

Run `npx pod-install` to link the native iOS packages using CocoaPods.

Run `npx react-native run-ios` to rebuild your project with the native code linked.


### ios Xcode 编译错误

1.Last step, you need to edit the `LIBRARY_SEARCH_PATHS` setting.
解决办法：https://stackoverflow.com/questions/63513765/react-native-error-on-deploy-app-to-xcode-directory-not-found-for-option-l
解决办法：https://github.com/react-native-community/upgrade-support/issues/13
![erere](https://user-images.githubusercontent.com/100233/76167794-d0815100-6182-11ea-915c-78ede6d554b9.png)

### bare workflow configure the expo-constant to build 
Optional: set up script to get app config
Optionally, you can set up a build script that will grab your app's config (from app.json or app.config.js) and embed it into your build. This will ensure Constants.manifest is defined on the first run of your app (before it has downloaded any OTA updates). If your app doesn't use Constants.manifest, you can skip this step.

To set up the script on iOS, add the following line to the Bundle React Native code and images Build Phase in your Xcode project:

../node_modules/expo-constants/scripts/get-app-config-ios.sh
To set up the script on Android, apply the following diff to android/app/build.gradle:

 apply from: "../../node_modules/react-native/react.gradle"
+apply from: "../../node_modules/expo-constants/scripts/get-app-config-android.gradle"
