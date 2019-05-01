package io.example.app;

import android.annotation.TargetApi;
import android.os.Build;

import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;

import android.os.Bundle;
import javax.annotation.Nullable;
import android.support.annotation.NonNull;
import android.webkit.WebView;

import org.devio.rn.splashscreen.SplashScreen;
import com.reactnativenavigation.NavigationActivity;
import com.reactnativenavigation.utils.CommandListenerAdapter;
import com.reactnativenavigation.viewcontrollers.navigator.Navigator;

import io.example.app.BuildConfig;
import io.example.app.R;

public class MainActivity extends NavigationActivity implements PermissionAwareActivity {
    @Nullable
    private PermissionListener permissionListener;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, R.style.SplashScreenTheme);
        super.onCreate(savedInstanceState);

        if (BuildConfig.DEBUG && Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
    }

    @TargetApi(Build.VERSION_CODES.M)
    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
        permissionListener = listener;
        requestPermissions(permissions, requestCode);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (permissionListener != null) {
            permissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        Navigator navigator = getNavigator();
        if (!navigator.handleBack(new CommandListenerAdapter())) {
            super.onBackPressed();
            moveTaskToBack(true);
        }
    }
}
