package kr.rnapp.apptest;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Arrays;

import kr.rnapp.apptest.BuildConfig;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;

import com.microsoft.codepush.react.CodePush;
import com.airbnb.android.react.lottie.LottiePackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.dooboolab.kakaologins.RNKakaoLoginsPackage;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import com.PTR.IDFA.IDFAPackage;

import fr.bamlab.rnimageresizer.ImageResizerPackage;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.appsflyer.reactnative.RNAppsFlyerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.beefe.picker.PickerViewPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.bugsnag.BugsnagReactNative;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;

public class MainApplication extends NavigationApplication {
    private final ReactNativeHost mReactNativeHost = new NavigationReactNativeHost(this) {
        @javax.annotation.Nullable
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            packages.addAll(Arrays.<ReactPackage>asList(
                    new RNFirebasePackage(),
                    new RNFirebaseAnalyticsPackage(),
                    new RNFirebaseMessagingPackage(),
                    new RNFirebaseCrashlyticsPackage(),
                    new RNFirebaseInstanceIdPackage(),
                    new RNFirebaseLinksPackage(),
                    new RNFirebaseNotificationsPackage(),
                    new RNFirebaseRemoteConfigPackage(),
                    new LottiePackage(),
                    new CodePush(getString(R.string.reactNativeCodePush_androidDeploymentKey), MainApplication.this, getUseDeveloperSupport(),
                            R.string.CodePushPublicKey),
                    new RNFetchBlobPackage()
            ));
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        AppEventsLogger.activateApp(this);
    }
}