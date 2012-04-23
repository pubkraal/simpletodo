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
    $('.todo-listing').empty();
    for (var todoidx in data.todos) {
        var todo = data.todos[todoidx];
        var todo_id = 'todo-' + todo.id;

        $('<li></li>').attr('class', todo_id).appendTo('.todo-listing');
        $('<span>'+ todo.text +'</span>').addClass("todo-text").appendTo('.'+todo_id);
        $('<span>'+ todo.due +'</span>').addClass("todo-due").appendTo('.'+todo_id);
    }
}

function show_loading_indicator() {
    $('#indicator').show();
}

function hide_loading_indicator() {
    $('#indicator').fadeOut('slow');
}
