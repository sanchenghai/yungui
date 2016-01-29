$(function(){
  var textarea = $("textarea"),
       gwd_top_shadow = $("#gwd_top_shadow"),
       gwd_top = $("#gwd_top");

  $("#goback").on("click", function(){
    window.history.back();
  });

  textarea.focus(function(){
    gwd_top.hide();
    gwd_top_shadow.hide();
  }).blur(function(){
    gwd_top.show();
    gwd_top_shadow.show();
  });
});

function submit(){
  $(".hint").text('');
  var suggestion = $("textarea").val();
  if(suggestion == ''){
    $(".hint").text('亲，请给出您的建议，会有积分奖励哦~~');
    return;
  }
  $(".hint").text(suggestion);
}