(function($){
  var homeJumbo = $('#home-jumbo');
  if(homeJumbo){
    var sn = [], num = 12, index, cur;
    for(var i = 1; i <= num; i++){
      i < 10 ? sn.push('0' + i) : sn.push(i + '');
    }
    index = Math.ceil(Math.random() * num) - 1;
    homeJumbo.css('backgroundImage', 'url(/blog/img/jumbo_' + sn[index] + '.jpg)').fadeIn('slow');
  }
})(jQuery);