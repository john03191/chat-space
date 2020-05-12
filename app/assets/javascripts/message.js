$(function(){
  function buildHTML(message)  {
    if (message.image) {
      var html =
      `<div class="datas">
        <div class="datas__name">
          ${message.user_name}
        </div>
        <div class="datas__today">
          ${message.created_at}
        </div>
      </div>
      <div class="messages">
        <p class="messages__message">
          ${message.content}
        </p>
        <img src=${message.image} >
      </div>`
    return html;
  } else {
    var html =
      `<div class="datas">
        <div class="datas__name">
          ${message.user_name}
        </div>
        <div class="datas__today">
          ${message.created_at}
        </div>
      </div>
      <div class="messages">
        <p class="messages__message">
          ${message.content}
        </p>
      </div>
      `
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data) ;
      $('.main-chat').append(html);
      $('.main-chat').animate({ scrollTop: $('.main-chat')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop("disabled", false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  })
});