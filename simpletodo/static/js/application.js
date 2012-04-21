var todos = new Array();
var refresh_rate = 10000;
var updating = false;

$(document).ready(function () {
    window.setInterval(refresh_todolist, 10000);
    refresh_todolist();
});

function refresh_todolist() {
    if (updating) {
        return;
    }
    updating = true;
    show_loading_indicator();
    $.ajax({
        url: '/todos/list',
        dataType: 'json',
        success: function(data) {
                     update_todo_listing(data);
                     hide_loading_indicator();
                     updating = false;
                 }
        });
}

function update_todo_listing(data) {
    $('.mylog ul').empty();
    for (var todo in data.todos) {
        $("<li>"+data.todos[todo].text+"</li>").appendTo('.mylog ul');
    }
}

function show_loading_indicator() {
    $('#indicator').show();
}

function hide_loading_indicator() {
    $('#indicator').fadeOut('slow');
}
