(function($){
  var homeJumbo = $('#home-jumbo');
  if(homeJumbo){
    var sn = [], num = 12, index, cur;
    for(var i = 1; i <= num; i++){
      i < 10 ? sn.push('0' + i) : sn.push(i + '');
    }
    window.setInterval(function(){
      index < num - 1 ? index++ : index = 0;
      homeJumbo.css('backgroundImage', 'url(/img/jumbo_' + sn[index] + '.jpg)').fadeIn('slow');    
    }, 30000);
  }
})(jQuery);