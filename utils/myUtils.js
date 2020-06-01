// import dayjs from 'dayjs'
//
// /**
//  * 扩展 number原型，增加一些方法
//  */
// Number.prototype.toMS = function () {
//   if (this == null) {
//     return ''
//   } else {
//     let time = this * 1000
//     return dayjs(time).format('mm:ss')
//   }
// }
//
// Number.prototype.formatDate = function () {
//   if (this == null) {
//     return ''
//   } else {
//     let time = this * 1000
//     return dayjs(time).format('YYYY-MM-DD')
//   }
// }
//
// Number.prototype.formatDateFull = function () {
//   if (this == null) {
//     return ''
//   } else {
//     let time = this * 1000
//     return dayjs(time).format('YYYY-MM-DD HH:mm')
//   }
// }
//
// Number.prototype.percent = function () {
//   return (this * 100).toFixed(2) + '%'
// }
// Number.prototype.wan = function () {
//   return this / 10000
// }

/**
 * 图片的阿里 oss 路径，根据当前设备的 dpr 返回不同后缀的路径
 * deviceDpr 为定义在 index.html 中的一个全局变量
 * @param type 传入字符串，现共有四种类型：avatar，banner，thumb，thumb-md
 * @returns {string}
 */
String.prototype.ossImg = function (type) {
  let url = this
  if (myUtils.isNull(url)) {
    return ''
  }

  //获取设备 dpr，用于oss获取不同分辨率的图片
  let deviceDpr = 2
  if (typeof window !== 'undefined') {
    deviceDpr = window.devicePixelRatio
  }

  //根据设备的 dpr 和图片要显示的位置设置不同的请求参数
  switch (type) {
    case 'banner':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_lfit,w_563/quality,Q_85'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_lfit,w_750/quality,Q_90'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_lfit,w_750/quality,Q_95'
      }
      break
    case 'thumb':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_163,h_105/quality,q_80'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_244,h_158/quality,q_85'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_325,h_210/quality,q_85'
      }
      break
    case 'thumb-md':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_164,h_92/quality,q_80'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_246,h_138/quality,q_85'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_328,h_184/quality,q_85'
      }
      break
    case 'avatar':
      if (deviceDpr < 1.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_44,h_44/quality,q_80'
      } else if (1.5 <= deviceDpr < 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_66,h_66/quality,q_85'
      } else if (deviceDpr >= 2.5) {
        url = url.replace('http:', '') + '?x-oss-process=image/auto-orient,1/resize,m_fill,w_88,h_88/quality,q_85'
      }
      break
    default:
      url = url.replace('http:', '')
      break
  }

  return url
}

