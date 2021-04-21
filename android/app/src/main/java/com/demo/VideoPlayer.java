package com.demo;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import cn.jzvd.Jzvd;
import cn.jzvd.JzvdStd;

public class VideoPlayer extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_player);
        Intent intent = getIntent();
        JzvdStd jzvdStd = (JzvdStd) findViewById(R.id.jz_video);
        jzvdStd.reset();
//        Toast toast = Toast.makeText(this.getApplication(), "oncreate", Toast.LENGTH_SHORT);
//        toast.show();

        jzvdStd.setUp(intent.getStringExtra("url")
                , intent.getStringExtra("title"));

        jzvdStd.startPreloading(); //开始预加载，加载完等待播放
        jzvdStd.startVideoAfterPreloading(); //如果预加载完会开始播放，如果未加载则开始加载
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
//        Toast toast = Toast.makeText(this.getApplication(), "onDestroy", Toast.LENGTH_SHORT);
//        toast.show();
        JzvdStd.releaseAllVideos();//在销毁活动时，关闭饺子视频
    }

    @Override
    public void onBackPressed() {
        if (Jzvd.backPress()) {
            return;
        }
        super.onBackPressed();
    }
    @Override
    protected void onPause() {
        super.onPause();
        Jzvd.releaseAllVideos();
    }
}