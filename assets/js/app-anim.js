(function($){
  $(document).ready(function(){
    // 侧边栏粘性
    $('.sidebar').theiaStickySidebar({
      additionalMarginTop: 90,
      additionalMarginBottom: 20
    });

    // 初始化主题模式
    switch_mode();

    // 夜间/白天模式切换按钮
    $(document).on('click', '.switch-dark-mode', function(event) {
      event.preventDefault();
      $('body').toggleClass('io-black-mode ' + theme.defaultclass);
      switch_mode();
    });

    // 网址快提示
    if (isPC()) {
      $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
    } else {
      $('.qr-img[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
    }

    // tab 滑块菜单
    intoSlider();

    // 页脚粘性处理
    stickFooter();

    // 回到顶部 & 页眉背景
    $(window).scroll(function () {
      if ($(this).scrollTop() >= 50) {
        $('#go-to-up').fadeIn(200);
        $('.big-header-banner').addClass('header-bg');
      } else {
        $('#go-to-up').fadeOut(200);
        $('.big-header-banner').removeClass('header-bg');
      }
    });

    $('.go-up').click(function () {
      $('body,html').animate({ scrollTop: 0 }, 500);
      return false;
    });

    // 侧边栏展开/收起按钮
    $('#mini-button').on('click', function () {
      trigger_lsm_mini(true);
    });
  });

  // 夜间/白天模式切换逻辑
  function switch_mode(){
    const btn = $(".switch-dark-mode");
    const icon = $(".mode-ico");
    const isDark = $('body').hasClass('io-black-mode');

    if (isDark) {
      btn.attr("title", "日间模式");
      icon.removeClass("icon-night").addClass("icon-light");
    } else {
      btn.attr("title", "夜间模式");
      icon.removeClass("icon-light").addClass("icon-night");
    }
  }

  // 侧边栏导航子菜单展开
  $('.sidebar-menu-inner a').on('click', function() {
    if (!$('.sidebar-nav').hasClass('mini-sidebar')) {
      $(this).parent("li").siblings("li.sidebar-item").children('ul').slideUp(200);
      if ($(this).next().css('display') == "none") {
        $(this).next('ul').slideDown(200);
        $(this).parent('li').addClass('sidebar-show').siblings('li').removeClass('sidebar-show');
      } else {
        $(this).next('ul').slideUp(200);
        $(this).parent('li').removeClass('sidebar-show');
      }
    }
  });

  // 侧边栏展开/收起核心函数
  function trigger_lsm_mini(isNoAnim){
    const $sidebar = $('.sidebar-nav');
    const isChecked = $('#mini-button').prop('checked');

    if (!isChecked) {
      $sidebar.removeClass('mini-sidebar');
      $('.sidebar-menu ul ul').css("display", "none");
      if (isNoAnim) {
        $sidebar.removeClass('animate-nav').width(170);
      } else {
        $sidebar.addClass('animate-nav').stop().animate({ width: 170 }, 200);
      }
    } else {
      $('.sidebar-item.sidebar-show').removeClass('sidebar-show');
      $('.sidebar-menu ul').removeAttr('style');
      $sidebar.addClass('mini-sidebar');
      if (isNoAnim) {
        $sidebar.removeClass('animate-nav').width(60);
      } else {
        $sidebar.addClass('animate-nav').stop().animate({ width: 60 }, 200);
      }
    }
  }

  // tab 滑块初始化
  function intoSlider() {
    $(".slider_menu[sliderTab]").each(function() {
      if (!$(this).hasClass('into')) {
        const menu = $(this).children("ul");
        menu.prepend('<li class="anchor" style="position:absolute;width:0;height:28px"></li>');
        const target = menu.find('.active').parent();
        if (target.length) {
          menu.children(".anchor").css({
            left: target.position().left + target.scrollLeft() + "px",
            width: target.outerWidth() + "px",
            height: target.height() + "px",
            opacity: "1"
          });
        }
        $(this).addClass('into');
      }
    });
  }

  // 页脚粘性处理
  function stickFooter() {
    $('.main-footer').attr('style', '');
    if ($('.main-footer').hasClass('text-xs')) {
      const winHeight = $(window).height();
      const footerHeight = $('.main-footer').outerHeight(true);
      const contentHeight = $('.main-footer').position().top + footerHeight;
      const marginTop = winHeight - contentHeight;
      if (marginTop > 0) {
        $('.main-footer').css({ marginTop });
      }
    }
  }

  // 判断是否为PC端
  function isPC() {
    const u = navigator.userAgent;
    const agents = ["Android", "iPhone", "webOS", "BlackBerry", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    return !agents.some(agent => u.indexOf(agent) > 0);
  }
})(jQuery);
