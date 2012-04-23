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
        create_todo(data.todos[todoidx]);
    }
}

function create_todo(todo) {
    var todo_id = 'todo-' + todo.id;

    $('<li></li>').attr('class', todo_id).appendTo('.todo-listing');
    $('<span><input type="checkbox" onmouseup="return todo_chg(this);"></span>').appendTo('.'+todo_id);
    $('<span>'+ todo.text +'</span>').addClass("todo-text").appendTo('.'+todo_id);
    $('<span>'+ todo.due +'</span>').addClass("todo-due").appendTo('.'+todo_id);
}

function show_loading_indicator() {
    $('#indicator').show();
}

function hide_loading_indicator() {
    $('#indicator').fadeOut('slow');
}

function todo_chg(element) {
    updating = true;
    classes = $(element).parents('li').eq(0).attr('class').match(/todo-([0-9]+)/);
    if (!classes || classes.length < 2) {
        alert("Wat");
        updating = false;
    }

    var todo_id = parseInt(classes[1]);

    if ($(element).attr('checked') == 'checked') {
        todo_close(todo_id);
    }
    else {
        updating = false;
    }
}

function todo_close(id) {
    $.ajax({
        url: '/todo/close',
        data: {id: id},
        method: 'post',
        dataType: 'json',
        success: function (data) {
            updating = false;
        }
    });
}
