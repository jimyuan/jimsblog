(function(){
  if(("standalone" in window.navigator) && window.navigator.standalone){
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
  function newWin() {
    var curHost = location.hostname,
        curLink = document.querySelectorAll('.post-content a'),
        reg = new RegExp('^(http|https)://' + curHost), obj;
    for(var i = 0, x = curLink.length; i < x; i ++){
      obj = curLink[i];
      if(!reg.test(obj.href)) {
        obj.target = 'new';
      }
    }
  }
  newWin();

  // 代码块右上角标识
  function codeMark() {
    var blocks = document.querySelectorAll('div[class^=language]');
    for(var i = 0, len = blocks.length; i < len; i++) {
      blocks[i].dataset.sort = blocks[i].classList.value.match(/^language-(\S+)/)[1].toUpperCase()
    }
  }
  codeMark();
})();
