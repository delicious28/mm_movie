package com.demo; // replace com.your-app-name with your app’s name

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.telephony.SubscriptionManager;
import android.telephony.TelephonyManager;
import android.webkit.MimeTypeMap;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Callback;

public class CalendarModule extends ReactContextBaseJavaModule {
    CalendarModule(ReactApplicationContext context) {
        super(context);
    }

    // add to CalendarModule.java
    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void show(String message, int duration, Callback callback) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
        callback.invoke("这个是callback");
    }

    @ReactMethod
    public void openPlayer(String url, String name) {

        Uri uri = Uri.parse(url);
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.setDataAndType(uri, "video/*");
        getReactApplicationContext().startActivity(intent);


//        String extension = MimeTypeMap.getFileExtensionFromUrl(url);
//        String mimeType = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
//        Intent mediaIntent = new Intent(getReactApplicationContext(),VideoPlayer.class);
//        mediaIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        mediaIntent.setDataAndType(Uri.parse(url), mimeType);
//        mediaIntent.putExtra("url",url);
//        mediaIntent.putExtra("name",name);
//        getReactApplicationContext().startActivity(mediaIntent);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP_MR1)
    @ReactMethod
    public void setDataEnabled(boolean enable) throws Exception {
        Context context = getReactApplicationContext();

        try {
            if (ActivityCompat.checkSelfPermission(context, Manifest.permission.MODIFY_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {

                Toast toast = Toast.makeText(getCurrentActivity(), "no permission", Toast.LENGTH_SHORT);
                toast.show();

                List<String> permissionList = new ArrayList<>();
                permissionList.add("android.permission.MODIFY_PHONE_STATE");
                ActivityCompat.requestPermissions(getCurrentActivity(), permissionList.toArray(new String[permissionList.size()]), 3);

                return;
            }
            int subid = SubscriptionManager.from(context).getActiveSubscriptionInfoForSimSlotIndex(0).getSubscriptionId();
            TelephonyManager telephonyService = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            Method setDataEnabled = telephonyService.getClass().getDeclaredMethod("setDataEnabled", int.class, boolean.class);
            if (null != setDataEnabled) {
                setDataEnabled.invoke(telephonyService, subid, enable);
            }
        }catch (Exception e)
        {
            e.printStackTrace();
        }
    }

}