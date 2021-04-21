import Aria2 from 'aria2';

var aria2 = new Aria2({
  host: 'mmhh.i234.me',
  port: 6800,
  secure: false,
  secret: '',
  path: '/jsonrpc'
});

aria2
  .open()
  .then(() => {
  })
  .catch(err => console.log("error", err));

  function Thunderdecode(url) {
    url=url.replace('thunder://','');
    var thunderUrl=decode64(url);
    thunderUrl=thunderUrl.substr(2,thunderUrl.length-4);
    return thunderUrl;
 }

 async function AddUri(magnet,callback) {
    magnet = magnet.replace('"','').replace('"','');
    var url = '';
    if(magnet.indexOf('magnet')==0){
      url=magnet;
    }
    else if(magnet.indexOf('thunder')==0){
      url = Thunderdecode(magnet)
    }
    else
    {
      alert('此格式无法自动下载')
    }

    if(url){
      var guid = await aria2.call("addUri", [url], { dir: "/data/film/" });
      if(guid){
        callback();
      }
    }

  }

  export default AddUri;