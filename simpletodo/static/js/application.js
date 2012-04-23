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
        li = $('<li></li>');
        name = $('<span>'+data.todos[todo].text+'</span>').addClass("todo-text");
        due = $('<span>'+data.todos[todo].due+'</span>').addClass("todo-due");

        name.appendTo(li);
        due.appendTo(due);

        li.appendTo('.todo-listing');
    }
}

function show_loading_indicator() {
    $('#indicator').show();
}

function hide_loading_indicator() {
    $('#indicator').fadeOut('slow');
}
