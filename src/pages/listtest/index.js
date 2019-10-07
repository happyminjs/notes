import './index.less';
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

  var __WEBPACK_AMD_DEFINE_RESULT__;/**
  * @module cookie
  * @description cookie操作封装
  */
 !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
     var defaultOpts = {
         expiresDay: 30,
         path: '/',
         domain: '.58.com'
     };
 
     function trim(str) {
         if (typeof String.prototype.trim === 'function') {
             return String.prototype.trim.call(str);
         } else {
             return str.replace(/^\s+(.*?)\s+$/g, '$1');
         }
     }
 
     var cookie =  /** @alias module:cookie*/ {
         /**
          * @alias module:cookie.get
          * @description 从cookie中获取名字为name的cookie值返回的值。
          * @param {String} name cookie的名字
          * @param {Boolean} decode 返回的cookie值是否需要解码，默认为true
          * @return {String} 返回的cookie值,默认是解码后的值，如果decode传false，返回没有解码的原始值;如果不存在返回null
          * @example
          * var val = cookie.get('ipcity');//bj|北京
          * var val = cookie.get('ipcity',false);//bj%7C%u5317%u4EAC
          */
         get: function(name, decode) {
             decode = (decode === false) ? false : true;
             var cookieValue = null;
             if (!name) {
                 return cookievalue;
             }
             //cookieNameLen:name+'='
             var cookieNameLen = name.length + 1;
             var strCookie = document.cookie;
             if (strCookie) {
                 var arrCookies = strCookie.split(';');
                 for (var i = 0, len = arrCookies.length; i < len; i++) {
                     var cookie = trim(arrCookies[i]);
                     if (cookie.substring(0, cookieNameLen) == (name + '=')) {
                         cookieValue = cookie.substring(cookieNameLen);
                         cookieValue = decode ? decodeURIComponent(cookieValue) : cookieValue;
                         break;
                     }
                 }
             }
             return cookieValue;
         },
         /**
          * @alias module:cookie.getname
          * @description 从cookie中获取名字为cookie_name的值中，通过&分割的名字name为属性值(这是个xx方法，不应该出现在cookie的方法中，应该是业务自己的事情，但是为了兼容老版本而保留)。
          * @param {String} cookie_name cookie的名字
          * @param {String} name 查找的属性名
          * @return {String} 返回符合要求的值
          * @example
          * var val = cookie.get('www58com');//"AutoLogin=false&UserID=22681205356295&UserName=qfwrw_f1&CityID=0&Email=&AllMsgTotal=0&CommentReadTotal=0&CommentUnReadTotal=0&MsgReadTotal=0&MsgUnReadTotal=0&RequireFriendReadTotal=0&RequireFriendUnReadTotal=0&SystemReadTotal=0&SystemUnReadTotal=0&UserCredit=0&UserScore=0&PurviewID=&IsAgency=false&Agencys=null&SiteKey=4E2D7FDC8FC5457587CDB008DB2CEE0FB5D2DC3B57E5C80AA&Phone=&WltUrl=&UserLoginVer=7A8AA9BF524FE05479145A84EF148AE27&LT=1440728380496"
          * var val2 = cookie.getname('www58com','UserID');//22681205356295
          *
          */
         getname: function(cookie_name, name) {
             var cookie_val = this.get(cookie_name);
             if (!cookie_val) {
                 return '';
             }
             var regex = new RegExp("[?&]" + encodeURIComponent(name) + "\\=([^&#]+)");
             var value = (cookie_val.match(regex) || ["", ""])[1];
             return decodeURIComponent(value);
         },
         /**
          * @alias module:cookie.set
          * @description 设置cookie。
          * @param {String} name cookie的名字
          * @param {String} value cookie的值
          * @param {Date | Number} expires cookie的过期时间，可以传一个数字，表示多少天后过期；如果穿一个Date类的值，过期时间设置为该值；如果不传采用默认过期时间,传null时设置为''
          * @param {String} path cookie的路径值，如果不传采用默认path，传null时设置为''
          * @param {String} domain cookie的域名，如果不传采用默认domain，传null时设置为''
          * @param {Boolean} secure cookie是否设置为安全，值为true是，设置secure值，否则为''
          *
          * @example
          * cookie.set('test','123');//设置一个名字为test值为123的cookie，域名，path和过期时间都是采用默认的值
          * cookie.set('test','aaa',10);//设置一个10天后过期的cookie值
          * cookie.set('test','bbb',10,'/xxx/','m.58.com');//在m.58.com域名的/xxx/路径下设置名字为test，值为bbb，过期时间为10天的cookie
          */
         set: function(name, value, expires, path, domain, secure) {
             var undef;
             //过期时间设置
             if (value === null) {
                 value = '';
                 expires = -1; //过期日期设为前一天
             } else if (expires === undef) {
                 expires = defaultOpts.expiresDay; //当没提供过期时间时，采用缺省过期时间
             }
             var setExpires = '';
             //如果过期时间是null或'',则cookie设置的过期时间为空，即设置session性质cookie
             if (expires) {
                 var date;
                 if (typeof expires === 'number') {
                     date = new Date();
                     date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
                 } else if (expires.toUTCString) {
                     date = expires;
                 }
                 setExpires = '; expires=' + date.toUTCString();
             }
 
             //path没传时，采用默认path设置；如果传null置''
             var path = (path === undef) ? defaultOpts.path : path;
             var setPath = path ? "; path=" + path : '';
 
             //domain没传时，采用默认domain设置；如果传null置''
             domain = (domain === undef) ? defaultOpts.domain : domain;
             var setDomain = domain ? "; domain=" + domain : '';
 
             //secure
             var setSecure = (secure === true) ? "; secure" : '';
             document.cookie = [name, '=', encodeURIComponent(value), setExpires, setPath, setDomain, setSecure].join('');
         },
         /**
          * @alias module:cookie.remove
          * @description 清除名字为name的cookie。
          * @param {String} name cookie的名字
          * @example
          * cookie.set('test','123');//设置一个名字为test值为123的cookie，域名，path和过期时间都是采用默认的值
          * cookie.remove('test');//清除test cookie
          * cookie.get('test');//null
          */
         remove: function(name) {
             this.set(name, "", new Date(1970, 1, 1));
         }
     };
 
     $.cookie = cookie;
 
     return cookie;
 
 }).call(exports, __webpack_require__, exports, module),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 1 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
   comment: jsonf4fe 进行统一处理模块 
 */
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
   var feCfg = ____json4fe,config = {};
   if (feCfg.locallist) {
     var city,locallist;
     if ($.isArray(feCfg.locallist)) {
       city = feCfg.locallist[0];
       locallist = feCfg.locallist;
     } else {
       city = feCfg.locallist;
       locallist = [city];
     }
     config.city = city;
     config.locallist = locallist;
   }
   if (feCfg.catentry) {
     var rootcate, cate, catelist;
     if ($.isArray(feCfg.catentry)) {
       cate = feCfg.catentry[feCfg.catentry.length - 1];
       catelist = feCfg.catentry;
     } else {
       cate = feCfg.catentry;
       catelist = [cate];
     }
     if (feCfg.rootcatentry) {
       catelist.unshift(feCfg.rootcatentry);
     }
     rootcate = catelist[0];
     config.rootcate = rootcate;
     config.cate = cate;
     config.catelist = catelist;
   }
   
   var g = feCfg.modules,
     f = g == "home" || g == "homepage",
     e = g == "list" || g == "listpage",
     d = g == "final" || g == "finalpage",
     n = g == "my" || g == "mypage",
     k = g == "post" || g == "postpage";
   config.j = feCfg;
   config.isHome = g == "home" || g == "homepage";
   config.isList = g == "list" || g == "listpage";
   config.isFinal = g == "final" || g == "finalpage";
   config.isMy = g == "my" || g == "mypage";
   config.isPost = g == "post" || g == "postpage";
 
   return config;
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 2 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
     comment: 图片懒加载
 */
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
 
     function lazyImg() {
         this.smallSlide = null;
         this.threshold = 0;
     }
 
     lazyImg.prototype = {
         init: function() {
             var that = this, smallContainer = $('.house-content .ui-slider-item img');
 
             //滚动时, 可视区域预加载前两张图片
             $(window).on('scroll', function() {
                 that.showImg(smallContainer);
             });
             //初始化, 可视区域预加载前两张图片
             that.smallSlide = that.showImg(smallContainer);
         },
         inView: function(el) {
             var that = this, smallSlide = "", winTop = $(window).scrollTop(), winHeight = $(window).height(), winBottom = winTop + winHeight + 500;
 
             var elmTop = $(el).offset().top, eleHeight = $(el).height();
             //当 winTop <= eleTop <= winBottom, 认为obj在窗口内
             var flag = (elmTop + eleHeight >= winTop - that.threshold) && (winBottom + that.threshold >= elmTop);
             //可视范围&&加载没有加载过且不重新加载已经加载过的
             return flag;    
         },
         showImg: function(smallContainer) {
             var that = this;
             for (var i = 0; i < smallContainer.length; i++) {
                 if (that.inView(smallContainer[i]) && !that.isDeal(smallContainer[i])) {
                     that.setSrc(smallContainer[i]);
                 }
             }
         },
         isDeal: function(el) {
             return $(el).attr('src') === $(el).attr('data-src');
         },
         setSrc: function(el) {
             var imgSrc = $(el).attr('data-src');
             if (imgSrc) {
                 $(el).attr('src', imgSrc);
             }
         }
     }
     var lazy = new lazyImg;
     lazy.init();
     return lazy;
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 3 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
     __webpack_require__(6),
       __webpack_require__(15),
       __webpack_require__(2),
       __webpack_require__(13),
       __webpack_require__(14),
       __webpack_require__(4),
       __webpack_require__(18),
       __webpack_require__(19),
     __webpack_require__(21),
     __webpack_require__(22)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (house_list_filter_apartment,
       house_list_slide_more,
       house_list_apartment_lazy_img,
       house_list_apartment_banner,
       house_list_apartment_search,
       house_list_rangle_slider_init,
       house_gy_city_list,
       house_load_slide_img,
     list_order_modal
 ) {}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 4 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * comment: 价格范围区间选择-调用
 */
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(jRange) {
 
     setTimeout(function () {
     $('.range-slider').jRange({
         from: 0,
         to: 8100,
         step: 100,
         format: '%s',
         width: 200,
         showLabels: true,
         isRange : true
     });
     }, 500);
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 5 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
    comment: 价格范围区间选择
 */
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    $(function() {
 
     var jRange = function(node, options) {
       this.defaults = {
         onstatechange: function() {},
         isRange: false,
         showLabels: true,
         showScale: true,
         step: 100,
         format: '%s',
         theme: 'theme-green',
         width: 200,
         disable: false
       };
       this.template = '<div class="slider-container">\
         <div class="back-bar">\
                   <div class="selected-bar"></div>\
                   <div class="pointer low" tongji_tag="fcm_gylist_price_first"></div><div class="pointer-label low-label no-lumit">0</div>\
                   <div class="pointer high" tongji_tag="fcm_gylist_price_last"></div><div class="pointer-label high-label no-lumit">不限</div>\
                   <div class="clickable-dummy"></div>\
               </div>\
               <div class="scale"></div>\
       </div>';
             this.options = $.extend({}, this.defaults, options);
       this.inputNode = $(node);
       this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + ',' + this.options.from : this.options.from);
       this.domNode = $(this.template);
       this.domNode.addClass(this.options.theme);
       this.inputNode.after(this.domNode);
       this.domNode.on('change', this.onChange);
       this.pointers = $('.pointer', this.domNode);
       this.lowPointer = this.pointers.first();
       this.highPointer = this.pointers.last();
       //this.labels = $('.pointer-label', this.domNode);
       //this.lowLabel = this.labels.first();
       //this.highLabel = this.labels.last();
       this.bar = $('.selected-bar', this.domNode);
       this.clickableBar = this.domNode.find('.clickable-dummy');
       this.interval = this.options.to - this.options.from;
     };
     jRange.prototype = {
       init: function() {
         var _this = this;
         _this.render();
       },
       render: function() {
         var _this = this;
         if (_this.inputNode.width() === 0 && !_this.options.width) {
           return;
         } else {
           _this.domNode.width(this.options.width || _this.inputNode.width());
           _this.inputNode.hide();
         }
 
         /*if (!_this.options.showLabels) {
           _this.labels.hide();
         }*/
         _this.attachEvents();
       },
       attachEvents: function() {
         var _this = this;
         _this.clickableBar.click($.proxy(_this.barClicked, _this));
         this.pointers.on('mousedown touchstart', $.proxy(this.onDragStart, this));
       },
       onDragStart: function(e) {
 
         var _this = this;
         if ( _this.options.disable || (e.type === 'mousedown' && e.which !== 1)) {
           return;
         }
         e.stopPropagation();
         e.preventDefault();
         var pointer = $(e.target);
         _this.pointers.removeClass('last-active');
         pointer.addClass('focused last-active');
         //_this[(pointer.hasClass('low') ? 'low' : 'high') + 'Label'].addClass('focused');
         _this.pointers.on('mousemove.slider touchmove.slider', $.proxy(_this.onDragMove, _this, pointer));
         _this.pointers.on('mouseup.slider touchend.slider touchcancel.slider', $.proxy(_this.onDragEnd, _this));
       },
       onDragMove: function(pointer, e) {
 
         var _this = this;
         e.stopPropagation();
         e.preventDefault();
 
         if (e.targetTouches && e.targetTouches.length) {
           e = e.targetTouches[0];
         } 
         var position = e.clientX - _this.domNode.offset().left;
         _this.domNode.trigger('change', [_this, pointer, position]);
       },
       onDragEnd: function(e) {
         var _this = this;
         _this.pointers.removeClass('focused');
         //_this.labels.removeClass('focused');
         _this.pointers.off(".slider");
       },
       barClicked: function(e) {
         var _this = this;
                 _this.removeActive();
         if(_this.options.disable) return;
         var x = e.pageX - _this.clickableBar.offset().left;
         var pointer = Math.abs(parseInt(_this.pointers.first().css('left'), 10) - x + _this.pointers.first().width() / 2) < Math.abs(parseInt(_this.pointers.last().css('left'), 10) - x + _this.pointers.first().width() / 2) ?
           _this.pointers.first() : _this.pointers.last();
         _this.setPosition(pointer, x, true, true);
       },
       onChange: function(e, self, pointer, position) {
         self.removeActive();
         self.setValue(self.options.value);	
         var min = pointer.hasClass('high') ? self.lowPointer.position().left + self.lowPointer.width() / 2 : 0;
         var max = pointer.hasClass('low') ? self.highPointer.position().left + self.highPointer.width() / 2 : self.domNode.width();
         var value = Math.min(Math.max(position, min), max);
                 if((value == min && value != 0)||(max == 200 && value <=100) ) {
                     value = self.valuesToPrc([min,self.positionToValue(value)+100])[1];
                     self.setPosition(pointer, value);
         }else if(value == max && value != 200){
                     value = self.valuesToPrc([self.positionToValue(value)-100,max])[0];
                     self.setPosition(pointer, value);
         }else {
                     self.setPosition(pointer, value, true);
         }
       },
       setPosition: function(pointer, position, isPx, animate) {
         var _this = this;
         var leftPos,
           lowPos = _this.lowPointer.position().left,
           highPos = _this.highPointer.position().left,
           circleWidth = _this.highPointer.width() / 2;
         if (!isPx) {
           position = _this.prcToPx(position);
         }
         if (pointer[0] === _this.highPointer[0]) {
           highPos = Math.round(position - circleWidth);
         } else {
           lowPos = Math.round(position - circleWidth);
         }
         pointer[animate ? 'animate' : 'css']({
           'left': Math.round(position - circleWidth)
         });
 
         leftPos = lowPos + circleWidth;
 
         _this.bar[animate ? 'animate' : 'css']({
           'width': Math.round(highPos + circleWidth - leftPos),
           'left': leftPos
         });
         _this.showPointerValue(pointer, position, animate);
         _this.isReadonly();
       },
       setValue: function(value) {
         var _this = this;
         var values = value.toString().split(',');
         //_this.options.value = value;
         var prc = _this.valuesToPrc(values.length === 2 ? values : [0, values[0]]);
         _this.setPosition(_this.lowPointer, prc[0]);
         _this.setPosition(_this.highPointer, prc[1]);
       },
       getBarWidth: function() {
         var _this = this;
         var values = _this.options.value.split(',');
         if (values.length > 1) {
           return parseInt(values[1], 10) - parseInt(values[0], 10);
         } else {
           return parseInt(values[0], 10);
         }
       },
       showPointerValue: function(pointer, position, animate) {
         var _this = this;
         var label = $('.pointer-label', _this.domNode)[pointer.hasClass('low') ? 'first' : 'last']();
         var text = "", value = _this.positionToValue(position);
         if ($.isFunction(_this.options.format)) {
           var type = _this.isSingle() ? undefined : (pointer.hasClass('low') ? 'low' : 'high');
           text = _this.options.format(value, type);
         } else {
           if (value == "8100" || isNaN(value)) {
             value = "不限";
           }
           text = _this.options.format.replace('%s', value);
         }
                 (text == "不限") ? label.removeClass("no-lumit") : label.addClass("no-lumit");
 
         var width = label.html(text).width(),
           left = position - width / 2;
         left = Math.min(Math.max(left, 0), _this.options.width - width);
         /*label[animate ? 'animate' : 'css']({
           left: left
         });*/
         _this.setInputValue(pointer, value);
       },
       valuesToPrc: function(values) {
         var _this = this;
         var lowPrc = ((values[0] - _this.options.from) * 100 / _this.interval),
           highPrc = ((values[1] - _this.options.from) * 100 / _this.interval);
         return [lowPrc, highPrc];
       },
       prcToPx: function(prc) {
         var _this = this;
         return (_this.domNode.width() * prc) / 100;
       },
       positionToValue: function(pos) {
         var _this = this;
         var value = (pos / _this.domNode.width()) * _this.interval;
         
         value = value + _this.options.from;
         return Math.round(value / _this.options.step) * _this.options.step;
       },
       setInputValue: function(pointer, v) {
         var _this = this;
         // if(!isChanged) return;
 
         var values = _this.options.value.split(',');
         if (pointer.hasClass('low')) {
           _this.options.value = v + ',' + values[1];
         } else {
           _this.options.value = values[0] + ',' + v;
         }
 
         if (_this.inputNode.val() !== _this.options.value) {
           _this.inputNode.val(_this.options.value);
           _this.options.onstatechange.call(_this, _this.options.value);
         }
       },
       getValue: function() {
         var _this = this;
         return _this.options.value;
       },
       isReadonly: function(){
         var _this = this;
         _this.domNode.toggleClass('slider-readonly', _this.options.disable);
       },
       disable: function(){
         var _this = this;
         _this.options.disable = true;
         _this.isReadonly();
       },
       enable: function(){
         var _this = this;
         _this.options.disable = false;
         _this.isReadonly();
       },
       toggleDisable: function(){
         var _this = this;
         _this.options.disable = !_this.options.disable;
         _this.isReadonly();
       },
       removeActive:function(){
                 $('.f-box-rent .box-li.active').removeClass('active');
       }
     };
 
     var pluginName = 'jRange';
     $.fn[pluginName] = function(option) {
       var args = arguments;
 
       this.each(function() {
         var $this = $(this),
         options = typeof option === 'object' && option;
         // data = new jRange($this, options);
         // data.init();
                 window.jRange = new jRange($this, options);
                 window.jRange.init();
       });
 
       return this;
     };
 
   });
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 6 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  comment: 品质公寓列表筛选
  */
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(8), __webpack_require__(1), __webpack_require__(9), __webpack_require__(0), __webpack_require__(11), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (FastClick, fx, j4fe, loc_lat_lon, cookie, util, throttle) {
 
     new FastClick(document.getElementById('nav-filter'));
     new FastClick(document.getElementById('mask'));
 
     function listFilter() {
         this.navFilter = $("#nav-filter");
         this.mask = $("#mask");
         this.houseFilter = $(".house-filter");
         this.fBox = this.houseFilter.find(".f-box");
         this.objCity = localStorage.getItem("myCityName");
         this.objL = localStorage.getItem("myCity");
         this.listN = j4fe.city.name;
         this.lname = j4fe.cate.listname;
         this.cityListname = j4fe.city.listname;
         this.msgBox = $(".msgBox");
         this.inputNum = $(".input-num");
         this.isCheckedFlag = $("#checkboxFLag");
         this._top = this.navFilter.offset().top;
         this.boxLocation = $(".f-box-location");
         this.houseRecord = $(".house-record");
         this.rentOwnBtn = $('.rent-own');
         this.rentTogetherBtn = $('.rent-together');
         this.rentRoomNum = $('.rent-room-num');
         this.rentRoomPrefer = $('.rent-room-prefer');
         this.clearMoreBtn = $('.btn-more-clear');
         this.filterRecord = 'apartmentListFilterRecord';
     }
 
     listFilter.prototype = {
         init: function () {
             var _this = this;
             //判断是否能获取到地理位置
             navigator.geolocation.getCurrentPosition(function () {
                 //如果获取，显示附近选项
                 $('.f-box-location .box-panel-1 .box-ul li:first-child').removeClass('hide');
             }, function () {
             }, {
                     timeout: 5000,
                 })
 
             //位置记录处理
             if (localStorage.getItem(_this.filterRecord)) {
                 _this.boxLocation.css({ 'margin-top': '1.066667rem' });
                 var apartmentListFilterRecord = JSON.parse(localStorage.getItem(_this.filterRecord));
                 var str = '<span class="house-record-title">记录 |</span>';
                 apartmentListFilterRecord.forEach(function (item, index, array) {
                     str += '<a class="house-record-items" href="' + item[1] + '">' + item[0] + '</a>'
                 });
                 $('.house-record').html(str);
             } else {
                 _this.houseRecord.hide();
             }
 
             _this.navFilter.on("click", "li", function (e) {
 
                 e.preventDefault();
                 var obj = $(this), index = obj.index();
                 //隐藏
                 if (obj.hasClass('icon-arrow-up')) {
                     setTimeout(function () {
                         _this.close(e);
                     }, 400);
                     return;
                 }
 
                 //显示
                 obj.addClass("icon-arrow-up").siblings().removeClass("icon-arrow-up");
                 _this.houseFilter.removeClass("hide");
                 _this.fBox.addClass("hide");
                 _this.fBox.eq(index).removeClass("hide");
                 _this.houseFilter.removeClass("hide");
                 _this.mask.show();
                 _this.addFixed();
 
                 //租金拖动条与当前选中区间同步
                 if (_this.getUrlParam("gongyu_minprice")) {
                     var url_gongyu_minprice = _this.getUrlParam("gongyu_minprice").split('_');
                     if (url_gongyu_minprice[1] > 8100) {
                         url_gongyu_minprice[1] = 8100
                     }
                     window.jRange.setValue(url_gongyu_minprice.join())
                 } else {
                     window.jRange.setValue('0,8100')
                 }
 
                 //租金选择器“不限”处理
                 var labelClass = $(".high-label"), highText = labelClass.text();
                 (highText == "不限") ? labelClass.removeClass("no-lumit") : labelClass.addClass("no-lumit");
             });
             _this.navFilter.on('touchstart, touchmove', function (e) {
                 e.stopPropagation();
                 e.preventDefault();
                 return false;
             });
             //阻止默认事件
             _this.mask.on('click, touchstart, touchmove', function (e) {
                 e.stopPropagation();
                 e.preventDefault();
                 return false;
             });
             _this.houseFilter.on('touchstart, touchmove', function (e) {
                 e.stopPropagation();
                 e.preventDefault();
                 return false;
             });
             _this.mask.on('click', function (e) {
                 setTimeout(function () {
                     _this.close(e);
                     // _this.isSafariTypeStyle();
                 }, 400)
             });
 
             //room-zufangjie
             if ($(".room-zufangjie").length == 0) {
                 $(".f-box-inner .box-ul .room-type").css({ "margin-bottom": "1.8rem" });
             }
 
             //非当前城市，不需要显示“附近” 筛选项
             var mcityCookie = $.cookie.get("mcity"), appCityCookie = $.cookie.get("city");
             mcityCookie = mcityCookie == null ? appCityCookie : mcityCookie;
             var j4feListname = j4fe.city.listname;
             if (mcityCookie != j4feListname && mcityCookie != null) {
                 $("#nearbyId").addClass("hide");
             }
             if (mcityCookie == null) {
                 $("#nearbyId").addClass("hide");
             }
 
             //初始化事件
             _this.docSwipe();
             _this.rentTypeEvent();
             _this.clearMore();
             _this.fBox.each(function (e) {
                 var obj = $(this), index = obj.index();
                 //滑动
                 _this.conSwipe(index);
 
                 switch (index) {
                     case 0:
                         _this.locationMenu(obj);
 
                         break;
                     case 1:
                         _this.getRent(obj);
                         break;
                     case 2:
                         _this.getHouseRoom(obj);
                         break;
                     case 3:
                         _this.getMore(obj);
                         break;
                     default:
                         break;
                 }
             })
         },
         getHouseRoom: function (obj) {//处理厅室的二级菜单交互
             obj.find(".box-panel-1 .box-ul li").on("click", function () {
                 $(this).siblings().removeClass("active");
                 $(this).addClass("active");
                 if ($(this).hasClass("zhengzuBtn")) {//判断点击的是整租选项
                     $(".tingShi").removeClass("hide");
                 } else {//点击的是不限或者是合租
                     $(".tingShi").addClass("hide");
                 }
             })
         },
         locationMenu: function (obj) {
             var _this = this, o = "", oIndex = "", locAction = $(".box-panel-1 .box-ul .active");
             //位置默认展开区域二级, 初始化
             var typeIndex = locAction.attr("data-searchtype");
             if (typeIndex == 2) {
                 _this.getArea(obj, locAction);
             } else if (typeIndex == 3) {
                 _this.getSubway(obj, locAction);
             }
             //一级
             obj.find(".box-panel-1 .box-ul li").on("click", function () {
                 o = $(this), oIndex = o.index(), thisClass = o.parent().attr("class");
                 //二级无三级时，则跳出，此为附近
                 if (thisClass == "box-ul box-nav-nearby") {
                     return;
                 }
                 //展示二级
                 switch (oIndex) {
                     case 0:
                         _this.getNearby(obj, o);
                         break;
                     case 1:
                         _this.getArea(obj, o);
                         break;
                     case 2:
                         _this.getSubway(obj, o);
                         break;
                     default:
                         break;
                 }
             })
         },
         getSubway: function (obj, o) {
             var _this = this, _obj = obj.find(".box-wrap"), _objFirstUlLi = _obj.eq(0).find(".box-ul li"),
                 i = o.index(), _thisObj = _obj.eq(1), _twoObj = _thisObj.find(".box-ul").eq(i);
             _thisObj.find(".box-ul").addClass("hide");
             _obj.eq(2).addClass("hide");
             _thisObj.removeClass("hide");
             _twoObj.removeClass("hide");
 
             _objFirstUlLi.removeClass("active");
             _objFirstUlLi.eq(i).addClass("active");
 
             _twoObj.on("click", "li", function (e) {
                 e.preventDefault();
                 var t = $(this), subwayCode = t.attr("data-subwaycode"), str = "", app_href = "href",
                     threeObj = _thisObj.next(), objBox = threeObj.find(".box-ul"),
                     hrefCity = location.pathname.split("/")[1], listnameCity = j4fe.city.listname;
                 /*if (__device != "") {
                  var _thisHref = t.find("a").attr("app-href");
                  WBAPP.loadPage('link', _thisHref, "品牌公寓");
                  }*/
                 t.parent().find("li").removeClass("active");
                 t.addClass("active");
                 //地铁三级, 展示地铁站
                 if (subwayCode != "0") {
                     _twoObj.removeClass("hide");
                     threeObj.removeClass("hide");
                     objBox.removeClass("hide");
                     var subwayData = ditiezhan[subwayCode],
                         hrefA = __device != "" ? t.find("li a").attr("app-href") : t.find("li a").attr("href"),
                         unLimmitUrl = "";
                     var coords = _this.getUrlParam("coords"), distance01 = _this.getUrlParam("distance");
                     unLimmitUrl = hrefA.replace(hrefCity, listnameCity);
                     unLimmitUrl = (coords != null) ? unLimmitUrl.replace('-6=0&maptype=2&coords=' + coords + '&distance=' + distance01, "") : unLimmitUrl;
                     unLimmitUrl = unLimmitUrl.replace("&&", "&");
                     if (__device != "") {
                         app_href = "app-href";
                         unLimmitUrl = unLimmitUrl + "&os=" + __device;
                         unLimmitUrl = unLimmitUrl.replace("&&", "&");
                     }
                     str = "<ul class=\"box-ul subwayBox\">";
                     str += "<li class=\"box-li\" data-subwaycode=\"" + subwayCode + "\"><a " + app_href + "=\"" + unLimmitUrl + "\" tongji_tag=\"fcm_gylist_" + subwayCode + "\">不限</a></li>";
                     for (var i = 0; i < subwayData.length; i++) {
                         subwayUrl = subwayData[i].url.replace(hrefCity, listnameCity);
                         subwayUrl = (coords != null) ? subwayUrl.replace('-6=0&maptype=2&coords=' + coords + '&distance=' + distance01, "") : subwayUrl;
                         subwayUrl = subwayUrl.replace("&&", "&");
                         if (__device != "") {
                             app_href = "app-href";
                             subwayUrl = subwayUrl + "&os=" + __device;
                             subwayUrl = subwayUrl.replace("&&", "&");
                         }
                         str += "<li class=\"box-li\" data-subwaycode=\"" + subwayData[i].id + "\"><a " + app_href + "=\"" + subwayUrl + "\" tongji_tag=\"fcm_gylist_" + subwayCode + "_" + (i + 1) + "\">" + subwayData[i].name + "</a></li>";
                     }
                     str += "</ul>";
                     threeObj.html(str);
                     _this.conSwipe(threeObj);
                     _this.initRecordEvent();
                 } else {
                     //和地铁互斥
                     var rex = /(\/l\d{6})(\/s\d{6})/, href = location.href;
                     if (rex.test(href)) {
                         href = href.replace(RegExp.$1, "");
                         href = href.replace(RegExp.$2, "");
                     }
                     if (/(\/l\d{6})/.test(location.href)) {
                         href = href.replace(RegExp.$1, "");
                     }
                     if (__device != "") {
                         href = t.find("a").attr("app-href");
                         WBAPP.loadPage('link', "//m.58.com" + href, "品牌公寓");
                         $(".house-nav li").removeClass("icon-arrow-up");
                         $(".house-filter").addClass("hide");
                         $("#mask").hide();
                     } else {
                         window.location.href = href;
                     }
                 }
 
             })
         },
         getNearby: function (obj, o) {
             var _this = this, _obj = obj.find(".box-wrap"), i = o.index(), _thisObj = _obj.eq(1),
                 _twoObj = _thisObj.find(".box-ul").eq(i);
             _thisObj.find(".box-ul").addClass("hide");
             _obj.eq(2).addClass("hide");
             _thisObj.removeClass("hide");
             _twoObj.removeClass("hide");
             _obj.eq(0).find(".box-ul li").removeClass("active");
             _obj.eq(0).find(".box-ul li").eq(i).addClass("active");
 
             _thisObj.find(".box-ul li").on("click", function (e) {
                 var lat = localStorage.getItem("myLat");
                 var lon = localStorage.getItem("myLon");
                 objCity = localStorage.getItem("myCityName");
 
                 var href = location.href, origin = location.origin, pathname = location.pathname,
                     search = location.search, nearbyUrl = "", nearbySearch = "";
                 var s = search.slice(1), dis = $(this).find('a'), distance = $(this).attr('data-neabycode');
 
                 if (lat == null || lat == "" || lat == "undefined") {
                     loc_lat_lon.posInit();
                     lat = localStorage.getItem("myLat");
                     lon = localStorage.getItem("myLon");
                     loc_lat_lon.err_handle_permission_denied = function (oldcity) {
                         var txt = "您拒绝了共享位置，请手动选择区域。";
                         if (!$("#tipsDiv").length) {
                             var tipsDiv = "<div id='tipsDiv'>" + txt + "</div>";
                             $("body").append(tipsDiv);
                         } else {
                             $("#tipsDiv").text(txt);
                         }
                         $("#tipsDiv").show();
                         setTimeout(function () {
                             $("#tipsDiv").hide();
                         }, 3000);
                     }
                     loc_lat_lon.err_handle_position_unavailable = function (oldcity) {
 
                         util.alertShowWrite('提示', '无法提供定位服务！', 1, '确定', '', function () {
                             ahide();
                         }, '');
                     }
                     loc_lat_lon.err_handle_timeout = function (oldcity) {
 
                         util.alertShowWrite('提示', '连接超时，请重试！', 1, '确定', '', function () {
                             ahide();
                         }, '');
                     }
                     loc_lat_lon.get_city_suc_from_coords = function (citydata) {
 
                         objCity = citydata.cityname;
                         objL = citydata.listname;
                         getCityLatLon(objCity, objL, listN);
                     }
                     loc_lat_lon.get_city_fail_from_coords = function () {
                         loc_lat_lon.getCityIp();
                     }
                     loc_lat_lon.get_city_suc_from_ip = function (citydata) {
                         objCity = citydata.cityname;
                         objL = citydata.listname;
                         getCityLatLon(objCity, objL, listN);
                     }
                     loc_lat_lon.get_city_fail_from_ip = function () {
                         util.alertShowWrite('提示', '无法提供定位服务！', 1, '确定', '', function () {
                             ahide();
                         }, '');
                     }
                     loc_lat_lon.err_handle_unknown_reanson = function () {
                         console.log("查询地理位置信息失败：未知错误");
                     }
                 }
                 function getCityLatLon(o, objL, l) {
                     if (o != l) {
                         util.alertShowWrite('提示', '当前选择城市是' + listN + '，附近功能不可用，您可以选择', 2, '切换至' + o + '', '继续留在' + listN + '', function () {
                             $('#alertbg_write').hide();
                             $('#alertbox_write').hide();
 
                             var lin = origin + "/" + objL + "/" + lname + "/" + search;
                             window.location.replace(lin);
                         }, function () {
                             $('#alertbg_write').hide();
                             $('#alertbox_write').hide();
                         });
                         lat = null;
                         lon = null;
                     }
                 }
 
                 function ahide() {
                     $('#alertbg_write').hide();
                     $('#alertbox_write').hide();
                 }
 
                 //获取定位的url参数
                 var coords = _this.getUrlParam("coords"), distance01 = _this.getUrlParam("distance");
                 var seurl = distance == "0" ? "" : '-6=0&maptype=2&coords=' + lat + ',' + lon + '&distance=' + distance;
                 nearbySearch = (lat != null || lon != null) ? seurl : "";
                 //判断url中是否已有定位元素, 已有则替换, 没有则添加
 
                 href = (coords != null) ? href.replace('-6=0&maptype=2&coords=' + coords + '&distance=' + distance01, nearbySearch) : href + (href.indexOf("?") > -1 ? "&" : "?") + nearbySearch;
 
                 //和区域互斥
                 var hrefCity = pathname.split("/")[1], listnameCity = j4fe.city.listname, rex = /(\/l\d{6})(\/s\d{6})/;
                 href = href.replace(hrefCity, listnameCity);
                 //和地铁互斥
                 if (rex.test(href)) {
                     href = href.replace(RegExp.$1, "");
                     href = href.replace(RegExp.$2, "");
                 }
                 if (/(\/l\d{6})/.test(location.href)) {
                     href = href.replace(RegExp.$1, "");
                 }
                 //定位最终的请求url
                 nearbyUrl = href.replace("&&", "&");
                 dis.attr("href", nearbyUrl);
             });
         },
         getArea: function (obj, o) {
 
             var _this = this, _obj = obj.find(".box-wrap"), _objFirstUlLi = _obj.eq(0).find(".box-ul li"),
                 i = o.index(), _thisObj = _obj.eq(1), _twoObj = _thisObj.find(".box-ul").eq(i);
             var cityname = j4fe.city.listname;
 
             var url = '//gongyu.m.58.com/location/api_get_sublocals?cityname=' + cityname;
 
             _thisObj.find(".box-ul").addClass("hide");
 
             _obj.eq(2).addClass("hide");
             _twoObj.removeClass("hide");
             _obj.eq(i).removeClass("hide");
             _obj.eq(0).removeClass("hide");
 
             _objFirstUlLi.removeClass("active");
             _objFirstUlLi.eq(i).addClass("active");
             function removeSubwayCode(thisA, RegE1, RegE2) {
                 var thi = thisA.replace(RegE2, "");
                 thi = thi.replace(RegE1, "");
                 return thi;
             }
 
             //区域三级
             _twoObj.on("click", "li", function (e) {
 
                 var t = $(this), abbrCode = t.attr("data-abbreviatecode"), thisA = "", thisHref = "";
                 thisA = (__device != "") ? t.find("a").attr("app-href") : t.find("a").attr("href");
                 if (abbrCode == "undefined" || abbrCode == null) {
                     thisHref = /(\/l\d{6})(\/s\d{6})/.test(thisA) ? thisHref = removeSubwayCode(thisA, RegExp.$1, RegExp.$2) : /(\/l\d{6})/.test(thisA) ? thisHref = removeSubwayCode(thisA, RegExp.$1, RegExp.$2) : thisA;
                     t.find("a").attr("href", thisHref);
                     return;
                 }
 
                 t.parent().find("li").removeClass("active");
                 t.addClass("active");
                 e.preventDefault();
                 $.ajax({
                     type: "get",
                     dataType: "jsonp",
                     url: url + "&jsoncallback=?",
                     jsoncallback: "",
                     success: function (data) {
                         if (!data) return;
                         var kdata = $.parseJSON(data.data)[0];
                         if (kdata[abbrCode] == undefined) {
                             if (__device != "") {
                                 _thisHref = t.find("a").attr("app-href");
                                 WBAPP.loadPage('link', '//'+window.location.host+_thisHref, "品牌公寓");
                                 $(".house-nav li").removeClass("icon-arrow-up");
                                 $(".house-filter").addClass("hide");
                                 $("#mask").hide();
                             } else {
                                 window.location.href = t.children().attr("href");
                             }
                             return;
                         }
                         _twoObj.removeClass("hide");
                         _obj.eq(2).removeClass("hide");
                         getBusinessCircle(t, thisA, abbrCode, kdata, _thisObj);
                     }
                 });
 
             })
             //展示商圈
             function getBusinessCircle(t, thisHref, abbrCode, kdata, _thisObj) {
                 var rex = /(\/l\d{6})(\/s\d{6})/, busiCircleData = kdata[abbrCode], threeObj = _thisObj.next(),
                     objBox = threeObj.find(".box-ul"), str = "", busi_listname = "", objHref = "";
                 var coords = _this.getUrlParam("coords"), distance01 = _this.getUrlParam("distance"), app_href = "";
 
                 threeObj.removeClass("hide");
                 objBox.removeClass("hide");
                 thisHref = (coords != null) ? thisHref.replace('-6=0&maptype=2&coords=' + coords + '&distance=' + distance01, "") : thisHref;
                 thisHref = thisHref.replace("&&", "&");
                 if (rex.test(thisHref)) {
                     thisHref = thisHref.replace(RegExp.$1, "");
                     thisHref = thisHref.replace(RegExp.$2, "");
                 }
                 if (/(\/l\d{6})/.test(thisHref)) {
                     thisHref = thisHref.replace(RegExp.$1, "");
                 }
 
                 str = "<ul class=\"box-ul areaBox\">";
                 str += "<li class=\"box-li all-area\" data-countycode=\"" + t.attr("data-countycode") + "\" data-abbreviatecode=\"" + abbrCode + "\"><a href=\"" + thisHref + "\" tongji_tag=\"fcm_gylist_shangquan\">全" + t.text().trim() + "</a></li>";
                 for (var i = 0; i < busiCircleData.length; i++) {
                     busi_listname = busiCircleData[i].listname;
                     objHref = thisHref.replace(abbrCode, busi_listname), app_href = "href";
                     if (__device != "") {
                         app_href = "app-href";
                         objHref = objHref + "&os=" + __device;
                         objHref = objHref.replace("&&", "&");
                     }
                     str += "<li class=\"box-li\" data-countycode=\"" + busiCircleData[i].id + "\" data-abbreviatecode=\"" + busi_listname + "\"><a " + app_href + "=\"" + objHref + "\" tongji_tag=\"fcm_gylist_shangquan_" + busi_listname + "\">" + busiCircleData[i].name + "</a></li>";
                 }
                 str += "</ul>";
                 threeObj.html(str);
                 _this.conSwipe(threeObj);
                 _this.initRecordEvent();
             }
         },
         getRent: function (obj) {
             var _this = this, cityId = obj.attr("data-citycode"), cityListname = obj.attr("data-city"),
                 cityname = obj.text();
 
             var objUl = obj.find(".box-ul"), objLi = objUl.find(".box-li"), houseNavMonthRent = $(".house-nav-rent"),
                 txt = objUl.find(".active").text();
             if (txt == "不限") {
                 houseNavMonthRent.find("a").text("租金");
             }
 
             $('.f-box-rent .btn-confirm').on("click", function () {
                 var highLabel = $(".high-label").text(), lowLabel = $(".low-label").text(),
                     noLumit = $(".box-li:first-child"), locHref = location.href, gongyuRent = "";
 
                 objLi.removeClass("active");
                 if (lowLabel == "￥" + 0 && highLabel == "￥不限" || highLabel == 0 || lowLabel == "不限") {
                     noLumit.addClass("active");
                     window.location.href = noLumit.find("a").attr("href");
                 } else {
                     highLabel = (highLabel == "不限") ? highLabel = 99999 : highLabel;
                     gongyuRent = lowLabel + "_" + highLabel;
                     var gongyuRentVal = _this.getUrlParam('gongyu_minprice');
                     houseNavMonthRent.attr("gongyu_minprice", gongyuRent);
                     houseNavMonthRent.find("a").text(lowLabel + "-" + highLabel);
                     locHref = (locHref.indexOf("gongyu_minprice=") > 0 || gongyuRentVal != null) ? locHref.replace(gongyuRentVal, gongyuRent) : locHref + (locHref.indexOf("?") > -1 ? "&" : "?") + "gongyu_minprice=" + gongyuRent;
                     if (__device != "") {
                         locHref = locHref + "&os=" + __device;
                         locHref = locHref.replace("&&", "&");
                         WBAPP.loadPage('link', locHref, "品牌公寓");
                         $(".house-nav li").removeClass("icon-arrow-up");
                         $(".house-filter").addClass("hide");
                         $("#mask").hide();
                     } else {
                         window.location.href = locHref;
                     }
                 }
                 _this.close();
             })
         },
         showMsgBox: function (msg) {
             var that = this;
             that.msgBox.removeClass("boxHide");
             that.msgBox.html(msg);
             setInterval(function () {
                 that.msgBox.addClass("boxHide");
             }, 3000);
         },
         getUrlParam: function (name) {
             var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
             var r = window.location.search.substr(1).match(reg);	//匹配目标参数
             if (r != null) return unescape(r[2]);
             return null; //返回参数值
         },
         getMore: function (obj) {
             var _this = this, objDiv = obj.find(".box-ul li .box-li-div"), objDatas = {};
 
             objDiv.on("click", function () {
                 var _obj = $(this), thisClass = _obj.parent().attr("class");
                 if (thisClass != "room-tag" && thisClass != 'coupon-status') {
                     $("." + thisClass).find(".box-li-div").removeClass("selected");
                     $(this).addClass("selected");
                 } else {
                     //标签可多选
                     if (_obj.index() == 1) {//不限(标签)
                         (_obj.hasClass("unlimited")) ? noTag(_obj) : allTag(_obj);
                     } else {
                         $(_obj.parent().find(".box-li-div")[0]).removeClass("selected");
                         (_obj.hasClass("selected")) ? _obj.removeClass("selected") : _obj.addClass("selected");
                     }
                 }
                 function allTag(_obj) {
                     _obj.parent().find(".box-li-div").addClass("selected");
                 }
 
                 function noTag(_obj) {
                     _obj.parent().find(".box-li-div").removeClass("selected");
                     _obj.addClass("selected");
                 }
             })
             $(".btn-more").on("click", function (e) {
                 objDatas = _this.setMoreParams(obj);
                 // console.log(objDatas);
                 var locHref = location.href,
                     yuefu = _this.getUrlParam("yuefu"),
                     duanzu = _this.getUrlParam("duanzu")/*, fangshi = _this.getUrlParam("fangshi")*/,
                     duwei = _this.getUrlParam("duwei"),
                     dlyangtai = _this.getUrlParam("dlyangtai"),
                     isReal = _this.getUrlParam("isReal"),
                     isRsms = _this.getUrlParam("isRsms"),
                     gongyu_area = _this.getUrlParam("gongyu_area"),
                     gongyu_type = _this.getUrlParam("gongyu_type"),
                     gongyucoupontype = _this.getUrlParam("gongyucoupontype"),
                     gongyudeposit = _this.getUrlParam("gongyudeposit"),
                     towards = _this.getUrlParam("towards"),
                     tagPref = _this.getUrlParam("tagPref"),
                     gongyu_huxingshi = _this.getUrlParam("gongyu_huxingshi"),
                     room_perfer = _this.getUrlParam("room_perfer"),
                     rent_type = _this.getUrlParam("rent_type");
                 var arrTags = objDatas.dataRoomTag, toHref = "";
 
                 //面积
                 toHref = (locHref.indexOf("gongyu_area=") > -1 || gongyu_area != null) ? hasObjType(locHref, "gongyu_area=", gongyu_area, objDatas.dataAcreage) : noHasObjType(locHref, "gongyu_area=", objDatas.dataAcreage);
                 //公寓类型
                 toHref = (locHref.indexOf("gongyu_type=") > -1 || gongyu_type != null) ? hasObjType(toHref, "gongyu_type=", gongyu_type, objDatas.dataRoomType) : noHasObjType(toHref, "gongyu_type=", objDatas.dataRoomType);
                 //优惠
                 toHref = (locHref.indexOf("gongyucoupontype=") > -1 || gongyucoupontype != null) ? hasObjType(toHref, "gongyucoupontype=", gongyucoupontype, objDatas.dataCoupon) : noHasObjType(toHref, "gongyucoupontype=", objDatas.dataCoupon);
                 //验证情况
                 toHref = (locHref.indexOf("gongyudeposit=") > -1 || gongyudeposit != null) ? hasObjType(toHref, "gongyudeposit=", gongyudeposit, objDatas.dataCheck) : noHasObjType(toHref, "gongyudeposit=", objDatas.dataCheck);
                 //朝向
                 toHref = (locHref.indexOf("towards=") > -1 || towards != null) ? hasObjType(toHref, "towards=", towards, objDatas.dataTowards) : noHasObjType(toHref, "towards=", objDatas.dataTowards);
                 //優選公寓
                 toHref = (locHref.indexOf("tagPref=") > -1 || tagPref != null) ? hasObjType(toHref, "tagPref=", tagPref, objDatas.dataRoomTagPref) : noHasObjType(toHref, "tagPref=", objDatas.dataRoomTagPref);
 
                 //特色
                 toHref = initTags(yuefu, duanzu, duwei, dlyangtai, isReal, isRsms, toHref);
                 for (var i = 0; i < arrTags.length; i++) {
                     toHref = switchTags(arrTags[i])
                 }
 
 
                 //出租类型
                 toHref = (locHref.indexOf("rent_type=") > -1 || rent_type != null) ? hasObjType(toHref, "rent_type=", rent_type, objDatas.dataRentRoomType) : noHasObjType(toHref, "rent_type=", objDatas.dataRentRoomType);
                 //户型
                 toHref = (locHref.indexOf("gongyu_huxingshi=") > -1 || gongyu_huxingshi != null) ? hasObjType(toHref, "gongyu_huxingshi=", gongyu_huxingshi, objDatas.dataRoom) : noHasObjType(toHref, "gongyu_huxingshi=", objDatas.dataRoom);
                 //卧室偏好
                 toHref = (locHref.indexOf("room_perfer=") > -1 || room_perfer != null) ? hasObjType(toHref, "room_perfer=", room_perfer, objDatas.dataRoomPerfer) : noHasObjType(toHref, "room_perfer=", objDatas.dataRoomPerfer);
 
 
                 function switchTags(tagIndex) {
                     switch (tagIndex) {
                         case "0":
                             toHref = toHref;
                             break;
                         case "1":
                             toHref = (toHref.indexOf("yuefu=") > -1) ? toHref : toHref + (toHref.indexOf("?") > -1 ? "&" : "?") + "yuefu=1";
                             break;
                         case "2":
                             toHref = (toHref.indexOf("duanzu=") > -1) ? toHref : toHref + (toHref.indexOf("?") > -1 ? "&" : "?") + "duanzu=1";
                             break;
                         case "3":
                             toHref = (toHref.indexOf("dlyangtai=") > -1) ? toHref : toHref + (toHref.indexOf("?") > -1 ? "&" : "?") + "dlyangtai=1";
                             break;
                         case "4":
                             toHref = (toHref.indexOf("duwei=") > -1) ? toHref : toHref + (toHref.indexOf("?") > -1 ? "&" : "?") + "duwei=1";
                             break;
                         case "5":
                             toHref = (toHref.indexOf("isReal=") > -1) ? toHref : toHref + (toHref.indexOf("?") > -1 ? "&" : "?") + "isReal=1";
                             break;
                         case "6":
                             toHref = (toHref.indexOf("isRsms=") > -1) ? toHref : toHref + (toHref.indexOf("?") > -1 ? "&" : "?") + "isRsms=1";
                             break;
                         default:
                             break;
                     }
                     return toHref;
                 }
 
                 function initTags(yuefu, duanzu, duwei, dlyangtai, isReal,isRsms, toHref) {
                     var h = "";
                     if (yuefu != null || duanzu != null || duwei != null || dlyangtai != null || isReal != null || isRsms != null)  {
                         h = toHref.replace("&yuefu=1", "");
                         h = h.replace("&duanzu=1", "");
                         h = h.replace("&duwei=1", "");
                         h = h.replace("&dlyangtai=1", "");
                         h = h.replace("&isReal=1", "");
                         h = h.replace("&isRsms=1", "");
                         return h;
                     }
                     return toHref;
                 }
 
                 function hasObjType(href, strType, type, dataParams) {
                     var h = href.replace(strType + type, strType + dataParams);
                     h = noLimit(h, strType, dataParams);
                     return h;
                 }
 
                 function noHasObjType(href, strType, dataParams) {
                     var h = href + (href.indexOf("?") > -1 ? "&" : "?") + strType + dataParams;
                     h = noLimit(h, strType, dataParams);
                     return h;
                 }
 
                 function noLimit(href, strType, dataParams) {
                     var h = href;
                     var badValueArr = ['0', undefined, ''];
                     if (badValueArr.indexOf(dataParams) > -1) {
                         if (h.indexOf(strType) > -1) {
                             var prefix = h.indexOf("&" + strType) > -1 ? '&' : '';
                             // console.log('处理之前', h.split('pagetype=sub')[1]);
                             badValueArr.forEach(function (item) {
                                 h = h.replace(prefix + strType + item, "");
                                 // console.log('去掉'+prefix+strType+item,h.split('pagetype=sub')[1]);
                             })
                             console.log('处理之后', h.split('pagetype=sub')[1]);
                         }
                     }
                     return h;
                 }
 
                 if (__device != "") {
                     toHref = toHref + "&os=" + __device;
                     toHref = toHref.replace("&&", "&");
                     WBAPP.loadPage('link', toHref, "品牌公寓");
                     $(".house-nav li").removeClass("icon-arrow-up");
                     $(".house-filter").addClass("hide");
                     $("#mask").hide();
                 } else {
                     console.log(toHref.split('pagetype=sub')[1]);
                     window.location.href = toHref;
                 }
 
             })
         },
         clearMore: function () {
             var clearArr = ['coupon-status', 'check-status', 'room-towards', 'acreage', 'room-tag', 'room-type', 'room-tagPref'];
             this.clearMoreBtn.on('click', function () {
                 clearArr.forEach(function (item) {
                     $("." + item).find(".box-li-div").removeClass("selected");
                     $("." + item).find(".unlimited").addClass("selected");
                 })
             })
         },
         setMoreParams: function (obj) {
             var _this = this, objChild = obj.children(), objDatas = {}, dataTag = [];
             //优惠
             //特色
             var couponArr = $($(".coupon-status").children(".selected"));
             var couponParam = '';
             for (var i = 0; i < couponArr.length; i++) {
                 couponParam += $(couponArr[i]).attr("data-coupon-status") + '|';
             }
             console.log(couponParam);
             if (couponParam[couponParam.length-1] == '|') {
                 objDatas.dataCoupon = couponParam.substr(0, couponParam.length - 1);
             }
             console.log(objDatas.couponParam);
             // objDatas.dataCoupon = $($(".coupon-status").children(".selected")).attr("data-coupon-status");
             //验证情况
             objDatas.dataCheck = $($(".check-status").children(".selected")).attr("data-check-status");
             //朝向
             objDatas.dataTowards = $($(".room-towards").children(".selected")).attr("data-room-towards");
             //面积
             objDatas.dataAcreage = $($(".acreage").children(".selected")).attr("data-acreage");
             //公寓类型
             objDatas.dataRoomType = $($(".room-type").children(".selected")).attr("data-room-type");
             //優選公寓
             objDatas.dataRoomTagPref = $($(".room-tagPref").children(".selected")).attr("data-room-tagPref");
             //特色
             var tagArr = $($(".room-tag").children(".selected"));
             for (var i = 0; i < tagArr.length; i++) {
                 dataTag[i] = $(tagArr[i]).attr("data-room-tag");
             }
             objDatas.dataRoomTag = dataTag;
 
             //出租类型
             objDatas.dataRentRoomType = $($(".rent-room-type").children(".selected")).attr("data-rent-room-type");
 
             //户型
             var arr = $($(".rent-room-num").children(".selected"));
             var dataRoom = '';
             for (var i = 0; i < arr.length; i++) {
                 dataRoom += $(arr[i]).attr("rent-room-num") + '-'
                 // datatagRoom[i] = $(arr[i]).attr("rent-room-num");
             }
             if (objDatas.dataRentRoomType != '0') {
                 objDatas.dataRoom = dataRoom.slice(0, -1);
             } else {
                 objDatas.dataRoom = '';
             }
 
 
             //卧室偏好
             if (objDatas.dataRentRoomType == '2') {
                 objDatas.dataRoomPerfer = $($(".rent-room-prefer").children(".selected")).attr("data-room-prefer");
             } else {
                 objDatas.dataRoomPerfer = '0';
             }
 
 
 
             return objDatas;
         },
         docSwipe: function () {
             var _this = this;
             function filterPosition() {
                 var _scroll = $(window).scrollTop();
                 if (_scroll >= _this._top) {
                     if (_this.b == 1) return;
                     _this.addFixed();
                     _this.navFilter.animate({ top: "0" }, 300, "ease-out");
                     _this.b = 1;
                 } else {
                     if ($('.icon-arrow-up').length){
                         return;
                     }
                     _this.b = 0;
                     _this.removeFixed();
                 }
             }
 
             var exec = throttle(filterPosition, 200);
             $(window).on("scroll", exec);
         },
         addFixed: function () {
             $("body").addClass("position-fixed");
         },
         removeFixed: function () {
             //判断是否在app里面。如果在app里面不清楚fixed
             if (__device) {
                 return;
             } else {
                 $("body").removeClass("position-fixed");
             }
 
         },
         conSwipe: function (i) {
             var _this = this, $ul = "";
             if (isNaN(i) && i.hasClass("box-panel-3")) {
                 $ul = i.find("ul");
             } else {
                 $ul = _this.fBox.eq(i).find("ul");
             }
             $ul.on("touchstart", function (e) {
                 this.startY = e.targetTouches[0].screenY;
                 this.startTop = this.y || 0;
                 this.startTime = event.timeStamp;
                 this.moved = false;
                 this.wrapH = $(this).parents()[0].offsetHeight;
                 if (!this.maxScrollY || this.scrollerHeight != this.offsetHeight) {
                     this.scrollerHeight = this.offsetHeight;
                     this.maxScrollY = this.wrapH - this.scrollerHeight + 1;
                 }
                 this._height = this._height || $(this).parent().height() - $(this).find("li").height() * $(this).find("li").length + 1;
                 if (this.isInTransition) {
                     var matrix = window.getComputedStyle(this, null);
                     matrix = matrix["webkitTransform"].split(")")[0].split(", ");
                     this.y = matrix[13] || matrix[5];
                     this.y = Math.round(this.y);
                     this.startTop = Math.round(this.y);
                     $(this).css({
                         "-webkit-transform": "translate3d(0," + this.y + "px, 0)",
                         "-webkit-transition-duration": "0"
                     });
                     this.isInTransition = false
                 }
             });
             $ul.on("touchmove", function (e) {
                 e.preventDefault();
                 e.stopPropagation();
                 this.moved = true;
                 this.y = e.targetTouches[0].screenY - this.startY + this.startTop;
                 if (this.y > 0 || this.y < this.maxScrollY) {
                     var newY = this.y - (e.targetTouches[0].screenY - this.startY) * 2 / 3;
                     this.y = this.y > 0 ? 0 : this.maxScrollY;
                     if (newY > 0 || newY < this.maxScrollY) {
                         this.y = newY
                     }
                 }
                 $(this).css({
                     "-webkit-transform": "translate3d(0," + this.y + "px, 0)",
                     "-webkit-transition-duration": "0"
                 });
                 this.isInTransition = false;
                 var timeStamp = event.timeStamp;
                 if (timeStamp - this.startTime > 300) {
                     this.startTime = timeStamp;
                     this.startY = e.targetTouches[0].screenY;
                     this.startTop = this.y
                 }
             });
             $ul.on("touchend", function (e) {
                 var dist = e.changedTouches[0].screenY - this.startY;
                 this.endTime = event.timeStamp;
                 var duration = this.endTime - this.startTime;
                 if (this.moved) {
                     e.preventDefault();
                     e.stopPropagation();
                     var newY = Math.round(e.changedTouches[0].screenY);
                     this.isInTransition = true;
                     if (this.y > 0 || this.y < this.maxScrollY) {
                         _this.scrollTo(this, this.y, this.maxScrollY, 600);
                         return
                     }
                     if (duration < 300) {
                         var move = _this.calculateMoment(this.y, this.startTop, duration, this.maxScrollY, this.wrapH);
                         this.y = move.destination;
                         var time = move.duration;
                         $(this).css({
                             "-webkit-transform": "translate3d(0, " + this.y + "px, 0)",
                             "transition-timing-function": "cubic-bezier(0.1, 0.3, 0.5, 1)",
                             "-webkit-transition-duration": time + "ms"
                         })
                     }
                     return
                 }
             });
             $ul.on("transitionend", function () {
                 this.isInTransition = false;
                 _this.scrollTo(this, this.y, this.maxScrollY, 600)
             })
         },
         scrollTo: function (obj, y, maxY, time, sety) {
             if (y > 0 || maxY > 0) {
                 y = 0;
             } else if (y < maxY) {
                 y = maxY;
             } else if (sety != 0) {
                 this.y = 0;
                 y = sety;
             }
             obj.isInTransition = true;
             $(obj).css({
                 '-webkit-transform': 'translate3d(0, ' + y + 'px, 0)',
                 'transition-timing-function': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                 '-webkit-transition-duration': time + 'ms'
             });
         },
         calculateMoment: function (current, start, time, lowerMargin, wrapperSize) {
             var distance = current - start,
                 speed = Math.abs(distance) / time,
                 destination,
                 duration;
 
             deceleration = 0.0006;
             destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
             duration = speed / deceleration;
 
             if (destination < lowerMargin) {
                 destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
                 distance = Math.abs(destination - current);
                 duration = distance / speed;
             } else if (destination > 0) {
                 destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
                 distance = Math.abs(current) + destination;
                 duration = distance / speed;
             }
 
             return {
                 destination: Math.round(destination),
                 duration: duration
             }
         },
         close: function (e) {
             var _this = this;
             _this.mask.hide();
             _this.houseFilter.addClass("hide");
             _this.navFilter.find('li').removeClass('icon-arrow-up');
             if (!(_this.b && _this.b == 1)) {
                 _this.removeFixed();
             }
         },
         initRecordEvent: function () {
             _this = this;
             $('.box-panel-3').find('.box-ul').on('click', 'li', function (e) {//做记录
                 var t = $(this);
                 var href = (__device != "") ? t.find("a").attr("app-href") : t.find("a").attr("href");
                 var apartmentListFilterRecord = localStorage.getItem(_this.filterRecord)
                     ? JSON.parse(localStorage.getItem(_this.filterRecord)) : [];
                 apartmentListFilterRecord.unshift([t.find("a").text(), href]);
                 if (apartmentListFilterRecord.length > 10) {
                     apartmentListFilterRecord.length = 10
                 }
                 localStorage.setItem(_this.filterRecord, JSON.stringify(apartmentListFilterRecord));
             })
         },
         rentTypeEvent: function () {
             var _this = this;
             $('.f-box-type .rent-room-type .unlimited').on('click', function () {
                 _this.rentRoomNum.addClass("hide");
                 _this.rentRoomPrefer.addClass('hide');
                 _this.rentOwnBtn.removeClass('selected');
                 _this.rentTogetherBtn.removeClass('selected');
                 $(this).addClass('selected');
             });
             this.rentOwnBtn.on('click', function () {
                 _this.rentRoomNum.removeClass("hide");
                 _this.rentRoomPrefer.addClass('hide');
                 $('.f-box-type .rent-room-type .unlimited').removeClass('selected');
                 _this.rentTogetherBtn.removeClass('selected');
                 console.log($(this));
                 $(this).addClass('selected');
             });
             this.rentTogetherBtn.on('click', function () {
                 _this.rentRoomNum.removeClass("hide");
                 _this.rentRoomPrefer.removeClass('hide');
                 _this.rentOwnBtn.removeClass('selected');
                 $('.f-box-type .rent-room-type .unlimited').removeClass('selected');
                 $(this).addClass('selected');
             });
             //户型
             $('.rent-room-num .box-li-div').on('click', function () {
                 if ($(this).hasClass('unlimited')) {
                     $(this).parent().find(".box-li-div").removeClass("selected");
                     $(this).addClass("selected");
                 } else {
                     $('.rent-room-num .box-li-div.unlimited').removeClass("selected");
                     if ($(this).hasClass("selected")) {
                         $(this).removeClass("selected");
                     } else {
                         $(this).addClass("selected");
                     }
                 }
             });
             //卧室偏好
             $('.rent-room-prefer .box-li-div').on('click', function () {
                 $(this).parent().find(".box-li-div").removeClass("selected");
                 $(this).addClass("selected");
             });
 
         }
     }
 
     var filter = new listFilter;
     filter.init();
     return filter;
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
 
 
 /***/ }),
 /* 7 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_RESULT__;;(function(){
   function FastClick(layer, options) {
   "use strict";
   var oldOnClick;
   options = options || {};
   this.trackingClick = false;
   this.trackingClickStart = 0;
   this.targetElement = null;
   this.touchStartX = 0;
   this.touchStartY = 0;
   this.lastTouchIdentifier = 0;
   this.touchBoundary = options.touchBoundary || 10;
   this.layer = layer;
   this.tapDelay = options.tapDelay || 200;
   if (FastClick.notNeeded(layer)) {
     return
   }
 
   function bind(method, context) {
     return function () {
       return method.apply(context, arguments)
     }
   }
   var methods = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"];
   var context = this;
   for (var i = 0, l = methods.length; i < l; i++) {
     context[methods[i]] = bind(context[methods[i]], context)
   }
   if (deviceIsAndroid) {
     layer.addEventListener("mouseover", this.onMouse, true);
     layer.addEventListener("mousedown", this.onMouse, true);
     layer.addEventListener("mouseup", this.onMouse, true)
   }
   layer.addEventListener("click", this.onClick, true);
   layer.addEventListener("touchstart", this.onTouchStart, false);
   layer.addEventListener("touchmove", this.onTouchMove, false);
   layer.addEventListener("touchend", this.onTouchEnd, false);
   layer.addEventListener("touchcancel", this.onTouchCancel, false);
   if (!Event.prototype.stopImmediatePropagation) {
     layer.removeEventListener = function (type, callback, capture) {
       var rmv = Node.prototype.removeEventListener;
       if (type === "click") {
         rmv.call(layer, type, callback.hijacked || callback, capture)
       } else {
         rmv.call(layer, type, callback, capture)
       }
     };
     layer.addEventListener = function (type, callback, capture) {
       var adv = Node.prototype.addEventListener;
       if (type === "click") {
         adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
           if (!event.propagationStopped) {
             callback(event)
           }
         }), capture)
       } else {
         adv.call(layer, type, callback, capture)
       }
     }
   }
   if (typeof layer.onclick === "function") {
     oldOnClick = layer.onclick;
     layer.addEventListener("click", function (event) {
       oldOnClick(event)
     }, false);
     layer.onclick = null
   }
 }
 var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0;
 var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
 var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
 var deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
 var deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
 FastClick.prototype.needsClick = function (target) {
   "use strict";
   switch (target.nodeName.toLowerCase()) {
   case "button":
   case "select":
   case "textarea":
     if (target.disabled) {
       return true
     }
     break;
   case "input":
     if (deviceIsIOS && target.type === "file" || target.disabled) {
       return true
     }
     break;
   case "label":
   case "video":
     return true
   }
   return /\bneedsclick\b/.test(target.className)
 };
 FastClick.prototype.needsFocus = function (target) {
   "use strict";
   switch (target.nodeName.toLowerCase()) {
   case "textarea":
     return true;
   case "select":
     return !deviceIsAndroid;
   case "input":
     switch (target.type) {
     case "button":
     case "checkbox":
     case "file":
     case "image":
     case "radio":
     case "submit":
       return false
     }
     return !target.disabled && !target.readOnly;
   default:
     return /\bneedsfocus\b/.test(target.className)
   }
 };
 FastClick.prototype.sendClick = function (targetElement, event) {
   "use strict";
   var clickEvent, touch;
   if (document.activeElement && document.activeElement !== targetElement) {
     document.activeElement.blur()
   }
   touch = event.changedTouches[0];
   clickEvent = document.createEvent("MouseEvents");
   clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
   clickEvent.forwardedTouchEvent = true;
   targetElement.dispatchEvent(clickEvent)
 };
 FastClick.prototype.determineEventType = function (targetElement) {
   "use strict";
   if (deviceIsAndroid && targetElement.tagName.toLowerCase() === "select") {
     return "mousedown"
   }
   return "click"
 };
 FastClick.prototype.focus = function (targetElement) {
   "use strict";
   var length;
   if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time") {
     length = targetElement.value.length;
     targetElement.setSelectionRange(length, length)
   } else {
     targetElement.focus()
   }
 };
 FastClick.prototype.updateScrollParent = function (targetElement) {
   "use strict";
   var scrollParent, parentElement;
   scrollParent = targetElement.fastClickScrollParent;
   if (!scrollParent || !scrollParent.contains(targetElement)) {
     parentElement = targetElement;
     do {
       if (parentElement.scrollHeight > parentElement.offsetHeight) {
         scrollParent = parentElement;
         targetElement.fastClickScrollParent = parentElement;
         break
       }
       parentElement = parentElement.parentElement
     } while (parentElement)
   }
   if (scrollParent) {
     scrollParent.fastClickLastScrollTop = scrollParent.scrollTop
   }
 };
 FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {
   "use strict";
   if (eventTarget.nodeType === Node.TEXT_NODE) {
     return eventTarget.parentNode
   }
   return eventTarget
 };
 FastClick.prototype.onTouchStart = function (event) {
   "use strict";
   var targetElement, touch, selection;
   if (event.targetTouches.length > 1) {
     return true
   }
   targetElement = this.getTargetElementFromEventTarget(event.target);
   touch = event.targetTouches[0];
   if (deviceIsIOS) {
     selection = window.getSelection();
     if (selection.rangeCount && !selection.isCollapsed) {
       return true
     }
     if (!deviceIsIOS4) {
       if (touch.identifier === this.lastTouchIdentifier) {
         event.preventDefault();
         return false
       }
       this.lastTouchIdentifier = touch.identifier;
       this.updateScrollParent(targetElement)
     }
   }
   this.trackingClick = true;
   this.trackingClickStart = event.timeStamp;
   this.targetElement = targetElement;
   this.touchStartX = touch.pageX;
   this.touchStartY = touch.pageY;
   if (event.timeStamp - this.lastClickTime < this.tapDelay) {
     event.preventDefault()
   }
   return true
 };
 FastClick.prototype.touchHasMoved = function (event) {
   "use strict";
   var touch = event.changedTouches[0],
     boundary = this.touchBoundary;
   if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
     return true
   }
   return false
 };
 FastClick.prototype.onTouchMove = function (event) {
   "use strict";
   if (!this.trackingClick) {
     return true
   }
   if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
     this.trackingClick = false;
     this.targetElement = null
   }
   return true
 };
 FastClick.prototype.findControl = function (labelElement) {
   "use strict";
   if (labelElement.control !== undefined) {
     return labelElement.control
   }
   if (labelElement.htmlFor) {
     return document.getElementById(labelElement.htmlFor)
   }
   return labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
 };
 FastClick.prototype.onTouchEnd = function (event) {
   "use strict";
   var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
   if (!this.trackingClick) {
     return true
   }
   if (event.timeStamp - this.lastClickTime < this.tapDelay) {
     this.cancelNextClick = true;
     return true
   }
   this.cancelNextClick = false;
   this.lastClickTime = event.timeStamp;
   trackingClickStart = this.trackingClickStart;
   this.trackingClick = false;
   this.trackingClickStart = 0;
   if (deviceIsIOSWithBadTarget) {
     touch = event.changedTouches[0];
     targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
     targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent
   }
   targetTagName = targetElement.tagName.toLowerCase();
   if (targetTagName === "label") {
     forElement = this.findControl(targetElement);
     if (forElement) {
       this.focus(targetElement);
       if (deviceIsAndroid) {
         return false
       }
       targetElement = forElement
     }
   } else if (this.needsFocus(targetElement)) {
     if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === "input") {
       this.targetElement = null;
       return false
     }
     this.focus(targetElement);
     this.sendClick(targetElement, event);
     if (!deviceIsIOS || targetTagName !== "select") {
       this.targetElement = null;
       event.preventDefault()
     }
     return false
   }
   if (deviceIsIOS && !deviceIsIOS4) {
     scrollParent = targetElement.fastClickScrollParent;
     if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
       return true
     }
   }
   if (!this.needsClick(targetElement)) {
     event.preventDefault();
     this.sendClick(targetElement, event)
   }
   return false
 };
 FastClick.prototype.onTouchCancel = function () {
   "use strict";
   this.trackingClick = false;
   this.targetElement = null
 };
 FastClick.prototype.onMouse = function (event) {
   "use strict";
   if (!this.targetElement) {
     return true
   }
   if (event.forwardedTouchEvent) {
     return true
   }
   if (!event.cancelable) {
     return true
   }
   if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
     if (event.stopImmediatePropagation) {
       event.stopImmediatePropagation()
     } else {
       event.propagationStopped = true
     }
     event.stopPropagation();
     event.preventDefault();
     return false
   }
   return true
 };
 FastClick.prototype.onClick = function (event) {
   "use strict";
   var permitted;
   if (this.trackingClick) {
     this.targetElement = null;
     this.trackingClick = false;
     return true
   }
   if (event.target.type === "submit" && event.detail === 0) {
     return true
   }
   permitted = this.onMouse(event);
   if (!permitted) {
     this.targetElement = null
   }
   return permitted
 };
 FastClick.prototype.destroy = function () {
   "use strict";
   var layer = this.layer;
   if (deviceIsAndroid) {
     layer.removeEventListener("mouseover", this.onMouse, true);
     layer.removeEventListener("mousedown", this.onMouse, true);
     layer.removeEventListener("mouseup", this.onMouse, true)
   }
   layer.removeEventListener("click", this.onClick, true);
   layer.removeEventListener("touchstart", this.onTouchStart, false);
   layer.removeEventListener("touchmove", this.onTouchMove, false);
   layer.removeEventListener("touchend", this.onTouchEnd, false);
   layer.removeEventListener("touchcancel", this.onTouchCancel, false)
 };
 FastClick.notNeeded = function (layer) {
   "use strict";
   var metaViewport;
   var chromeVersion;
   var blackberryVersion;
   if (typeof window.ontouchstart === "undefined") {
     return true
   }
   chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
   if (chromeVersion) {
     if (deviceIsAndroid) {
       metaViewport = document.querySelector("meta[name=viewport]");
       if (metaViewport) {
         if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
           return true
         }
         if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
           return true
         }
       }
     } else {
       return true
     }
   }
   if (deviceIsBlackBerry10) {
     blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
     if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
       metaViewport = document.querySelector("meta[name=viewport]");
       if (metaViewport) {
         if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
           return true
         }
         if (document.documentElement.scrollWidth <= window.outerWidth) {
           return true
         }
       }
     }
   }
   if (layer.style.msTouchAction === "none") {
     return true
   }
   return false
 };
 FastClick.attach = function (layer, options) {
   "use strict";
   return new FastClick(layer, options)
 };
 if (true) {
   !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
     "use strict";
     return FastClick
   }).call(exports, __webpack_require__, exports, module),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
 } else if (typeof module !== "undefined" && module.exports) {
   module.exports = FastClick.attach;
   module.exports.FastClick = FastClick
 } else {
   window.FastClick = FastClick
 }
 })();
 
 
 /***/ }),
 /* 8 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_RESULT__;/*
  * zepto fx 模块
  */
 
 !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
     ;(function($, undefined) {
         var prefix = '',
             eventPrefix, endEventName, endAnimationName,
             vendors = {
                 Webkit: 'webkit',
                 Moz: '',
                 O: 'o'
             },
             document = window.document,
             testEl = document.createElement('div'),
             supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
             transform,
             transitionProperty, transitionDuration, transitionTiming, transitionDelay,
             animationName, animationDuration, animationTiming, animationDelay,
             cssReset = {}
 
         function dasherize(str) {
             return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase()
         }
 
         function normalizeEvent(name) {
             return eventPrefix ? eventPrefix + name : name.toLowerCase()
         }
 
         $.each(vendors, function(vendor, event) {
             if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
                 prefix = '-' + vendor.toLowerCase() + '-'
                 eventPrefix = event
                 return false
             }
         })
 
         transform = prefix + 'transform'
         cssReset[transitionProperty = prefix + 'transition-property'] =
             cssReset[transitionDuration = prefix + 'transition-duration'] =
             cssReset[transitionDelay = prefix + 'transition-delay'] =
             cssReset[transitionTiming = prefix + 'transition-timing-function'] =
             cssReset[animationName = prefix + 'animation-name'] =
             cssReset[animationDuration = prefix + 'animation-duration'] =
             cssReset[animationDelay = prefix + 'animation-delay'] =
             cssReset[animationTiming = prefix + 'animation-timing-function'] = ''
 
         $.fx = {
             off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
             speeds: {
                 _default: 400,
                 fast: 200,
                 slow: 600
             },
             cssPrefix: prefix,
             transitionEnd: normalizeEvent('TransitionEnd'),
             animationEnd: normalizeEvent('AnimationEnd')
         }
 
         $.fn.animate = function(properties, duration, ease, callback, delay) {
             if ($.isFunction(duration))
                 callback = duration, ease = undefined, duration = undefined
             if ($.isFunction(ease))
                 callback = ease, ease = undefined
             if ($.isPlainObject(duration))
                 ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
             if (duration) duration = (typeof duration == 'number' ? duration :
                 ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
             if (delay) delay = parseFloat(delay) / 1000
             return this.anim(properties, duration, ease, callback, delay)
         }
 
         $.fn.anim = function(properties, duration, ease, callback, delay) {
             var key, cssValues = {},
                 cssProperties, transforms = '',
                 that = this,
                 wrappedCallback, endEvent = $.fx.transitionEnd,
                 fired = false
 
             if (duration === undefined) duration = $.fx.speeds._default / 1000
             if (delay === undefined) delay = 0
             if ($.fx.off) duration = 0
 
             if (typeof properties == 'string') {
                 // keyframe animation
                 cssValues[animationName] = properties
                 cssValues[animationDuration] = duration + 's'
                 cssValues[animationDelay] = delay + 's'
                 cssValues[animationTiming] = (ease || 'linear')
                 endEvent = $.fx.animationEnd
             } else {
                 cssProperties = []
                     // CSS transitions
                 for (key in properties)
                     if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
                     else cssValues[key] = properties[key], cssProperties.push(dasherize(key))
 
                 if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
                 if (duration > 0 && typeof properties === 'object') {
                     cssValues[transitionProperty] = cssProperties.join(', ')
                     cssValues[transitionDuration] = duration + 's'
                     cssValues[transitionDelay] = delay + 's'
                     cssValues[transitionTiming] = (ease || 'linear')
                 }
             }
 
             wrappedCallback = function(event) {
                 if (typeof event !== 'undefined') {
                     if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
                     $(event.target).unbind(endEvent, wrappedCallback)
                 } else
                     $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout
 
                 fired = true
                 $(this).css(cssReset)
                 callback && callback.call(this)
             }
             if (duration > 0) {
                 this.bind(endEvent, wrappedCallback)
                     // transitionEnd is not always firing on older Android phones
                     // so make sure it gets fired
                 setTimeout(function() {
                     if (fired) return
                     wrappedCallback.call(that)
                 }, (duration * 1000) + 25)
             }
 
             // trigger page reflow so new elements can animate
             this.size() && this.get(0).clientLeft
 
             this.css(cssValues)
 
             if (duration <= 0) setTimeout(function() {
                 that.each(function() {
                     wrappedCallback.call(this)
                 })
             }, 0)
 
             return this
         }
 
         testEl = null
     })(Zepto);
 }).call(exports, __webpack_require__, exports, module),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 9 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
   comment: 城市定位逻辑
 */
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(loadjs, _cookie) {
 
   // QQ浏览器内置定位功能逻辑
   var qq_geolocation = {
       // 判断是否是QQ-LBS-API支持的QQ浏览器及版本
       is_support_QQBrowser: function() {
           var userAgent = navigator.userAgent;
           var QQ_BROWSER_FLAG = "MQQBrowser/";
           var index = userAgent.indexOf(QQ_BROWSER_FLAG);
 
           if (index === -1) {
               return false;
           }
 
           var browserInfo = userAgent.substr(index, 14);
           var browserInfoArr = browserInfo.split("/");
           var browserVersion = parseFloat(browserInfoArr[1]);
           var isAndroid = userAgent.indexOf("Android");
           var isIos = userAgent.indexOf("Mac");
 
           if ((isAndroid !== -1) && (browserVersion >= 5.4)) {
               return true;
           }
           if ((isIos !== -1) && (browserVersion >= 5.0)) {
               return true;
           }
           return false;
       },
       getGeoLocation: function(__self) {
               loadjs("//jsapi.qq.com/get?api=app.getGeoLocation", function() {
                   try {
                       browser.app.getGeoLocation(__self.getPosSuccess.bind(__self), __self.getPosError.bind(__self));
                   } catch (exc) {
                       console.error("Invoke the browser.app.getGeoLocation throws an exception:" + exc);
                       __self.getPosError(false);
                   }
               }); //end loadjs
           } //end getGeoLocation
   }; // end qq_geolocation
 
 
   return {
       //开始进行geolocation定位时的提示信息
       show_tips_now_geo_locationing: function() {
           console.log('now geolocation locationing ...');
       },
       after_geo_location: function() {
           console.log('after geolocation location.');
       },
       geo_location_fail: function() {
           console.log('geolocation location fail!');
       },
       get_city_suc_from_coords: function(citydata) {
           console.log('根据经纬度查询城市信息成功！');
           console.log('城市信息是:' + JSON.stringify(citydata));
       },
       get_city_fail_from_coords: function() {
           console.log('根据经纬度查询城市信息失败！');
       },
       err_handle_permission_denied: function(oldcity) {
           console.log('查询地理位置信息失败：您拒绝了共享位置信息');
       },
       err_handle_position_unavailable: function(oldcity) {
           console.log("查询地理位置信息失败：无法获取当前位置");
       },
       err_handle_timeout: function(oldcity) {
           console.log("查询地理位置信息失败：获取位置超时");
       },
       err_handle_unknown_reanson: function(oldcity) {
           console.log("查询地理位置信息失败：未知错误");
       },
       get_city_suc_from_ip: function(citydata) {
           console.log('根据ip查询城市信息成功！');
           console.log('城市信息是:', citydata);
       },
       get_city_fail_from_ip: function() {
           console.log('根据ip查询城市信息失败！');
       },
       //获取当前位置
       getCurrPos: function(conf) {
           console.log('begin getCurrPos');
 
           var isQQbrowser = qq_geolocation.is_support_QQBrowser();
           if (isQQbrowser) { //如果是QQ-LBS-API支持的QQ浏览器
               var __self = this;
               qq_geolocation.getGeoLocation(__self);
 
           } else if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(this.getPosSuccess.bind(this), this.getPosError.bind(this), {
                   timeout: 10000,
                   maximumAge: 60000,
                   enableHighAccuracy: true
               });
               this.after_geo_location();
           } else {
               this.geo_location_fail();
           }
       }, //end of getCurrPos
       //成功后储存位置数据,执行跳转或显示
       getPosSuccess: function(pos) {
           console.log('定位成功');
           // 此处 this指向的window对象
           var lat = 0,
               lon = 0;
           if (pos.coords) {
               lat = pos.coords.latitude;
               lon = pos.coords.longitude;
           } else if (pos.ret) {
               // QQ-LBS coords data
               lat = pos.latitude;
               lon = pos.longitude;
           } else {
               var qqRetErr = {};
               qqRetErr.code = '';
               this.getPosError(qqRetErr);
           }
 
           var service_url = "//" + _rootDomainNoProtocol + "/location/?l=" + lat + "&d=" + lon;
           var self = this;
           $.ajax({
               type: 'get',
               url: service_url,
               cache: false,
               dataType: 'json',
               success: function(data) {
                   //var citydata = eval('(' + data + ')');
                   var citydata = data;
                   if (typeof citydata == "object" && citydata.listname.length) {
                       if (window.localStorage) {
                           var saveDate = new Date();
                           try {
                               localStorage.setItem("locationDate", saveDate.getDate());
                               localStorage.setItem("myLat", lat);
                               localStorage.setItem("myLon", lon);
 
                               var nowDate = new Date();
                               var exprise = new Date(nowDate.getTime() + 3600000);
 
                               $.cookie.set('myLat', lat, exprise);
                               $.cookie.set('myLon', lon, exprise);
                               //true 国内  false国外
                               $.cookie.set('ishome', citydata.ishome, null);
                               localStorage.setItem("myCity", citydata.listname);
                               localStorage.setItem("myCityName", citydata.cityname);
                           } catch (err) {
                               // @todo iPhone5&5C此处有问题
                           } //enf of try catch
                       } //end of if localStorage
                   } //end of if citydata
                   self.get_city_suc_from_coords(citydata);
                   //alert("您所在的城市是："+citydata.cityname);
               },
               timeout: 10000,
               error: function() {
                   self.get_city_fail_from_coords();
               }
           });
       },
       //失败后显示错误信息
       getPosError: function(err) {
           console.log('定位失败');
           // 此处 this指向的window对象，直接this.createTips会报错。
           var oldcity = ____json4fe.locallist[0].listname;
           switch (err.code) {
               case err.PERMISSION_DENIED:
                   this.err_handle_permission_denied(oldcity);
                   break;
               case err.POSITION_UNAVAILABLE:
                   this.err_handle_position_unavailable(oldcity);
                   break;
               case err.TIMEOUT:
                   this.err_handle_timeout(oldcity);
                   break;
               default:
                   this.err_handle_unknown_reanson(oldcity);
                   break;
           }
       },
       getCityIp: function(denied) {
           console.log('根据ip');
           var self = this;
           var ipserverurl = "//" + _rootDomainNoProtocol + "/ipservice/";
           $.ajax({
               url: ipserverurl,
               dataType: 'jsonp',
               cache: false,
               success: function(data) {
                   var ipCityData = data;
                   //ipCityData.listname是-1的时候ip定位失败
                   if (typeof ipCityData == "object" && ipCityData.listname && ipCityData.localname && ipCityData.listname != -1 && ipCityData.localname != -1) {
                      $.cookie.set('ishome', ipCityData.ishome, null);
                       //如果浏览器支持本地储存，即把数据存入本地
                       if (window.localStorage) {
                           try {
                               var saveDate = new Date();
                               localStorage.setItem("locationDate", saveDate.getDate());
                               localStorage.setItem("myCity", ipCityData.listname);
                               localStorage.setItem("myCityName", ipCityData.localname);
                           } catch (err) {
                               // @todo 如果localStorage存储失败
                           }
                       }
                       // denied == true, 用户拒绝浏览器定位后采取 ip 定位方案
                       denied ? self.get_city_suc_from_ip(ipCityData, denied) : self.get_city_suc_from_ip(ipCityData);
                   } else {
                       self.get_city_fail_from_ip();
                   }
               },
               timeout: 10000,
               error: function() {
                   self.get_city_fail_from_ip();
               }
           });
       },
       handle_localStorage_hascity: function() {
           console.log('handle_localStorage_hascity');
       },
       //初始化并执行定位操作
       posInit: function() {
           if (!localStorage.getItem('locationDate')) {
               this.getCurrPos();
           } else {
               var nowDate = new Date();
               if (nowDate.getDate() == localStorage.getItem('locationDate') && localStorage.getItem('myCity').length) {
                   this.handle_localStorage_hascity();
               } else {
                   this.getCurrPos();
               }
           }
       }
   }; //end of return
   //
   //
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 10 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
   return function (url, callback) {
     function onload() {
       var readyState = script.readyState;
       if (typeof readyState == 'undefined' || /^(loaded|complete)$/.test(readyState)) {
         script.onload = script.onreadystatechange = null;
         script = null;
         callback && callback();
       }
     }
     var script = document.createElement('script');
     script.async = true;
     if (script.readyState) {
       script.onreadystatechange = onload;
     } else {
       script.onload = onload;
     }
     script.src = url;
     var parent = document.getElementsByTagName('head')[0] || document.body;
     parent.appendChild(script) && (parent = null);
   }
 }).call(exports, __webpack_require__, exports, module),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 11 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
   //弹出白色背景样式的弹窗   alertShowWrite(标题信息，信息内容，按钮数量，按钮名称1，按钮名称2，按钮1方法，按钮2方法)
 function alertShowWrite(mes_title,message,button_num,button_left,button_right, leftbut_fn, rightbut_fn){
  if (!$("#alertbg_write").length) {
       var alertHtml = "<div id='alertbg_write' style=\" width: 100%; position: fixed; top:0px; left: 0px; z-index: 2000;  font-family: '黑体';background: rgba(102,102,102,.5) \"></div>" 
       + "<div id=\"alertbox_write\">" +"<div id=\"alert_title\">标题信息</div>" +  "<div id=\"alert_content\">信息内容</div>" + "<div id=\"butdiv_write\">" +
         "</div></div>";
       $("body").append(alertHtml);
       var body_height = $("body").css("height");
       $("#alertbg_write").css("height", body_height);
     } else {
       $("#butdiv_write").empty();
     }
     $("#alert_title").text(mes_title);
      $("#alert_content").text(message);
 
     if (button_num == "1") {
       $("#butdiv_write").show();
       var leftbut = "<div id=\"button1\">" + button_left + "</div>";
       $("#butdiv_write").append(leftbut);
       $("#button1").css("width", "100%");
       $("#button1").bind("click", function() {
         leftbut_fn();
       });
     }
     if (button_num == "2") {
       $("#butdiv_write").show();
       var ttbut = "<div id=\"button1\">" + button_left + "</div><div id=\"button2\">" + button_right + "</div>";
       $("#butdiv_write").append(ttbut);
       $("#button1").bind("click", function() {
         leftbut_fn();
       });
       $("#button2").bind("click", function() {
         $('#alert_bg').remove();
         $('#alert_box').remove();
         rightbut_fn();
       });
     }
     if (typeof button_num == "undefined") {
       $("#butdiv_write").hide();
     }
     $("#alertbg_write").show();
     $("#alertbox_write").show();
     var y = parseInt($("#alertbox_write").get().clientHeight) / 2;
 
     $("#alertbox_write").css("margin-top", -y + "px");
     $("#butdiv_write > div").bind("touchstart", function() {
       $(this).addClass("but_hover");
     });
     $("#but_div > div").bind("touchmove", function() {
       $(this).removeClass("but_hover");
     });
     $("#but_div > div").bind("touchend", function() {
       $(this).removeClass("but_hover");
     });
     $("#alert_bg").bind("touchmove", function(e) {
       e.preventDefault();
     });
     $("#alert_box").bind("touchmove", function(e) {
       e.preventDefault();
     });
     $("#alertbg_write").bind("touchmove", function(e) {
       e.preventDefault();
     });
   }
 
   //通用弹出层 alertShow(显示文字，按钮数量，按钮名称1，按钮名称2，按钮1方法,按钮2方法)
   function alertShow(meg, but_num, but_left, but_right, left_fn, right_fn) {
     if (!$("#alert_bg").length) {
       var alertHtml = "<div id='alert_bg' style=\" width: 100%; position: absolute; top:0px; left: 0px; z-index: 2000; background: rgba(0, 0, 0, 0.1)\"></div>" + "<div id=\"alert_box\" style=\"z-index: 2001\">" + "<div id=\"show_mes\">信息</div>" + "<div id=\"but_div\">" +
         //"<div id=\"but01\" onclick=\"mes(1)\">按钮1</div>" +
         //"<div id=\"but02\" onclick=\"mes(2)\">按钮2</div>" +
         "</div></div>";
       $("body").append(alertHtml);
       var body_height = $("body").css("height");
       $("#alert_bg").css("height", body_height);
     } else {
       $("#but_div").empty();
     }
     $("#show_mes").text(meg);
     if (but_num == "1") {
       $("#but_div").show();
       var lebut = "<div id=\"but01\">" + but_left + "</div>";
       $("#but_div").append(lebut);
       $("#but01").css("width", "100%");
       $("#but01").bind("click", function() {
         left_fn();
       });
     }
     if (but_num == "2") {
       $("#but_div").show();
       var ttbut = "<div id=\"but01\">" + but_left + "</div><div id=\"but02\">" + but_right + "</div>";
       $("#but_div").append(ttbut);
       $("#but01").bind("click", function() {
         left_fn();
       });
       $("#but02").bind("click", function() {
         $('#alert_bg').remove();
         $('#alert_box').remove();
         right_fn();
       });
     }
     if (typeof but_num == "undefined") {
       $("#but_div").hide();
     }
     $("#alert_bg").show();
     $("#alert_box").show();
     var y = parseInt($("#alert_box").get().clientHeight) / 2;
     $("#alert_box").css("margin-top", -y + "px");
     $("#but_div > div").bind("touchstart", function() {
       $(this).addClass("but_hover");
     });
     $("#but_div > div").bind("touchmove", function() {
       $(this).removeClass("but_hover");
     });
     $("#but_div > div").bind("touchend", function() {
       $(this).removeClass("but_hover");
     });
     $("#alert_bg").bind("touchmove", function(e) {
       e.preventDefault();
     });
     $("#alert_box").bind("touchmove", function(e) {
       e.preventDefault();
     });
   }
 //原黑色通用弹出层 alertShowBlack(显示文字，按钮数量，按钮名称1，按钮名称2，按钮1方法,按钮2方法)
   function alertShowBlack(meg, but_num, but_left, but_right, left_fn, right_fn) {
     if (!$("#Mess_bg").length) {
       var alertHtml = "<div id='Mess_bg' style=\" width: 100%; position: absolute; top:0px; left: 0px; z-index: 2000; background: rgba(0, 0, 0, 0.1)\"></div>" + "<div id=\"Mess_box\" style=\"z-index: 2001\">" + "<div id=\"Mshow_mes\">信息</div>" + "<div id=\"Messbut_div\">" +
         //"<div id=\"mbut1\" onclick=\"mes(1)\">按钮1</div>" +
         //"<div id=\"mbut2\" onclick=\"mes(2)\">按钮2</div>" +
         "</div></div>";
       $("body").append(alertHtml);
       var body_height = $("body").css("height");
       $("#Mess_bg").css("height", body_height);
     } else {
       $("#Messbut_div").empty();
     }
     $("#Mshow_mes").text(meg);
     if (but_num == "1") {
       $("#Messbut_div").show();
       var lebut = "<div id=\"mbut1\">" + but_left + "</div>";
       $("#Messbut_div").append(lebut);
       $("#mbut1").css("width", "100%");
       $("#mbut1").bind("click", function() {
         left_fn();
       });
     }
     if (but_num == "2") {
       $("#Messbut_div").show();
       var ttbut = "<div id=\"mbut1\">" + but_left + "</div><div id=\"mbut2\">" + but_right + "</div>";
       $("#Messbut_div").append(ttbut);
       $("#mbut1").bind("click", function() {
         left_fn();
       });
       $("#mbut2").bind("click", function() {
         $('#Mess_bg').remove();
         $('#Mess_box').remove();
         right_fn();
       });
     }
     if (typeof but_num == "undefined") {
       $("#Messbut_div").hide();
     }
     $("#Mess_bg").show();
     $("#Mess_box").show();
     var y = parseInt($("#Mess_box").get().clientHeight) / 2;
     $("#Mess_box").css("margin-top", -y + "px");
     $("#Messbut_div > div").bind("touchstart", function() {
       $(this).addClass("but_hover");
     });
     $("#Messbut_div > div").bind("touchmove", function() {
       $(this).removeClass("but_hover");
     });
     $("#Messbut_div > div").bind("touchend", function() {
       $(this).removeClass("but_hover");
     });
     $("#Mess_bg").bind("touchmove", function(e) {
       e.preventDefault();
     });
     $("#Mess_box").bind("touchmove", function(e) {
       e.preventDefault();
     });
   }
 
   function exit_58() {
     window.location.href = "/logout/";
   }
 
   function cancel_but() {
     $("#alert_bg").hide();
     $("#alert_box").hide();
   }
 //白色弹出框的关闭
   function cancel_button() {
     $("#alertbg_write").hide();
     $("#alertbox_write").hide();
   }
   function cancel_mbtn() {
     $("#Mess_bg").hide();
     $("#Mess_box").hide();
   }
   //A链接点击效果
   function a_init() {
     $("a").bind("touchstart", function() {
       if (!$(this).hasClass("disabled")) {
         $(this).addClass("hover1");
       }
     });
     $("a").bind("touchmove", function() {
       //$(this).removeClass("hover");
       $(this).removeClass("hover1");
     });
     $("a").bind("touchend", function() {
       //$(this).removeClass("hover");
       $(this).removeClass("hover1");
     });
     $("a").bind("touchcancel", function() {
       //$(this).removeClass("hover");
       $(this).removeClass("hover1");
     });
   }
 
   //判断是否是微信客户端
   function is_weixin() {
     var ua = navigator.userAgent.toLowerCase();
     if (ua.match(/MicroMessenger/i) == "micromessenger") {
       return true
     } else {
       return false
     }
   } //end of is_weixin
 
   function GetURLString(name) {
     var regex = new RegExp("[?&]" + encodeURIComponent(name) + "\\=([^&#]+)");
     var value = (location.search.match(regex) || ["", ""])[1];
     return decodeURIComponent(value);
   }
 
 
 
 
   //export to global
   window.alertShowWrite=alertShowWrite;
   window.alertShowBlack=alertShowBlack;
   window.cancel_button=cancel_button;
   window.alertShow = alertShow;
   window.cancel_but = cancel_but;
   window.cancel_mbtn=cancel_mbtn;
   window.exit_58 = exit_58;
   window.a_init = a_init;
   window.is_weixin = is_weixin;
 
 
   return {
     cancel_button:cancel_button,
     alertShowWrite:alertShowWrite,
     alertShowBlack:alertShowBlack,
     alertShow: alertShow,
     cancel_but: cancel_but,
     cancel_mbtn:cancel_mbtn,
     exit_58: exit_58,
     a_init: a_init,
     is_weixin: is_weixin,
     GetURLString:GetURLString
 
   }
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 12 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){
   return function(func, wait, options) {
     var context, args, result;
     var timeout = null;
     var previous = 0;
     if (!options) options = {};
     var later = function() {
       previous = options.leading === false ? 0 : +new Date;
       timeout = null;
       result = func.apply(context, args);
       if (!timeout) context = args = null;
     };
     return function() {
       var now = + new Date;
       if (!previous && options.leading === false) previous = now;
       // 计算剩余时间
       var remaining = wait - (now - previous);
       context = this;
       args = arguments;
      if (remaining <= 0 || remaining > wait) {
         if (timeout) {
           clearTimeout(timeout);
           timeout = null;
         }
         previous = now;
         result = func.apply(context, args);
         if (!timeout) context = args = null;
       } else if (!timeout && options.trailing !== false) {
         timeout = setTimeout(later, remaining);
       }
       return result;
     };
   };
 }).call(exports, __webpack_require__, exports, module),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
 
 /***/ }),
 /* 13 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(j4fe) {
 //列表页banner模块,下线的时候去pkg文件里不要引用该模块就行，更换banner或者跳转url的时候在该模块下开发
   function setListBanner(){
     this.dataList=$(".data-list");//列表信息box
     this.naveHeight=$("#nav-filter").height();//导航栏高度
     this.cityName=j4fe.city.listname;
     this.locationHref=window.location.href;
     this.zhuantiURL="//gongyu.m.58.com/guarante/listing?guarante=1&cityCode="+j4fe.city.listname;
     this.config = {//banner配置
       // 'bj': [//北京显示
       // 	{
       // 		jumpUrl:this.judgeOs(this.zhuantiURL),//点击banner跳转的url处理逻辑，这里需要判断加参数
       // 		imgUrl:"//img.58cdn.com.cn/olympia/img/house/list/apartment/banner-102.jpg",//bannerurl
       // 		tongjiTag:"from=fcm_gylist_baozhangbanner"//banner埋点
       // 	}
       // ],
       // 'cd': [//北京显示
       // 	{
       // 		jumpUrl:this.judgeOs(this.zhuantiURL),//点击banner跳转的url处理逻辑，这里需要判断加参数
       // 		imgUrl:"//img.58cdn.com.cn/olympia/img/house/list/apartment/banner-102.jpg",//bannerurl
       // 		tongjiTag:"from=fcm_gylist_baozhangbanner"//banner埋点
       // 	}
       // ],
       'all': [//全量显示
         // {
         // 	jumpUrl: location.protocol+"//gongyu.m.58.com/guide",//点击banner跳转的url
         // 	imgUrl:"//img.58cdn.com.cn/olympia/img/house/list/apartment/zhuanti.png",//bannerurl
         // 	tongjiTag:"from=58_m_ppgyg_list_banner"//banner埋点
         // },
         // {
         // 	jumpUrl: location.protocol+"//activityhouse.m.58.com/spluck/mainvenue?from=58mppgy",//点击banner跳转的url
         // 	imgUrl:"//img.58cdn.com.cn/zt/house/chunyun2017/images/cy2017m_banner.jpg",//bannerurl
         // 	tongjiTag:""//banner埋点
         // }
       ]
     };
   }
   setListBanner.prototype={
     init: function(){
       var dataResult = this.getCityData(this.config,this.cityName);
       this.setDom(dataResult);
     },
     getCityData: function(objData,cityName){//判断城市
       var cityData = objData[cityName];
       if(cityData){
         cityData = cityData.concat(objData['all']);
       }
       else{
         cityData = objData['all']
       }
       return cityData;
     },
     judgeOs:function(url){//判断当前URL里面是否有os参数
       if(this.locationHref.indexOf("os=")==-1){
         return url;
       }else{
         return url+"&os="+this.getUrlParam("os");
       }
     },
     getUrlParam:function(name) {//从url里面获取参数值
       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
       var r = window.location.search.substr(1).match(reg);	//匹配目标参数
       if (r != null) 
         return unescape(r[2]);
       return null; //返回参数值
     },
     setDom:function(dataArr){//创建dom结构
       var dataArrList="";
       if(dataArr.length==0){
         if(__device != ""){
           $(".house-content").css({'margin-top':'1.25rem'});
         }
         return;
       }
       for(var i=0;i<dataArr.length;i++){
         dataArrList +='<li>'+
                 '<a onclick="clickLog('+"'"+dataArr[i].tongjiTag+"'"+')" href="'+dataArr[i].jumpUrl+'">'+
                   '<img src="'+dataArr[i].imgUrl+'" alt="">'+
                 '</a>'+
               '</li>';
       }
       var bannerBox = "<div class='gy_banner'>"+
                 "<ul>"+dataArrList+"</ul>"+
                 "<div class='banner_icon'></div>"+
               "</div>";
       this.dataList.before(bannerBox);
 
       //判断banner个数，如果大于2个就进行轮播，如果是一张就不轮播
       var liLenght=$(".gy_banner ul li").length;
       if(liLenght>1){
         var listNumberBox="";
         for(var i=0;i<liLenght;i++){
           listNumberBox += "<i class=''></i>";
         }
         $(".banner_icon").append(listNumberBox);
         $('.banner_icon i').eq(0).addClass('active');
       }
 
       if(__device != "") {
         $(".gy_banner").css({"margin-top": "1.55rem"});
       }
     }
   }
   new setListBanner().init();
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
 
 
 /***/ }),
 /* 14 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  comment: 列表页搜索
  */
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
 
     var _rootDomain = '//'+location.hostname+'/';
     var key_arr = [];
     var key_url_arr = [];
     var souFloatDis = false;
     var cityid = "";
     var cateid = "";
     var citylist = "";
     var catelist = "";
     var catename = "";
     var keyfrom = "";
 
     function tabDataSave() {
         var listType = ____json4fe.catentry[1].listname;
         switch (listType) {
             case "house":
                 cateid = "1";
                 catelist = "house";
                 catename = "房产信息";
                 keyfrom = "channel";
                 break;
             case "pinpaigongyu":
                 cateid = "70134";
                 catelist = "pinpaigongyu";
                 catename = "品牌公寓";
                 keyfrom = "list";
                 break;
             default:
                 cateid = "0";
                 catelist = "sou";
                 catename = "sou";
                 keyfrom = "";
         }
         $(".search_container").removeClass("hide");
         $(".body_container").addClass("hide");
          if ($('#keyWords1').length) {
             $('#keyWords1').get(0).focus();
         }
     }
 
 
 
     function TipWindow(containerID, keywordID, buttonID, pageType, oldvalue, scroll, catesou, tipvalue, bcate) {
         this.containerID = containerID;
         this.keywordID = keywordID;
         this.pageType = pageType;
         this.cacheinputvalue = {};
         this.oldvalue = oldvalue;
         this.scroll = scroll;
         this.catesou = catesou;
         this.tipvalue = tipvalue;
         this.bcate = bcate;
         
          if (typeof ____json4fe != 'undefined') {
             var j = ____json4fe,
                 m = j.modules;
             var city = j.locallist && j.locallist.length ? j.locallist[0] : j.locallist;
             if (____json4fe.catentry.name == "sou") {
                 var cate = j.catentry && j.catentry.length ? j.catentry[Math.min(j.catentry.length - 1, 1)] : j.catentry;
             }
             //优化m端搜索逻辑 类别搜增加query分析
             else {
                 var cate = j.catentry && j.catentry.length ? j.catentry[Math.min(j.catentry.length - 1, 1)] : j.catentry;
                 if (j.catentry && j.catentry.length) {
                     if (____json4fe.catentry[0].listname == "job" || ____json4fe.catentry[0].listname == "jianzhi") {
                         var cate = j.catentry.length ? j.catentry[0] : j.catentry;
                     }
                 }
             }
             cityid = city.dispid;
             cateid = cate.dispid;
             citylist = city.listname;
             catelist = cate.listname;
             catename = cate.name;
             keyfrom = _keyfrom;
             if (typeof cate.listname == "undefined") {
                 catelist = "sou";
                 catename = "sou";
             }
         }
 
         $('#searchUrl').bind("click", tabDataSave);
         
         this.cancel = function () {
             $(".search_container").addClass("hide");
             $(".body_container").removeClass("hide");
         }
 
         //取推荐词
         this.getData = function (e) {
             showHis = true;
             var v = $('#' + this.keywordID).val();
             //搜索框优化 增加删除按钮
             if (trim(v).length == 0 || v == "") {
                $("#delBtnInput").addClass("hide");
             } else {
                $("#delBtnInput").removeClass("hide");
             }
         };
         removeUrlKeyPair = function (url, ref) {
             var str = "";
             if (url.indexOf('?') != -1) {
                 str = url.substr(url.indexOf('?') + 1);
             } else {
                 return url;
             }
             var arr = "";
             var returnurl = "";
             var setparam = "";
             if (str.indexOf('&') != -1) {
                 arr = str.split('&');
                 for (i in arr) {
                     if (arr[i].split('=')[0] != ref) {
                         returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                     }
                 }
                 return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
             } else {
                 arr = str.split('=');
                 if (arr[0] == ref) {
                     return url.substr(0, url.indexOf('?'));
                 } else {
                     return url;
                 }
             }
         };
         //URL判断?或&
         addUrlKey = function (o, p) {
             var o = removeUrlKeyPair(o, "from");
             var addurl = o.lastIndexOf("?");
             if (addurl != "-1") {
                 var addurl = o + "&" + p;
             } else {
                 var addurl = o + "?" + p;
             }
             return addurl;
         };
 
         //解决列表页搜索词条二次点击的问题 展示完历史记录后getData方法不再执行
         var showHis = false;
         this.focus = function () {
             //焦点移入时
             var v = $('#' + this.keywordID).val();
             if (v.length != 0 || v != "") {
               $("#delBtnInput").removeClass("hide");
             }
         };
         this.blur = function () {
           //焦点离开时          
         };
         //搜索框二次优化 输入框聚焦后上移
         //搜索框优化 删除按钮的功能
         this.delEvent = function (obj) {
             pre(obj).value = "";
             $("#delBtnInput").addClass("hide");
         };
 
         function createHistory() {
             //判断url中是否有key, 有则计入缓存数组中
             var keyParam = getUrlParam("key");
             if (keyParam != "" && keyParam != undefined && keyParam != null) {
                 saveMes(keyParam);
             }
 
             var show_key = [], iLen = 0, htmlstr = '<div id="history-tit" class="padding-l title">历史搜索<i id="delBtn" class="iicon del-btn"></i></div><ul id="history-mes" class="padding-l history-msg">';
 
             //历史搜索
             if (localStorage.getItem("gySouArrKey")) {
                 show_key = localStorage.getItem("gySouArrKey").split(",");
                 iLen = show_key.length;
 
                 if (iLen > 5) {
                     iLen = 5;
                 }
                 for (var i = 0; i < iLen; i++) {
                     //过滤script标签
                     // show_key[i]=show_key[i].replace(/[<\/>()]/ig,"");
                     htmlstr += '<li class="iicon h-item"><a href="javascript:;" onclick="win.toSearch($(this).text());">' + show_key[i].replace(/\</g, '&lt;').replace(/\>/g, '&gt;') + '</a></li>';
                 }
             }
 
             htmlstr += '</ul>';
 
             if (iLen != 0) {
                 $('#keyWords1').val(show_key[0]);
                 $(".search_ajax").append(htmlstr);
             }
 
             //清楚搜索记录
             $('#delBtn').on("click", function() {
                 $(".search_ajax").html("");
                 localStorage.removeItem('gySouArrKey');
             });
 
         }
         this.submit = function (f) {
 
             var v = $('#' + this.keywordID).val();
             v = v || '';
             v = v.replace(/([^\u0391-\uFFE5a-zA-Z0-9@#\+\-_\. ])/ig, '').replace(/(^\s*)|(\s*$)/g, '');
             if (v == "" || v == this.tipvalue || v == undefined) {
                 $('#' + this.keywordID).val("");
             }
             this.toSearch(v);
             return false;
         };
         this.getsearchurl = function (citylist, catelist, v) {
             if (catelist != "sou" && v != undefined) {
                 //优化m端搜索逻辑 类别搜增加query分析
                 _rootDomain = '//m.58.com';
                 var url = _rootDomain + "/" + citylist + "/" + catelist + "/sou?key=" + v;
                 return url;
             }else {
                 _rootDomain = '//m.58.com';
                 var url = _rootDomain + "/" + citylist + "/" + catelist + "/";
                 return url
             }
         };
         
         this.toSearch = function (v) {
             var url = this.getsearchurl(citylist, catelist, v);
             if (catelist == "pinpaigongyu") {
                //本类搜
                 //优化m端搜索逻辑 类别搜增加query分析
                 var newurl = removeUrlKeyPair(url, "from");
                 var form_dl_sub = "from=list_" + catelist + "_sou";
                 var newurl = addUrlKey(newurl, form_dl_sub);
 
                 jumpToUrl(newurl, _keyfrom, v);
             } 
         };
 
         //存储搜索信息
         var saveMes = function (o) {
             try {
                 if (localStorage.getItem("gySouArrKey")) { //localStorage.gySouArrKey
                     sou_key_arr = localStorage.getItem("gySouArrKey").split(",");
                     var new_sou_key_arr = saveArr(o, sou_key_arr);
                     localStorage.setItem('gySouArrKey',new_sou_key_arr.join(","));
                 } else { //step
                     // o=o.replace(/[<\/>()]/ig, '');
                     o=o.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
                     key_arr[0] = o;
                     localStorage.gySouArrKey = key_arr.join(",");
 
                 }
             } catch (e) {
             }
         };
         //存储数组
         var saveArr = function (o, p) {
             var arr = p;
             for (var i = 0; i < arr.length; i++) {
                 if (o == arr[i]) {
                     arr.splice(i, 1);
                 }
             }
             //o=o.replace(/[<\/>()]/ig, '');
             o=o.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
             var arr_num = arr.unshift(o);
             if (arr_num > 5) {
                 arr.pop();
             }
             return arr;
         };
         //去前后空格
 
         function trim(str) {
             return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
         }
         jumpToUrl = function (o, p, q) {
 
             //未输入，确定时
             if (q == undefined) {
                 window.location.href = o;
                 return;
             }
             
             // 记录搜索词
             o = o.replace("/sou","");
             var kkey = trim(q);
             saveMes(kkey);
 
             //去重+标示
             var o = removeUrlKeyPair(o, "keyfrom");
             var newurl_wh = o.lastIndexOf("?");
             if (newurl_wh != "-1") {
                 var search_to = o + "&keyfrom=" + p;
             } else {
                 var search_to = o + "?keyfrom=" + p;
             }
 
             //搜索框优化 url增加标志keyfrom
             window.location.href = search_to;
         };
 
         if (catename == "sou" || catename == "品牌公寓") { 
             
             // 创建搜索记录
             createHistory();
         }
 
     }
 
 
     function getUrlParam (name) {
         var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
         var result = window.location.search.substr(1).match(reg);
         return result?decodeURIComponent(result[2]):null;
     }
 
     function pre(obj) {
         return obj.previousElementSibling || obj.previousSibling;
     }
     //return TipWindow;
     //搜索全局变量
     window.win = new TipWindow("search_ajax", "keyWords1", "", "1", "请输入关键字", true, false, "请输入关键字");
 
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 /***/ }),
 /* 15 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0),__webpack_require__(2), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(cookie, imgLazyload, app_jump) {
     var loader = {};
     var noop = function() {};
     var getPageNum = function() {
         var pnPath = /pn(\d+)/.exec(location.pathname);
 
         return parseInt((pnPath && pnPath[1]) || 1, 10);
     };
     loader.settings = {
         getUrl: null,
         preload: false,
         dataType: 'text/html',
         ajaxSuccess: null,
         renderHtml: function(data) {
             return Object.prototype.toString.call(data);
         },
         hasFirstPage: true,
         loadBtn: '.loadbtn',
         loadSection: '.data-list',
         timeout: 10000,
         btnHtml: {
             ready: '加载更多',
             loading: '<span class="loading">正在加载...</span>',
             error: '加载失败，请点击重试',
             complete: '没有更多信息了'
         },
         callbacks: {
             ready: noop,
             beforeLoad: noop,
             afterLoad: noop,
             success: noop,
             onAppend: noop
         }
     };
     loader.$btn = null;
     loader.$section = null;
     loader.pageNum = getPageNum();
     loader.urlPattern = '';
     loader.cache = '';
     loader.state = 'ready';
     loader.hasRelated = false;
     loader.initialize = function(settings) {
         var pn = 0,
             url = '';
         app_jump.init($(".house-content").find("li[pagenum='1']"));
         loader.settings = $.extend({}, loader.settings, settings);
         pn = loader.pageNum + (loader.settings.hasFirstPage ? 1 : 0)
         loader.$btn = $(loader.settings.loadBtn);
         loader.$section = $(loader.settings.loadSection);
         loader.offset = $('#offset').data('value') || '';
         if (typeof loader.settings.getUrl === 'function') {
             loader.getLoadUrl = loader.settings.getUrl;
         }
         loader.urlPattern = function() {
             return loader.getLoadUrl();
         };
         url = loader.urlPattern().replace('{0}', pn);
         if (loader.settings.preload && $(".none-house-lost").length == 0) loader.load(url);
 
         $(window).on("scroll", function() {
         　　var scrollTop = $(this).scrollTop(), scrollHeight = $(document).height(), windowHeight = $(this).height();
         　　if(scrollTop + windowHeight == scrollHeight && $(loader.settings.loadBtn).length != 0) {
         　　　　var pn = loader.pageNum + (loader.settings.hasFirstPage ? (loader.settings.preload ? 2 : 1) : 0),
                 url = loader.urlPattern().replace('{0}', pn);
                 loader.load(url);
         　　}
         })
         loader.$btn.on('click', function(e) {
             var pn = loader.pageNum + (loader.settings.hasFirstPage ? (loader.settings.preload ? 2 : 1) : 0),
                 url = loader.urlPattern().replace('{0}', pn);
             loader.load(url);
         });
     };
     loader.reset = function () {
         var pn = getPageNum() + 1, url = loader.getLoadUrl().replace('{0}', pn);
         loader.cache = '';
         loader.settings = $.extend({}, loader.settings, settings);
         loader.$btn = $(loader.settings.loadBtn);
         loader.$section = $(loader.settings.loadSection);
         loader.urlPattern = loader.getLoadUrl();
         loader.state = 'ready';
         loader.$btn.removeClass('disabled');
 
         if (loader.settings.preload) loader.load(url);
         loader.pageNum = getPageNum();
         related.initialize();
 
     };
     loader.getLoadUrl = function() {
         var urlPattern = '', pHref = 'https://m.58.com/bj/pinpaigongyu/', pathname = location.pathname, search = location.search, regExp = /(pn\d{1,10})/.test(pathname);
 
         if (pathname != "" && !regExp) {
           var s = search + (search ? '&' : '?') + 'segment=true'+'&encryptData='+ ____json4fe.encryptData + (____json4fe.referer?'&referer='+ ____json4fe.referer:'')+(loader.offset?'&offset='+ JSON.stringify(loader.offset):''), p = "";
           p = pathname.substr(pathname.length-1) == "/" ? pathname : pathname + "/";
           p = p + "pn{0}/";
           urlPattern = pHref.replace(pathname, p);
           urlPattern = search == "" ? urlPattern + s : urlPattern.replace(search, s);
         }else {
             urlPattern = pHref;
         }
         return urlPattern;
     };
     loader.load = function(url) {
         if (loader.state === 'complete') return false;
         if (loader.state === 'loading') return false;
         if (loader.settings.preload && loader.cache) {
 
             loader.appendHtml(loader.cache);
             loader.pageNum++;
         }
         var trackNum=loader.pageNum+1;
         loadMorePage("pagenum="+trackNum);
         loader.setLoadingState();
         try {
             loader.settings.callbacks.beforeLoad(loader);
         } catch (error) {}
         $.ajax({
             url: url,
             type: 'GET',
             dataType: 'text/html',
             timeout: loader.settings.timeout,
             success: function(jqXHR, textStatus) {
                 var html = '';
                 try {
                     loader.settings.callbacks.afterLoad(loader);
                 } catch (error) {}
                 if (textStatus === 'success') {
                     //大图列表
                     // html = $(jqXHR).find('.data-list .itemli');
                     //小图列表
                     html = $(jqXHR).find('.data-list .item');
                     loader.offset = $(jqXHR).filter('#offset').data('value') || '';
                     var len = html.length;
                     if(len == 0) {
                         loader.setCompleteState();
                         return false;
                     }
                     if (!html) {
                         loader.setCompleteState();
                         loader.settings.callbacks.success(loader);
                         return false;
                     }
                     if (loader.settings.preload) {
                         loader.cache = html;
                     } else {
                         loader.appendHtml(html, trackNum);
                         loader.pageNum++;
                     }
                     loader.settings.callbacks.success(loader);
 
                     loader.setReadyState();
                 } else if (textStatus === 'timeout') {
                     loader.setErrorState();
                 } else {
                     loader.setErrorState();
                 }
 
             }
         });
     };
     loader.appendHtml = function(html, pn) {
         loader.settings.callbacks.onAppend(loader);
         loader.$section.append(html);
         app_jump.init($(".house-content").find("li[pagenum='"+pn+"']"));
         loader.hasRelated = false;
         imgLazyload.init();
         if (loader.settings.preload) loader.cache = '';
     };
     loader.setReadyState = function() {
         loader.state = 'ready';
         loader.$btn.html(loader.settings.btnHtml.ready);
         loader.settings.callbacks.ready(loader);
     };
     loader.setLoadingState = function() {
         loader.state = 'loading';
         loader.$btn.html(loader.settings.btnHtml.loading);
     };
     loader.setErrorState = function() {
         loader.state = 'error';
         loader.$btn.html(loader.settings.btnHtml.error);
     };
     loader.setCompleteState = function() {
         loader.state = 'complete';
         loader.$btn.html(loader.settings.btnHtml.complete);
         loader.$btn.addClass('disabled');
     };
     loader.initialize();
     return loader;
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 16 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * comment: APP环境中品牌公寓列页跳转处理
 */
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(ishttp) {
   var isAppMain = {
     init: function (obj) {
       if (__device != "") {
         //列表帖子跳转及统计
         __device = __device == "iphone" ? "ios" : __device;
         var catename = ____json4fe.catentry[1].name;
         var displayId = ____json4fe.catentry[1].dispid;
 
         obj.find("a").on("click", function (e) {
           var _thisA = $(this);
           var _thisHref = _thisA.attr("app-href");
           var appJumpUrl=ishttp.judegURL(_thisHref);
           WBAPP.loadPage('link', appJumpUrl, catename);
           WBAPP.setWebLog("click", "list", "1,"+displayId);
         });
 
         //native端判断是否登录。跳转到个人中心按钮的处理
         $(".a-mine").on("click", function () {
           var appJumpUrl = $(this).attr("app-href");
           appJumpUrl=ishttp.judegURL(appJumpUrl);
           WBAPP.isLogin(function(data){
             var s = data["state"];
             if(s){//模板里面判断+接口判断
               WBAPP.loadPage('link', appJumpUrl, catename);
               WBAPP.setWebLog("click", "list", "1,"+displayId);
             }else {
               WBAPP.openMobileLogin(function(state){
                 if(state==0){
                   window.location.reload();
                   WBAPP.loadPage('link', appJumpUrl, catename);
                   WBAPP.setWebLog("click", "list", "1,"+displayId);
                 }
               });
             }
           });
         });
 
         //筛选跳转及统计
         $(".box-nav-shangquan, .box-panel-3, .subwayBox, .areaBox, .f-box-rent, .f-box-type").on("click", "li a", function () {
           var _thisA = $(this), _thisHref = _thisA.attr("app-href"), thisTxt = [_thisA.text()];
           console.log(_thisHref);
           if (_thisHref != null && _thisHref.indexOf("os=") == -1) {
              _thisHref = _thisHref+"&os="+__device;
              _thisHref = _thisHref.replace("&&", "&");
           }
           _thisHref = 70134 == displayId && _thisHref.indexOf("m.58.com") == -1 ? "//m.58.com"+_thisHref : _thisHref;
           var appJumpUrl=ishttp.judegURL(_thisHref);
           WBAPP.loadPage('link', appJumpUrl, catename);
           WBAPP.setWebLog("click", "list", "1,"+displayId, thisTxt);
           $(".house-nav li").removeClass("icon-arrow-up");
           $(".house-filter").addClass("hide");
           $("#mask").hide();
         });
       }
     }
   }
   return isAppMain;
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 17 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//判断当前url是http还是https 是否有域名存在，拼接完整的url
 
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
   function ishttp(){
     this.localURL=window.location.href;
     this.localHOST=window.location.host;
     this.reg=/^http:/g;
     this.isHTTP=this.reg.test(this.localURL)
   }
   ishttp.prototype={
     judegURL:function(url){
       console.log(this.isHTTP);
       if(this.isHTTP){//默认是http的请求。
         var a=url.substr(0,5);//匹配http:的截取
         var b=url.substr(0,2);//匹配//的截取
         var c=url.substr(0,1);
         if (a=="http:") {
           return url;
         }else if(b=="//"){
           return "http:"+url;
         }else if(c=="/"){
           return "http://"+this.localHOST+url;
         }else{
           return url
         }
       }else{//https的请求
         var a=url.substr(0,5);//匹配http:的截取
         var b=url.substr(0,2);//匹配//的截取
         var c=url.substr(0,1);
         if (a=="http:") {
           return "https:"+url.substr(5);
         }else if(b=="//"){
           return "https:"+url;
         }else if(c=="/"){
           return "https://"+this.localHOST+url;
         }else{
           return url
         }
       }
     }
   }
   var obj=new ishttp();
   return obj;
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
 
 
 /***/ }),
 /* 18 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * comment: 公寓列表城市选择
 */
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(jRange) {
     $(function () {
       var cityListClass = $(".city-list"), body_container = $(".body_container"), hideStr = "hide"; 
        $(".city").on("click", function () {
            cityListClass.removeClass(hideStr);
            body_container.addClass(hideStr);
        });
        $("#back").on("click", function () {
            cityListClass.addClass(hideStr);
            body_container.removeClass(hideStr);
        })
     })
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 
 /***/ }),
 /* 19 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 *comment: 品质公寓列表轮播
 */
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(20)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(Swipe) {
 
    /* if ($('.gy_banner ul li').length == 0) {
         $('.gy_banner').remove();
     } else if ($('.gy_banner ul li').length == 1) {
         $('.banner_icon').remove();
         return;
     }else{
         $('.banner_icon i').first().addClass('active');
     }*/
     //$(".banner_icon i").first().addClass("active");
     $(function() {
         new Swipe($('.gy_banner').get(0), {
             startSlide: 0,
             speed: 400,
             auto: 30000,
             continuous: true,
             autoRestart:true,
             disableScroll: false,
             stopPropagation: false,
             callback: function(index, elem) {
                 $('.banner_icon i').eq(index).addClass('active').siblings().removeClass('active');
             }
         });
     });
     var width = window.screen.width;
     $(".banner_icon i").on("click", function () {
         var index = $(this).index();
         if (index == 1) {
             $($(".gy_banner ul li")[index]).css({'width': width+'px', 'left': '0px', 'transition-duration': '0ms', 'transform': 'translate(0px, 0px) translateZ(0px)'});
         }else {
             $($(".gy_banner ul li")[index]).css({'width': width+'px', 'left': '-'+width+'px', 'transition-duration': '0ms', 'transform': 'translate(0px, 0px) translateZ(0px)'});
         }
         
     })
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 /***/ }),
 /* 20 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  * 基于Swipe 2.0.6和另外一个分支(https://github.com/lyfeyaj/swipe)进行部分修正，修正内容：
  * 1、当幻灯片个数小于3时，幻灯片切换时的回调函数的参数index不对；
  * 2、自动播放时，当手动滑动幻灯片之后，自动播放功能不起作用；
  * 3、当对幻灯片绑定点击时，如果用click则有300ms延迟；如果用tap则会有点透现象，提供了tap的回调函数函数，处理点透和延迟问题；
  *
  * Brad Birdsall & Felix Liu
  * Copyright 2013, MIT License
  * 初始版本：https://github.com/thebird/Swipe
  * 另一个分支：https://github.com/lyfeyaj/swipe
  */
 ;(function (root, factory) {
   if (true) {
     // AMD. Register as an anonymous module.
     !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){
       return factory();
     }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
   } else if (typeof exports === 'object') {
     // Node. Does not work with strict CommonJS, but
     // only CommonJS-like environments that support module.exports,
     // like Node.
     module.exports = factory();
   } else {
     // Browser globals
     root.Swipe = factory();
   }
 }(this, function () {
 
   var root = this;
   var _document = root.document;
 
   function Swipe(container, options) {
 
         "use strict";
 
         // utilities
         var noop = function() {}; // simple no operation function
         var offloadFn = function(fn) {
             setTimeout(fn || noop, 0)
         }; // offload a functions execution
 
         // check browser capabilities
         var browser = {
             addEventListener: !!root.addEventListener,
             touch: ('ontouchstart' in root) || root.DocumentTouch && _document instanceof DocumentTouch,
             transitions: (function(temp) {
                 var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
                 for (var i in props) {
                     if (temp.style[props[i]] !== undefined) {
                         return true;
                     }
                 }
                 return false;
             })(_document.createElement('swipe'))
         };
 
         // quit if no root element
         if (!container) {
             return;
         }
         var element = container.children[0];
         var slides, slidePos, width, length, oriLen;
         options = options || {};
         var index = parseInt(options.startSlide, 10) || 0;
         var speed = options.speed || 300;
         options.continuous = options.continuous !== undefined ? options.continuous : true;
 
         // AutoRestart option: auto restart slideshow after user's touch event
         options.autoRestart = options.autoRestart !== undefined ? options.autoRestart : false;
 
         function setup() {
 
             // cache slides
             slides = element.children;
             length = slides.length;
             //oriLen主要是解决当幻灯片为2个时，会copy两个幻灯片到后面去，当重新setup幻灯片时，length就变成4个，不是真实的length，这样在callback函数及getpos方法返回的index值就不对，因此记录原始的length值
             if (typeof oriLen === 'undefined') {
                 oriLen = length;
             }
             // set continuous to false if only one slide
             if (slides.length < 2) {
                 options.continuous = false;
             }
 
             //special case if two slides
             if (browser.transitions && options.continuous && slides.length < 3) {
                 element.appendChild(slides[0].cloneNode(true));
                 element.appendChild(element.children[1].cloneNode(true));
                 slides = element.children;
             }
 
             // create an array to store current positions of each slide
             slidePos = new Array(slides.length);
 
             // determine width of each slide
             width = container.getBoundingClientRect().width || container.offsetWidth;
 
             element.style.width = (slides.length * width) + 'px';
 
             // stack elements
             var pos = slides.length;
             while (pos--) {
 
                 var slide = slides[pos];
 
                 slide.style.width = width + 'px';
                 slide.setAttribute('data-index', pos);
 
                 if (browser.transitions) {
                     //每一张幻灯片都定位到第index张幻灯片的下面，重叠起来
                     slide.style.left = (pos * -width) + 'px';
                     //把序号大于index的幻灯片都移动到第index+1张幻灯片的位置
                     //把序号小于index的幻灯片都移动到第index-1张幻灯片的位置
                     move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
                 }
 
             }
 
             // reposition elements before and after index
             // 处理初始显示的幻灯片(即第index张幻灯片)前后两张幻灯片的位置
             if (options.continuous && browser.transitions) {
                 //把第index-1张幻灯片移动到第index张幻灯片的左边
                 move(circle(index - 1), -width, 0);
                 //把第index+1张幻灯片移动到第index张幻灯片的右边
                 move(circle(index + 1), width, 0);
             }
 
             if (!browser.transitions) {
                 //如果不支持transitions,移动幻灯片容器的位置来达到显示index幻灯片的效果
                 element.style.left = (index * -width) + 'px';
             }
 
             container.style.visibility = 'visible';
 
         }
 
         function prev() {
 
             if (options.continuous) {
                 slide(index - 1);
             } else {
                 if (index) {
                     slide(index - 1);
                 }
             }
 
         }
 
         function next() {
 
             if (options.continuous) {
                 slide(index + 1);
             } else {
                 if (index < slides.length - 1) {
                     slide(index + 1);
                 }
             }
         }
 
         function circle(index) {
 
             // a simple positive modulo using slides.length
             return (slides.length + (index % slides.length)) % slides.length;
 
         }
 
         function getPos() {
             // Fix for the clone issue in the event of 2 slides
             return index % oriLen;
         }
 
         function slide(to, slideSpeed) {
 
             // do nothing if already on requested slide
             if (index === to) {
                 return;
             }
             if (browser.transitions) {
 
                 var direction = Math.abs(index - to) / (index - to); // 1: backward, -1: forward
 
                 // get the actual position of the slide
                 if (options.continuous) {
                     var natural_direction = direction;
                     direction = -slidePos[circle(to)] / width;
 
                     // if going forward but to < index, use to = slides.length + to
                     // if going backward but to > index, use to = -slides.length + to
                     if (direction !== natural_direction) {
                         to = -direction * slides.length + to;
                     }
 
                 }
 
                 var diff = Math.abs(index - to) - 1;
 
                 // move all the slides between index and to in the right direction
                 while (diff--) {
                     move(circle((to > index ? to : index) - diff - 1), width * direction, 0);
                 }
 
                 to = circle(to);
 
                 //把当前的幻灯片朝direction方向移动一个幻灯片的位置
                 move(index, width * direction, slideSpeed || speed);
                 //把要显示的幻灯片移动到显示位置
                 move(to, 0, slideSpeed || speed);
 
                 if (options.continuous) {
                     //要显示的幻灯片的移动方向的下一张幻灯片移动到下一个位置
                     move(circle(to - direction), -(width * direction), 0); // we need to get the next in place
                 }
             } else {
                 //如果不支持transitions，通过animate函数，移动幻灯片
                 to = circle(to);
                 animate(index * -width, to * -width, slideSpeed || speed);
                 //no fallback for a circular continuous if the browser does not accept transitions
             }
             //滑动方向 
             var slideDirect = to > index ? 'forward' : 'backward';
             index = to;
             //幻灯片切换完成之后，异步执行callback函数
             offloadFn(options.callback && options.callback(getPos(), slides[index]), slideDirect);
         }
 
         //移动第index张幻灯片距离显示框dist距离的位置，动画完成时间是speed ms
         function move(index, dist, speed) {
 
             translate(index, dist, speed);
             //slidePos里面记录的是每一张幻灯片当前最左边距离显示框的距离
             slidePos[index] = dist;
 
         }
 
         function translate(index, dist, speed) {
             var slide = slides[index];
             var style = slide && slide.style;
 
             if (!style) {
                 return;
             }
 
             style.webkitTransitionDuration =
                 style.MozTransitionDuration =
                 style.msTransitionDuration =
                 style.OTransitionDuration =
                 style.transitionDuration = speed + 'ms';
 
             style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
             style.msTransform =
                 style.MozTransform =
                 style.OTransform = 'translateX(' + dist + 'px)';
 
         }
 
         function animate(from, to, speed) {
 
             // if not an animation, just reposition
             if (!speed) {
 
                 element.style.left = to + 'px';
                 return;
 
             }
 
             var start = +new Date();
 
             var timer = setInterval(function() {
 
                 var timeElap = +new Date() - start;
 
                 if (timeElap > speed) {
 
                     element.style.left = to + 'px';
 
                     if (delay) {
                         begin();
                     }
 
                     if (options.transitionEnd) {
                         options.transitionEnd.call(event, getPos(), slides[index]);
                     }
                     clearInterval(timer);
                     return;
 
                 }
 
                 element.style.left = (((to - from) * (Math.floor((timeElap / speed) * 100) / 100)) + from) + 'px';
 
             }, 4);
 
         }
 
 
         // setup auto slideshow
         var delay = options.auto || 0;
         var interval;
 
         function begin() {
 
             interval = setTimeout(next, delay);
 
         }
 
         function stop() {
 
             delay = 0;
             clearTimeout(interval);
 
         }
 
         function restart() {
             stop();
             delay = options.auto || 0;
             begin();
         }
 
         function sendClick(targetElement, event) {
             var clickEvent, touch;
 
             // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
             if (document.activeElement && document.activeElement !== targetElement) {
                 document.activeElement.blur();
             }
 
             touch = event.changedTouches[0];
 
             // Synthesise a click event, with an extra attribute so it can be tracked
             clickEvent = document.createEvent('MouseEvents');
             clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
             clickEvent.animaClick = true;
             //setTimeout是为了sx 魅族手机而这么做，sx魅族梦游，点了半天不反应，等等这个乌龟
             offloadFn(function(){
                 targetElement.dispatchEvent(clickEvent);
             });
            
         }
 
         function isVisible (ele) {
             return  ele.clientWidth !== 0 &&
                 ele.clientHeight !== 0 &&
                 ele.style.opacity !== 0 &&
                 ele.style.visibility !== 'hidden';
         }
         // setup initial vars
         var start = {};
         var delta = {};
         var isScrolling;
 
         // setup event capturing
         var events = {
 
             handleEvent: function(event) {
 
                 switch (event.type) {
                     case 'touchstart':
                         this.start(event);
                         break;
                     case 'touchmove':
                         this.move(event);
                         break;
                     case 'touchend':
                         offloadFn(this.end(event));
                         break;
                     case 'webkitTransitionEnd':
                     case 'msTransitionEnd':
                     case 'oTransitionEnd':
                     case 'otransitionend':
                     case 'transitionend':
                         offloadFn(this.transitionEnd(event));
                         break;
                     case 'resize':
                         // 当container元素宽度隐藏时，不重置轮播图
                         if (isVisible(container)) {
                             offloadFn(setup);
                         }
                         break;
                 }
 
                 if (options.stopPropagation) {
                     event.stopPropagation();
                 }
 
             },
             start: function(event) {
 
                 var touches = event.touches[0];
 
                 // measure start values
                 start = {
 
                     // get initial touch coords
                     x: touches.pageX,
                     y: touches.pageY,
 
                     //记录状态
                     status: 'tapping',
 
                     // store time to determine touch duration
                     time: +new Date()
 
                 };
 
                 // used for testing first move event
                 isScrolling = undefined;
 
                 // reset delta and end measurements
                 delta = {};
 
                 // attach touchmove and touchend listeners
                 // fix 当只有一张幻灯片时，也能触发模拟的click,移除当幻灯片为一张时不绑定touchmove和touchend事件
                 element.addEventListener('touchmove', this, false);
                 element.addEventListener('touchend', this, false);
 
 
             },
             move: function(event) {
 
                 // ensure swiping with one touch and not pinching
                 if (event.touches.length > 1 || event.scale && event.scale !== 1) {
                     return;
                 }
                 //如果当在幻灯片容器内部移动手指时不触发浏览器的滚动，就阻止默认行为，防止浏览器滚动
                 if (options.disableScroll) {
                     event.preventDefault();
                 }
 
                 var touches = event.touches[0];
 
                 // measure change in x and y
                 delta = {
                     x: touches.pageX - start.x,
                     y: touches.pageY - start.y
                 }
 
                 //计算手指移动的距离，超过10认为手指已经移动了
                 var distance = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2));
 
                 if (start.status === 'tapping' && distance > 10) {
                     start.status = 'moving';
                 }
                 // determine if scrolling test has run - one time test
                 if (typeof isScrolling === 'undefined') {
                     //如果x方向移动位移小于y方向的位移，认为是垂直滚动操作
                     isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
                 }
 
                 // if user is not trying to scroll vertically，如果是垂直滚动则幻灯片不操作
                 if (!isScrolling) {
 
                     // prevent native scrolling，阻止横向的滚动
                     event.preventDefault();
 
                     // stop slideshow，如果手指move，先停止幻灯片自动播放
                     stop();
 
                     // increase resistance if first or last slide
                     if (options.continuous) { // we don't add resistance at the end
                         //前一张幻灯片移动delta.x位移
                         translate(circle(index - 1), delta.x + slidePos[circle(index - 1)], 0);
                         //当前幻灯片移动delta.x位移
                         translate(index, delta.x + slidePos[index], 0);
                         //下一张幻灯片移动delta.x位移
                         translate(circle(index + 1), delta.x + slidePos[circle(index + 1)], 0);
 
                     } else {
                         //如果幻灯片已经在首或尾位置，滑动的delta.x要小于手指实际滑动的距离
                         delta.x =
                             delta.x /
                             ((!index && delta.x > 0 // 如果是第一张幻灯片且向左滑动
                                     || index == slides.length - 1 // 或最后一张幻灯片且向右滑动
                                     && delta.x < 0 // and if sliding at all
                                 ) ?
                                 (Math.abs(delta.x) / width + 1) // determine resistance level
                                 : 1); // no resistance if false
 
                         // translate 1:1
                         //前一张幻灯片移动delta.x位移
                         translate(index - 1, delta.x + slidePos[index - 1], 0);
                         //当前幻灯片移动delta.x位移
                         translate(index, delta.x + slidePos[index], 0);
                         //下一张幻灯片移动delta.x位移
                         translate(index + 1, delta.x + slidePos[index + 1], 0);
                     }
 
                 }
 
             },
             end: function(event) {
 
                 //判断手指是否已经移动，如果没移动，执行tap的回调函数,同时为防止click透传，阻止event的缺省行为
                 if (start.status === 'tapping') {
                     //为什么需要tapCallback，因为用click给每个幻灯片绑点击事件，有300ms延迟
 
                     //每一个幻灯片tap点击时的回调函数 
                     options.tapCallback && options.tapCallback(getPos(), slides[index], event);
 
                     //为什么需要阻止默认行为，因为如果不阻止默认行为，需要使用者在tapCallback里来阻止默认行为，如果使用者不这样做，可能导致touch引起的穿透问题，例如tap了之后，跳转一个页面，会穿透到下一个页面；
 
                     //阻止touch默认行为导致的click引起的穿透问题
                     event.preventDefault();
 
                     //为什么需要伪造一个click，因为你上面阻止了touch的默认行为，将不会触发幻灯片上的click事件了，而如果你又在全局对click添加了统计，将会丢失这个click 统计；如果幻灯片里面是个alink，则不需要调用tapCallback进行处理，伪造的click自然会触发链接的跳转，同时跳转时没有300ms延迟
                     
                     //人工伪造并触发一个click事件
                     var targetElement = event.target;
                     sendClick(targetElement, event);
                 }
                 // measure duration
                 var duration = +new Date() - start.time;
 
                 // determine if slide attempt triggers next/prev slide
                 var isValidSlide =
                     Number(duration) < 250 // if slide duration is less than 250ms
                     && Math.abs(delta.x) > 20 // and if slide amt is greater than 20px
                     || Math.abs(delta.x) > width / 2; // or if slide amt is greater than half the width
 
                 // determine if slide attempt is past start and end
                 var isPastBounds = !index && delta.x > 0 // if first slide and slide amt is greater than 0
                     || index == slides.length - 1 && delta.x < 0; // or if last slide and slide amt is less than 0
 
                 if (options.continuous) {
                     isPastBounds = false;
                 }
 
                 // 判断幻灯片需要滑动的方向，(true:左, false:right)
                 var direction = delta.x < 0;
                 //滑动方向
                 var slideDirect = direction ? 'forward' : 'backward';
                 // if not scrolling vertically
                 if (!isScrolling) {
 
                     if (isValidSlide && !isPastBounds) {
 
                         if (direction) {
                             //向左滑动
                             if (options.continuous) { // we need to get the next in this direction in place
                                 //把前一张幻灯片移动到显示框左边
                                 move(circle(index - 1), -width, 0);
                                 move(circle(index + 2), width, 0);
 
                             } else {
                                 //把前一张幻灯片移动到显示框左边
                                 move(index - 1, -width, 0);
                             }
                             //把当前和后一张的幻灯片向左移动
                             move(index, slidePos[index] - width, speed);
                             move(circle(index + 1), slidePos[circle(index + 1)] - width, speed);
                             index = circle(index + 1);
 
                         } else { //手指向右滑动
                             if (options.continuous) { // we need to get the next in this direction in place
                                 //把下一张幻灯片放到显示框右边 
                                 move(circle(index + 1), width, 0);
                                 move(circle(index - 2), -width, 0);
 
                             } else {
                                 move(index + 1, width, 0);
                             }
                             //把当前和前一张幻灯片都向右移动
                             move(index, slidePos[index] + width, speed);
                             move(circle(index - 1), slidePos[circle(index - 1)] + width, speed);
                             index = circle(index - 1);
 
                         }
 
                         if (options.callback) {
                             options.callback(getPos(), slides[index], slideDirect);
                         }
 
                     } else {
                         //如果滑动的位移较小或者触碰到边界，被滑动的幻灯片回弹回去
                         if (options.continuous) {
                             //前一个幻灯片移动到显示框左边，当前移动到显示框内，下一个幻灯片移动到显示框右边
                             move(circle(index - 1), -width, speed);
                             move(index, 0, speed);
                             move(circle(index + 1), width, speed);
 
                         } else {
 
                             move(index - 1, -width, speed);
                             move(index, 0, speed);
                             move(index + 1, width, speed);
                         }
 
                     }
 
                 }
 
                 // kill touchmove and touchend event listeners until touchstart called again
                 element.removeEventListener('touchmove', events, false)
                 element.removeEventListener('touchend', events, false)
 
             },
             transitionEnd: function(event) {
 
                 if (parseInt(event.target.getAttribute('data-index'), 10) == index) {
 
                     if (delay || options.autoRestart) {
                         restart();
                     }
 
                     if (options.transitionEnd) {
                         options.transitionEnd.call(event, getPos(), slides[index]);
                     }
 
                 }
 
             }
 
         }
 
         // trigger setup
         setup();
 
         // start auto slideshow if applicable
         if (delay) {
             begin();
         }
 
 
         // add event listeners
         if (browser.addEventListener) {
 
             // set touchstart event on element
             if (browser.touch) {
                 element.addEventListener('touchstart', events, false);
             }
 
             if (browser.transitions) {
                 element.addEventListener('webkitTransitionEnd', events, false);
                 element.addEventListener('msTransitionEnd', events, false);
                 element.addEventListener('oTransitionEnd', events, false);
                 element.addEventListener('otransitionend', events, false);
                 element.addEventListener('transitionend', events, false);
             }
 
             // set resize event on window
             root.addEventListener('resize', events, false);
 
         } else {
 
             root.onresize = function() {
                 // 当container元素宽度隐藏时，不重置轮播图
                 if (isVisible(container)) {
                     offloadFn(setup);
                 }
             }; // to play nice with old IE
 
         }
 
         // expose the Swipe API
         return {
             setup: function() {
 
                 setup();
 
             },
             restart: function() {
                 restart();
             },
             slide: function(to, speed) {
 
                 // cancel slideshow
                 stop();
 
                 slide(to, speed);
 
             },
             prev: function() {
 
                 // cancel slideshow
                 stop();
 
                 prev();
 
             },
             next: function() {
 
                 // cancel slideshow
                 stop();
 
                 next();
 
             },
             stop: function() {
 
                 // cancel slideshow
                 stop();
 
             },
             getPos: function() {
 
                 // return current index position
                 //return index;
                 return getPos();
 
             },
             getNumSlides: function() {
 
                 // return total number of slides
                 //return length;
                 return oriLen;
             },
             kill: function() {
 
                 // cancel slideshow
                 stop();
 
                 // reset element
                 element.style.width = '';
                 element.style.left = '';
 
                 // reset slides
                 var pos = slides.length;
                 while (pos--) {
 
                     var slide = slides[pos];
                     slide.style.width = '';
                     slide.style.left = '';
 
                     if (browser.transitions) {
                         translate(pos, 0, 0);
                     }
 
                 }
 
                 // removed event listeners
                 if (browser.addEventListener) {
 
                     // remove current event listeners
                     element.removeEventListener('touchstart', events, false);
                     element.removeEventListener('webkitTransitionEnd', events, false);
                     element.removeEventListener('msTransitionEnd', events, false);
                     element.removeEventListener('oTransitionEnd', events, false);
                     element.removeEventListener('otransitionend', events, false);
                     element.removeEventListener('transitionend', events, false);
                     root.removeEventListener('resize', events, false);
 
                 } else {
 
                     root.onresize = null;
 
                 }
 
             }
         }
 
     }
 
 
     if (root.jQuery || root.Zepto) {
          (function($) {
              $.fn.Swipe = function(params) {
                  return this.each(function() {
                      $(this).data('Swipe', new Swipe($(this)[0], params));
                  });
              }
          })(root.jQuery || root.Zepto)
      }
 
     return Swipe;
 }));
 
 
 /***/ }),
 /* 21 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//公寓列表页排序弹窗
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
     function orderModal() {
         this.modalBackdrop = document.getElementsByClassName('order-modal-backdrop')[0];
         this.modalBody = document.getElementsByClassName('slide-in-up')[0];
         this.openModalButton=document.getElementsByClassName('order_open_btn')[0];
     }
     orderModal.prototype = {
         init: function () {
             this.switchModalEvent();
             this.itemClickEvent();
             //兼容低版本app
             if($('.footer-wrap').length){//如果是app环境
                 var versionArr = WBAPP.appVersion.split('.');
                 var isOldVersion = versionArr[0]<7 || (versionArr[0]==7&&versionArr[1]<5);
                 //如果是新版本
                 if(!isOldVersion){
                     //放出底栏
                     $('.footer-wrap')[0].style.visibility = 'inherit';
                     if (this.openModalButton) {
                         this.openModalButton.style.bottom = '15%';
                     }
                 }else{
                     //隐藏底栏
                     $('.load-app')[0].style.marginBottom = 0;
                 }
             }
             if (this.openModalButton) {
                 this.openModalButton.style.display = 'block';
             }
         },
         trim: function (x) {
             return x.replace(/^\s+|\s+$/gm, '');
         },
         addClass: function (element, className) {
             if (element.className.indexOf(className) == -1) {
                 element.className = this.trim(element.className) + ' ' + className;
             }
         },
         removeClass: function (element, className) {
             element.className = element.className.replace(new RegExp('\\b' + className + '\\b'), '');
         },
         switchModalEvent: function () {
             var _this = this;
             this.openModalButton && this.openModalButton.addEventListener('click',_this.openModalFun.bind(_this));
             this.modalBackdrop && this.modalBackdrop.addEventListener('click',_this.closeModalFun.bind(_this));
         },
         itemClickEvent : function () {
             var _this = this;
             $('.order-modal-item').on('click',function () {
                 var href = location.href;
                 var param = $(this).attr('data-query');
                 var oldParem = _this.getUrlParam('sort')
                 if(href.indexOf('sort')>-1){
                     if(param!='0'){
                         href = href.replace('sort='+oldParem,'sort='+param);
                     }else{
                         href = href.replace('&sort='+oldParem,'');
                         href = href.replace('?sort='+oldParem,'');
                     }
                 }else{
                     if(href.slice(-1)=='&' || href.slice(-1)=='?'){
                         href+='sort='+ param;
                     }else{
                         if(href.indexOf('?')>-1){
                             href+='&sort='+ param;
                         }else{
                             href+='?sort='+ param;
                         }
                     }
                 }
                 if (__device != "") {
                     href = href+"&os="+__device;
                     href = href.replace("&&", "&");
                     WBAPP.loadPage('link', href, "品牌公寓");
                 }else {
                     window.location.href = href;
                 }
             })
         },
         openModalFun : function () {
             this.removeClass(this.modalBackdrop, 'hide');
             this.addClass(this.modalBody, 'active');
         },
         closeModalFun : function () {
             this.addClass(this.modalBackdrop, 'hide');
             this.removeClass(this.modalBody, 'active');
         },
         getUrlParam: function(name) {
             var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
             var r = window.location.search.substr(1).match(reg);	//匹配目标参数
             if (r != null) return unescape(r[2]); return null; //返回参数值
         }
     };
     new orderModal().init();
 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
 
 /***/ }),
 /* 22 */
 /***/ (function(module, exports, __webpack_require__) {
 
 var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
    comment: 调起APP,并且进入到list的native页面
 */
 !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
     $(function() {
         var callApp = {
             init:function () {
                 if( this.env() != 'app' ) {
                     setTimeout(()=>{
                         if(!$.cookie.get('gy_app_called')){
                             this.callAppH5();
                         }
                     },500)
                 } else {
                     var appVersion = WBAPP.appVersion;
                     var versionArr = appVersion.split('.');
                     if ( versionArr[0] > 7 ) {
                         this.callNative();
                     } else if ( versionArr[0] == 7  && versionArr[1] > 5 ) {
                         this.callNative();
                     }
                 }
             },
             // 开始调起
             callNative:function () {
                 // console.log( ____json4fe.locallist )
                 // var params = {
                 //     "list_name":"gongyu",
                 //     "cateid":"70134",
                 //     "title":"品牌公寓",
                 //     "full_path":{},
                 //     "meta_url":"https://appgongyu.58.com/house/listing/",
                 //     "use_cache":true,
                 //     "params":{},
                 //     "local_name": ____json4fe.locallist[0].listname
                 // };
                 // var nativeParameter = {
                 //     'action': 'pagetrans',
                 //     'tradeline': 'house',
                 //     'content': {
                 //         'title': '品牌公寓',
                 //         'pagetype': 'list',
                 //         'is_backtomain': true,
                 //         'isfinish': true,
                 //         'list_name': 'gongyu',
                 //         'cateid': "70134",
                 //         'params': {
                 //             'list_from':this.getUrlParam('from')?this.getUrlParam('from'):''
                 //         },
                 //         filterParams: '',
                 //         'meta_url': 'https://appgongyu.58.com/house/listing/gongyu',
                 //         "local_name": ____json4fe.locallist[0].listname
                 //     },
                 // };
                 // params = JSON.stringify( params );
                 // callWbApp("#btnID","other", {
                 //     pid:"",
                 //     jump:'wbmain://jump/house/list?params='+ params
                 // });
                 WBAPP._nativeBridge(____json4fe.apptargetObj);
             },
             // 判断环境
             env: function () {
                 var platform = '';
                 var userAgent = window.navigator.userAgent;
                 if (userAgent.indexOf('WUBA') != -1) {
                     platform = 'app';
                 } else if (userAgent.indexOf('MicroMessenger') != -1) {
                     platform = 'wx';
                 } else {
                     if (document.cookie.indexOf('58ua') != -1) {
                         platform = 'app';
                     } else {
                         platform = 'm';
                     }
                 }
                 return platform;
             },
             callAppH5: function () {
                 $.cookie.set('gy_app_called', true, 1)
                 callWbApp("","other", {
                     jump:'wbmain://jump/core/link?params='+encodeURIComponent('{"url":"'+window.location.href+'","pagetype":"link"}'),  //必填，已知的调起协议,
                     pid: "713"
                 }); 
                 // callWbApp("#btnID", "url", {
                 //     url: window.location.href,
                 //     title: "品牌公寓"
                 // });
             },
             getUrlParam:function(name) {//从url里面获取参数值
                 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                 var r = window.location.search.substr(1).match(reg);	//匹配目标参数
                 if (r != null) 
                     return unescape(r[2]);
                 return null; //返回参数值
             },
         }
 
         callApp.init();
 
 
     });
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
         __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  
 
 /***/ })
 /******/ ]);