export default class myUtils {
  /*
  * 日期
  *
  * */
  static getDateNow() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    var week=date.getDay();
    var w;
    switch(week){
      case 0:
        w='星期日';
        break;
      case 1:
        w='星期一';
        break;
      case 2:
        w='星期二';
        break;
      case 3:
        w='星期三';
        break;
      case 4:
        w='星期四';
        break;
      case 5:
        w='星期五';
        break;
      case 6:
        w='星期六';
        break;
    }
    return currentdate + ' ' + w;
  }


  static getEngDate(data) {
    let dt = new Date();
    if(data) {
      dt = new Date(data)
    }
    let m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec"];
    let w=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    let d=["st","nd","rd","th"];
    let mn=dt.getMonth();
    let wn=dt.getDay();
    let dn=dt.getDate();
    let dns;
    if(((dn%10)<1) ||((dn%10)>3)){
      dns=d[3];
    }
    else
    {
      dns=d[(dn%10)-1];
      if((dn==11)||(dn==12)){
        dns=d[3];
      }
    }
    return  m[mn]+ ". " + dn + dns + ". " + dt.getFullYear()
    // return  w[wn-1] + ', ' + m[mn]+ "." + dn + dns + "." + dt.getFullYear()
    // document.write(m[mn]+" "+dn+dns+" " +w[wn-1]+" "+dt.getFullYear());
  }

  /**
   * 动态插入css
   */

  static loadStyle(url) {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
  };
  /**
   * 判断字符串是否为空
   * @param str
   * @returns {boolean}
   */
  static isNull (str) {
    return str == null || str.length === 0 || str === ''
  }

  /**
   *
   * @desc  判断是否为身份证号
   * @param  {String|Number} str
   * @return {Boolean}
   */
  static isIdCard (str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
      str)
  }

  /**
   *
   * @desc   判断是否为手机号
   * @param  {String|Number} str
   * @return {Boolean}
   */
  static isPhoneNum (str) {
    return /^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(str)
  }

  /**
   * 隐藏手机号中间四位
   */
  static hidePhoneNum (phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }

  /**
   *
   * @desc   判断是否为邮箱
   * @param  {String|Number} str
   * @return {Boolean}
   */
  static isMail (str) {
    return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(str)
  }

  /**
   * set 页面 title
   */
  static setTitle (title) {
    document.title = title
  }

  /**
   * 设置cookie,注意cookie有一个域的问题，如果不指定path，cookie可能会存到不同的域下，
   * 这样就可能会导致cookie写入不成功，或者cookie没清掉
   */
  static setCookie (name, value, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = name + '=' + value + '; ' + expires + '; path=/'
  }

  /**
   * 获取cookie
   */
  static getCookie (name) {
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
  }

  /**
   * 清除cookie
   */
  static clearCookie (name) {
    this.setCookie(name, '', -1)
  }

  /**
   * 往 LocalStorage 中存入历史搜索数据
   */
  static setHistorySearchKeys (data) {
    window.localStorage.setItem('historySearchKeys', JSON.stringify(data))
  }

  /**
   * 读取 LocalStorage 中的历史搜索数据
   */
  static getHistorySearchKeys () {
    return JSON.parse(window.localStorage.getItem('historySearchKeys'))
  }

  /**
   * 弹出 toast，传入vue 对象和 msg
   */
  static showToast (vue, msg, duration = 2000) {
    vue.Toast({message: msg, position: 'bottom', duration: duration})
  }

  /**
   * 禁止页面滚动和解除滚动的共用函数，具体看这个文章
   * https://blog.csdn.net/qq_29606781/article/details/67650869
   * 1：相同事件绑定和解除，需要使用共用函数；绑定和解除事件时 事件没有"on" 即onclick写成click
   * 2：共用函数不能带参数；（即下面在调用的时候是用的 this.bodyScroll，不能带()。）
   */
  static bodyScroll (event) {
    event.preventDefault()
  }

  /**
   * 禁止页面滚动，解决弹框出现时 IOS 上滚动穿透的问题
   */
  static forbidBodyScroll () {
    document.getElementsByTagName('body')[0].addEventListener('touchmove', this.bodyScroll, {passive: false})
  }

  /**
   * 解除禁止滚动，解决弹框出现时 IOS 上滚动穿透的问题
   */
  static allowBodyScroll () {
    document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.bodyScroll)
  }

  /**
   * 获取数组中元素的 index
   */
  static getArrIndex(arr, value) {
    let i = arr.length;
    while (i--) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1;
  }

  /**
   * 关掉键盘，并回到页面顶部，以解决iOS 12中键盘收起后页面底部会有一部分空白的问题
   */
  static resetPageInIOS() {
    document.activeElement.blur()
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
  /**
   * 判断是否为空
   */
  static validatenull(val) {
    if (typeof val == 'boolean') {
      return false;
    }
    if (typeof val == 'number') {
      return false;
    }
    if (val instanceof Array) {
      if (val.length == 0) return true;
    } else if (val instanceof Object) {
      if (JSON.stringify(val) === '{}') return true;
    } else {
      if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
      return false;
    }
    return false;
  }

  /**
   * 处理匹配关键词 转移字符
   *
   *
   * */
  static transformStr(string) {
    // ①
    // string为原本要进行匹配的关键词
    // 结果transformString为进行处理后的要用来进行匹配的关键词
    let transformString = string.replace(/[.[*?+^$|()/]|\]|\\/g, '\\$&');
    return new RegExp(transformString, 'i'); // 这里不区分大小写;
  }

  /**
   * 获取节点进行高亮
   *
   * */
  static getAllNodeAndHighlight(string) {
    let pattern = this.transformStr(string);
    console.log(pattern,'pa00000000000000')
    // 高亮逻辑开始...
    let bodyNode = document.getElementById('articleContentIn')
    console.log("bodyNode")
    console.log(bodyNode)
    // 把原始DOM信息再次转化为节点对象
    let bodyChildren = bodyNode.childNodes;
    // 针对内容进行高亮处理
    console.log('-------------------------')
    // console.log(bodyChildren)

    // this.getChildrenTextNode(bodyChildren, pattern)
    for (let i = 0; i < bodyChildren.length; i++) {
      // 这里的pattern就是上述经过处理后的关键词生成的正则，不再赘述了
      console.log(bodyChildren[i])
      this.highlightKeyword(bodyChildren[i], pattern);
    }

  }

  static getChildrenTextNode(parentChildrenNode, pattern) {
    for (let i = 0; i < parentChildrenNode.length; i++) {
      // 这里的pattern就是上述经过处理后的关键词生成的正则，不再赘述了
      if(parentChildrenNode[i].hasChildNodes()) {
        this.getChildrenTextNode(parentChildrenNode[i], pattern)
      }else {
        alert('get')
        alert(parentChildrenNode[i].textContent)
        this.highlightKeyword(parentChildrenNode[i], pattern);
      }
    }

  }

  /**
   * ② 高亮关键字
   * @param node - 节点
   * @param pattern - 用于匹配的正则表达式，就是把上面的pattern传进来
   */
  static highlightKeyword(node, pattern) {
    // console.log('node high--------------------------------')
    // console.log(node)
    // nodeType等于3表示是文本节点
    if (node.nodeType === 3) {
      debugger
      // node.data为文本节点的文本内容
      var matchResult = node.data.match(pattern);
      // console.log('matchResult---')
      // 有匹配上的话
      if (matchResult) {
        console.log('匹配成功------------' + pattern)
        console.log(matchResult)
        // 创建一个span节点，用来包裹住匹配到的关键词内容
        var highlightEl = document.createElement('span');
        // 不用类名来控制高亮，用自定义属性data-*来标识，
        // 比用类名更减少概率与原本内容重名，避免样式覆盖
        highlightEl.dataset.highlight = 'yes';
        // splitText相关知识下面再说，可以先去理解了再回来这里看
        // 从匹配到的初始位置开始截断到原本节点末尾，产生新的文本节点
        var matchNode = node.splitText(matchResult.index);
        console.log("------------------------matchNode-------------")
        console.log(matchNode)
        // 从新的文本节点中再次截断，按照匹配到的关键词的长度开始截断，
        // 此时0-length之间的文本作为matchNode的文本内容
        matchNode.splitText(matchResult[0].length);
        // 对matchNode这个文本节点的内容（即匹配到的关键词内容）创建出一个新的文本节点出来
        var highlightTextNode = document.createTextNode(matchNode.data);
        // 插入到创建的span节点中
        console.log(highlightEl)
        console.log(highlightTextNode)
        highlightEl.appendChild(highlightTextNode);
        // 把原本matchNode这个节点替换成用于标记高亮的span节点
        matchNode.parentNode.replaceChild(highlightEl, matchNode);
      }
    }
    // 如果是元素节点 且 不是script、style元素 且 不是已经标记过高亮的元素
    // 至于要区分什么元素里的内容不是你想要高亮的，可自己补充，这里的script和style是最基础的了
    // 不是已经标记过高亮的元素作为条件之一的理由是，避免进入死循环，一直往里套span标签
    else if ((node.nodeType === 1)  && !(/script|style/.test(node.tagName.toLowerCase())) && (node.dataset.highlight !== 'yes')) {
      // 遍历该节点的所有子孙节点，找出文本节点进行高亮标记
      var childNodes = node.childNodes;
      for (var i = 0; i < childNodes.length; i++) {
        this.highlightKeyword(childNodes[i], pattern);
      }
    }
  }

  /**
   * 关闭高亮
   *
   * */
  static closeHighlight() {
    let highlightNodeList = document.querySelectorAll('[data-highlight=yes]');
    for (let n = 0; n < highlightNodeList.length; n++) {
      let parentNode = highlightNodeList[n].parentNode;
      // 把高亮包裹层里面的文本生成一个新的文本节点
      let textNode = document.createTextNode(highlightNodeList[n].innerText);
      // 用新的文本节点替换高亮的节点
      parentNode.replaceChild(textNode, highlightNodeList[n]);
      // 把相邻的文本节点合成一个文本节点
      parentNode.normalize();
    }
  }

}
