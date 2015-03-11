(function($){
  var ua = navigator.userAgent;
  var isMobile = {
    Android: function () {
        return ua.match(/Android/i) ? true : false;
    },
    BlackBerry: function () {
        return ua.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
        return ua.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function () {
        return ua.match(/IEMobile/i) ? true : false;
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
  };
  var mobi = isMobile.any();

  if(!mobi) {
    var wrap = $('.home-wrap'), baseurl = wrap.data('root');
    var pics = [
      'Bruce Bay', 'Lake Te Anau', 'Lake Tekapo', 'Lake Wakatipu, Queenstown', 'Lake Wanaka', 'Lake Wanaka, No6 Highway', 'Mount Eden, Auckland', 'Queenstown'
    ];

    // 随机背景选择
    var selectBg = function(pic){
      var curPic = pic || pics[Math.ceil(Math.random() * pics.length) - 1];
      var curUrl = baseurl + '/img/bg-' + curPic.toLowerCase().replace(', ', '+').replace(/\s/g, '-') + '.jpg';
      wrap.css('background-image', 'url('+ curUrl +')');

      $(".photo-info span").html('Photo at: <i class="glyphicon glyphicon-map-marker"></i> <a href="https://www.google.com/maps/place/'+ curPic +'" target="new">' + curPic + '</a>');
      return curPic;
    };
    selectBg();

    // 背景名称列表
    var dpMenu = $('.nav .dropdown-menu');
    for(var i = 0, x = pics.length; i < x; i++){
      dpMenu.append($('<li><a href="#">' + pics[i] + '</a></li>'));
    }
    
    dpMenu.on('click', 'a', function(e){
      e.preventDefault();
      var $self = $(this);
      wrap.css('opacity', 0).on('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function(){
        selectBg($self.html());
        $(this).css('opacity', 1);
      });
    });
  } else if(("standalone" in window.navigator) && window.navigator.standalone){
    // If you want to prevent remote links in standalone web apps opening Mobile Safari, change 'remotes' to true
    var noddy, remotes = false;
    
    document.addEventListener('click', function(event) {
      noddy = event.target;
      // Bubble up until we hit link or top HTML element. Warning: BODY element is not compulsory so better to stop on HTML
      while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
        noddy = noddy.parentNode;
      }
      
      if('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes)) {
        event.preventDefault();
        document.location.href = noddy.href;
      }
    
    }, false);
  }

  // 开新窗口的link
  $('.glyphicon-globe+a').attr('target', 'new');

})(jQuery);