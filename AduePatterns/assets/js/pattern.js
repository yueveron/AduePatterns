var pattern = {
  root : '',
  init : function($navId, $sideBarId, $root){
      if($root){
        pattern.root = $root;
      }
      //
      pattern.initNavBarMenu($navId)
      //
      if($sideBarId != null){
        pattern.initSideBarMenu($sideBarId);
      }else{
        console.log('about-page')
      }
      //
      pattern.initCodeMirror();
  },

  /* Create : Nav UL-Menu */
  initNavBarMenu : function($navId){
      var source = '<div class="nav">'
      +   '<ul>'
      +     '<li class="logo">'
      +       '<div class="box-image">'
      +         '<img src="' + pattern.root +'assets/images/icon_sadmin.png" class="valign-middle">'
      +       '</div>'
      +     '</li>'
      +     '<% for (var i = 0; i < list.length; i ++) { %>'
      +         '<%if (activeId == i) {%>'
      +            '<% className="active" %>'
      +         '<%} else {%>'
      +            '<% className="" %>'
      +         '<% } %>'     
      +         '<li><a href=<%= list[i][1] %> class=<%= className %> ><%= list[i][0] %></a></li>'
      +     '<% } %>'
      +   '</ul>'
      + '</div>';
      var render = template.compile(source);
      var html = render({
          activeId : $navId,
          className : '',
          list: [['组件模块', pattern.root + 'index.html'], ['相关介绍', pattern.root + 'about/index.html']]
          // list: [['组件模块','index.html'], ['JavaScript 插件','jstools/index.html'], ['相关介绍','about/index.html']]
      });
      $('.main-nav').append(html);      
  },

  /* Create : SideBar UL-Menu */
  initSideBarMenu : function($sideBarId){
    sideBar.init($sideBarId);
    sideBar.setSideBar();  
  },

  initCodeMirror : function(){
      var codeInitData = { 
          mode: "text/html",
          lineNumbers: true,
          readOnly : true
      };
      //
      $('.cmEditor').each(function(index, el) {
         var domTextArea = $(el)[0];
         var CodeMirrorEditor = CodeMirror.fromTextArea(domTextArea, codeInitData);
      });
  },

  
}

var sideBar = {
    domParent : $('.main-nav'),
    domSideBar : $('.side-content'),
    ratio : 100,

    init : function($sideBarId){
      // <ul>
      //     <li class="active"><a>页面布局</a></li>
      //     <li><a>分栏</a></li>
      //     <li><a>字体</a></li>
      //     <li><a>表单元素</a></li>
      //     <li><a>导航栏</a></li>
      //     <li><a>列表</a></li>
      //     <li><a>卡牌缩略图</a></li>
      //     <li><a>表格</a></li>
      //     <li><a>弹层对话框</a></li>
      //     <li><a>徽章</a></li>
      //     <li><a>图片</a></li>
      //     <li><a>全局常用</a></li>
      // </ul>
      var source = '<ul>'
      +     '<% for (var i = 0; i < list.length; i ++) { %>'
      +         '<%if (activeId == i) {%>'
      +            '<% className="active" %>'
      +         '<%} else {%>'
      +            '<% className="" %>'
      +         '<% } %>'     
      +         '<li class=<%= className %> ><a href=<%= list[i][1] %>><%= list[i][0] %></a></li>'
      +     '<% } %>'
      +   '</ul>'
      +   '<a href="#top" class="back-to-top"> 返回顶部 </a>';
      var render = template.compile(source);
      var html = render({
          activeId : $sideBarId,
          className : '',
          list: [['页面布局','index.html'], ['分栏系统','gird.html'], ['字体','typography.html'], ['表单元素','forms.html'], ['列表','lists.html'], ['缩略图','thumbnails.html'], ['表格','tables.html'],['导航栏','navigation.html'],['弹层对话框','modal.html'],['便捷 CSS 类','helpers.html'],['实用方法','trick.html']]
      });
      $('.side-content').append(html);
    },                
    
    /* Set SideBar Position : Normal or Fixed */ 
    setSideBar : function(){
        sideBar.onWindowScroll();
    },

    onWindowScroll : function(){
        var scrollDom = "body";
        $(window).scroll(function() {
            var currScrollTop = $(scrollDom).scrollTop();            
            sideBar.setVisible(currScrollTop);
        })
    },

    setVisible : function ($scrollValue){
        if($scrollValue>sideBar.ratio){
            sideBar.domSideBar.addClass('fixed');
        }else{
            sideBar.domSideBar.removeClass('fixed');
        }
    }
}    