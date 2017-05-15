webpackJsonp([37],{

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__answer__ = __webpack_require__(372);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnswerModule", function() { return AnswerModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AnswerModule = (function () {
    function AnswerModule() {
    }
    return AnswerModule;
}());
AnswerModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__answer__["a" /* AnswerPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__answer__["a" /* AnswerPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__answer__["a" /* AnswerPage */]
        ]
    })
], AnswerModule);

//# sourceMappingURL=answer.module.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_user_service__ = __webpack_require__(245);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnswerPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the Answer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var AnswerPage = (function () {
    function AnswerPage(http, navCtrl, navParams, ref, UserService) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ref = ref;
        this.UserService = UserService;
        this.tabanimate = false;
        this.old_scrollTop = 0;
        this.title = "回答";
        this.data = {};
        this.ishide = true;
        this._that = this;
        this._id = this.navParams.get("_id");
        this.getdata();
    }
    AnswerPage.prototype.getdata = function () {
        var _this = this;
        var url = "http://www.devonhello.com/chihu/answer_dec";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(url, "id=" + this._id, {
            headers: headers
        })
            .subscribe(function (res) {
            //alert(JSON.stringify(res.json()));
            _this.data = res.json()[0];
            _this.checkfork();
        });
    };
    AnswerPage.prototype.ionViewDidLoad = function () {
        this.content.enableJsScroll();
    };
    AnswerPage.prototype.openComments = function () {
        this.navCtrl.push('Comments');
    };
    AnswerPage.prototype.pushPersonPage = function (_id) {
        this.navCtrl.push('Person', {
            _id: _id
        });
    };
    AnswerPage.prototype.pushQuestionPage = function (_id) {
        this.navCtrl.push('Question', {
            _id: _id
        });
    };
    //检查是否已经关注
    AnswerPage.prototype.checkfork = function () {
        var _this = this;
        if (!this.UserService._user._id) {
            this.navCtrl.push('Login');
        }
        else {
            var url = "http://www.devonhello.com/chihu/checkfork";
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Headers */]();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            this.http.post(url, "uid=" + this.data['uid'] + "&id=" + this.UserService._user._id, {
                headers: headers
            })
                .subscribe(function (res) {
                //alert(JSON.stringify(res.json()));
                if (res.json().length == "0") {
                    _this.ishide = false;
                }
            });
        }
    };
    //关注
    AnswerPage.prototype.fork = function () {
        var _this = this;
        if (!this.UserService._user._id) {
            this.navCtrl.push('Login');
            return true;
        }
        if (this.ishide) {
            alert("已关注");
        }
        else {
            var url = "http://www.devonhello.com/chihu/forkuser";
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Headers */]();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            this.http.post(url, "uid=" + this.data['uid'] + "&id=" + this.UserService._user._id + "&name=" + this.UserService._user.name + "&uname=" + this.data['name'] + "&userimg=" + this.UserService._user.userimg + "&uuserimg=" + this.data['userimg'], {
                headers: headers
            })
                .subscribe(function (res) {
                //alert(JSON.stringify(res.json()));
                if (res.json()['result']['ok'] == 1) {
                    _this.ishide = true;
                    alert("关注成功");
                }
            });
        }
    };
    //感谢
    AnswerPage.prototype.thank = function () {
        if (!this.UserService._user._id) {
            this.navCtrl.push('Login');
            return true;
        }
        if (this.UserService._user._id == this.data['uid']) {
            alert("不能自己感谢自己");
            return true;
        }
        var url = "http://www.devonhello.com/chihu/thank";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(url, "uid=" + this.data['uid'] + "&id=" + this.UserService._user._id + "&name=" + this.UserService._user.name + "&type=0" + "&userimg=" + this.UserService._user.userimg + "&artid=" + this._id + "&title=" + this
            .data['title'], {
            headers: headers
        })
            .subscribe(function (res) {
            //alert(JSON.stringify(res.json()));
            if (res.json()['result']['ok'] == 1) {
                alert("感谢成功");
            }
        });
    };
    AnswerPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        if (scrollTop > 110 && (this.old_scrollTop - scrollTop) < 0) {
            if (!this.tabanimate) {
                this.tabanimate = true;
            }
        }
        else {
            this.tabanimate = false;
            if (scrollTop > 100) {
                this.title = this.data.title;
            }
            else {
                this.title = "回答";
            }
        }
        this.old_scrollTop = scrollTop;
        this.ref.detectChanges();
    };
    return AnswerPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Content */])
], AnswerPage.prototype, "content", void 0);
AnswerPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Component */])({
        selector: 'page-answer',template:/*ion-inline-start:"/Users/apple/Documents/ionic2/3.0.1/chihu/src/pages/answer/answer.html"*/'<!--\n  Generated template for the Answer page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border [class.animate]="tabanimate">\n\n    <ion-navbar color="bule">\n        <ion-title>{{title}}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only>\n              <ion-icon name="share"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-buttons end>\n            <button ion-button icon-only>\n              <ion-icon name="more"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content (ionScroll)="onScroll($event)">\n\n    <section class="dv_title">\n        <h2 (click)="pushQuestionPage( data.answerid );">{{data.title}}</h2>\n        <section class="user">\n            <img (click)="pushPersonPage(data.uid);" [src]="data.userimg" />\n            <section (click)="pushPersonPage(data.uid);" class="data">\n                <h4>{{data.name}}</h4>\n                <p>发布于：{{data.time}}</p>\n            </section>\n            <section [hidden]="ishide" class="fork" (click)="fork();">＋ 关注</section>\n            <section [hidden]="!ishide" class="fork nofork">＋ 关注</section>\n        </section>\n    </section>\n\n    <section class="dv_content">\n        <p>{{data.text}}</p>\n\n    </section>\n\n\n</ion-content>\n\n<ion-footer [class.footanimate]="tabanimate">\n    <ion-toolbar color=\'fff\'>\n        <div class="dv_f">\n            <ion-icon name="happy"></ion-icon>\n            赞同\n        </div>\n        <div class="dv_f">\n            <ion-icon name="sad"></ion-icon>\n            反对\n        </div>\n        <div class="dv_f">\n            <ion-icon name="star-outline"></ion-icon>\n            收藏\n            <!--star-->\n        </div>\n        <div class="dv_f" (click)="thank();">\n            <ion-icon name="heart-outline"></ion-icon>\n            感谢\n            <!--heart-->\n        </div>\n        <div class="dv_f" (click)="openComments();">\n            <ion-icon name="text"></ion-icon>\n            123\n        </div>\n    </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"/Users/apple/Documents/ionic2/3.0.1/chihu/src/pages/answer/answer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_3__service_user_service__["a" /* UserService */]])
], AnswerPage);

//# sourceMappingURL=answer.js.map

/***/ })

});
//# sourceMappingURL=37.main.js.map