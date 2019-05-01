package io.example.app;

import android.content.Context;

import com.bugsnag.BugsnagReactNative;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import org.reactnative.camera.RNCameraPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.keychain.KeychainPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import org.pentarex.rngallerymanager.RNGalleryManagerPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import io.example.app.BuildConfig;
import io.example.app.R;
import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.appsflyer.reactnative.RNAppsFlyerPackage;
import android.support.multidex.MultiDex;
import iyegoroff.RNColorMatrixImageFilters.ColorMatrixImageFiltersPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  @Override
  protected ReactGateway createReactGateway() {
    ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
      @javax.annotation.Nullable
      @Override
      protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
      }

    };
    return new ReactGateway(this, isDebug(), host);
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
            new RNDeviceInfo(),
            new PickerPackage(),
            new RNFetchBlobPackage(),
            new KeychainPackage(),
            new SplashScreenReactPackage(),
            new RNCameraPackage(),
            new FastImageViewPackage(),
            new RNGalleryManagerPackage(),
            new LottiePackage(),
            new ImageResizerPackage(),
            new CodePush(getString(R.string.reactNativeCodePush_androidDeploymentKey), MainApplication.this, isDebug(),
                    R.string.CodePushPublicKey),
            BugsnagReactNative.getPackage(),
            new RNAppsFlyerPackage(MainApplication.this),
            new RNFirebasePackage(),
            new RNFirebaseAnalyticsPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNFirebaseCrashlyticsPackage(),
            new LinearGradientPackage(),
            new RNKakaoLoginsPackage(),
            new ColorMatrixImageFiltersPackage()
    );
  }
}
