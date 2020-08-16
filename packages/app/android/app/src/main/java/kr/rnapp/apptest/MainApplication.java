package kr.rnapp.apptest;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;
import java.util.Arrays;

import kr.rnapp.apptest.BuildConfig;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;

import com.microsoft.codepush.react.CodePush;
import com.airbnb.android.react.lottie.LottiePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import androidx.multidex.MultiDex;

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
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }
}