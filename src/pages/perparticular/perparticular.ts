import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../service/user.service';
import { Headers, Http } from '@angular/http';

/**
 * Generated class for the Perparticular page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-perparticular',
  templateUrl: 'perparticular.html',
})
export class Perparticular {

  user: any = {}
  ishide: boolean = false;
  isme: boolean = true;
  _id;

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public UserService: UserService) {
    this.user = this.UserService._user;
    if (this.navParams.data._id) {
      this._id = this.navParams.data._id;
      this.isme = false;
      this.checkfork();
    } else {
      this._id = this.UserService._user._id;
    }
    this.getdata();
  }

  getdata() {

    let url = "http://www.devonhello.com/chihu/getuserdata";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this._id, {
      headers: headers
    })
      .subscribe((res) => {
        this.user = res.json()[0];
      });
  }

  //检查是否已经关注
  checkfork() {

    let url = "http://www.devonhello.com/chihu/checkfork";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "uid=" + this._id + "&id=" + this.UserService._user._id, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        if (res.json().length != "0") {
          this.ishide = true;
        }
      });
  }

  //关注
  fork() {

    if (!this.UserService._user._id) {
      this.navCtrl.push('Login');
      return true;
    }

    if (this.ishide) {
      alert("已关注");
    } else {
      let url = "http://www.devonhello.com/chihu/forkuser";

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.post(url, "uid=" + this._id + "&id=" + this.UserService._user._id + "&name=" + this.UserService._user.name + "&uname=" + this.user['name'] + "&userimg=" + this.UserService._user.userimg + "&uuserimg=" + this.user['userimg'], {
        headers: headers
      })
        .subscribe((res) => {
          //alert(JSON.stringify(res.json()));
          if (res.json()['result']['ok'] == 1) {
            this.ishide = true;
            alert("关注成功");
          }
        });
    }

  }

  //取消关注
  disfork() {

  }

}
