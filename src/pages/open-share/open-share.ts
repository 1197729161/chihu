import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { UserService } from '../../service/user.service';

/**
 * Generated class for the OpenShare page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var PhotoSwipe: any;
declare var PhotoSwipeUI_Default: any;
@IonicPage()
@Component({
  selector: 'page-open-share',
  templateUrl: 'open-share.html',
})
export class OpenShare {

  @ViewChild(Content) content: Content;

  title = '';
  tabanimate: boolean = false;
  _that;
  gallery: any = null;
  pswpElement: any = null;
  data: any = {
    _id: '',
    uid: '',
    name: '',
    userimg: '',
    time: '',
    mark: { like: 0, cont: 0 },
    img: [

    ],
    text: ''
  };
  _id;

  constructor(public plt: Platform, public http: Http, public navCtrl: NavController, public navParams: NavParams, public ref: ChangeDetectorRef, public UserService: UserService) {
    this._that = this;
    this._id = this.navParams.get('_id');
    this.getdata();
    
  }

  getdata() {
    let url = "http://www.devonhello.com/chihu/share_dec";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this._id, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.data = res.json()[0];
        this.title = res.json()[0]['name'] + ' 分享了心情'
      });
  }

  //点赞
  like(){
    if (!this.UserService._user._id) {
      this.navCtrl.push('Login');
      return true;
    }
    if (this.UserService._user._id == this.data['uid']) {
      alert("不能自己感谢自己");
      return true;
    }
    
    let url = "http://www.devonhello.com/chihu/thank";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "uid="+this.data['uid']+"&id="+this._id+"&name="+this.UserService._user.name+"&type=2"+"&userimg="+this.UserService._user.userimg+"&artid="+this.data['_id']+"&title="+this
    .data['text'], {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        if(res.json()['result']['ok']==1){
          alert("感谢成功");
        }
      });
  }

  //点击图片查看
  pswpElementInit(ind) {
    
    if (this.pswpElement == null) {
      this.pswpElement = document.querySelectorAll('.pswp')[0];
    }
    var _that = this;

    // define options (if needed)
    var options = {
      // optionName: 'option value'
      // for example:
      index: ind * 1 // start at first slide
    };

    var items: any = [];

    var len = this.data.img.length;

    for (var i = 0; i < len; i++) {
      var objs = {};
      objs["src"] = this.data["img"][i]["src"];
      objs["w"] = this.data["img"][i]["width"];
      objs["h"] = this.data["img"][i]["height"];
      objs["title"] = this.data["text"];
      items.push(objs);
    }

    // Initializes and opens PhotoSwipe
    this.gallery = new PhotoSwipe(this.pswpElement, PhotoSwipeUI_Default, items, options);
    this.gallery.listen('close', function () {
      if(_that.UserService.isopenimg){
        _that.UserService.isopenimg = false;
      }
    });
    this.gallery.init();
    this.UserService.galleryOBJ = this.gallery;
    this.UserService.isopenimg = true;
  }

  ionViewDidLoad() {
    this.content.enableJsScroll();
  }

  onScroll($event: any) {

    let scrollTop = $event.scrollTop;

    if (scrollTop > 250) {
      if (!this.tabanimate) {
        this.tabanimate = true;
      }

    } else {
      this.tabanimate = false;
    }

    this.ref.detectChanges();
  }

  ionViewDidLeave(){
    this.plt.registerBackButtonAction(():any =>{
        return this.navCtrl.pop();
    },0)
  }

}
