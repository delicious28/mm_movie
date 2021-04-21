## 一个React Native开发的电影下载与播放平台

### 效果
<p align="center">
<img src="https://www.mmhh.life/2021/04/21/React-Native%E5%BC%80%E5%8F%91%E7%9A%84%E7%94%B5%E5%BD%B1%E4%B8%8B%E8%BD%BD%E4%B8%8E%E6%92%AD%E6%94%BE%E5%B9%B3%E5%8F%B0/S10421-17555013.png" width="75%">
</p>
<p align="center">
<img src="https://www.mmhh.life/2021/04/21/React-Native%E5%BC%80%E5%8F%91%E7%9A%84%E7%94%B5%E5%BD%B1%E4%B8%8B%E8%BD%BD%E4%B8%8E%E6%92%AD%E6%94%BE%E5%B9%B3%E5%8F%B0/S10421-17560083.png" width="75%">
</p>

### 关于电影下载

电影是通过aria2下载到服务器，下载时也是服务器实时获取aria2的进度返回的

### 关于播放

为了方便在电视机顶盒上播放，目前是通过手机自带播放器播放的。

不过 android代码里有接入过饺子视频组件（ https://github.com/Jzvd/JZVideo ），把注释的代码放开即可使用；

