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
    console.log("Loading...");
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
    $('<span><input type="checkbox" onchange="return todo_chg(this);"></span>').appendTo('.'+todo_id);
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

    if ($(element).is(':checked')) {
        todo_close(todo_id);
    }
    else {
        updating = false;
    }
}

function todo_close(id) {
    var csrf_token = window.csrf_token;
    $.ajax({
        url: '/todo/close',
        data: {id: id, csrf: csrf_token},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            console.info("Done updating")
            updating = false;
            refresh_todolist();
        }
    });
}

function toggle_add_form() {
    $('#add-todo-form').toggleClass('shown');
    $('.todo-mut-link').toggleClass('shown');
}

function ajax_submit_form(form, clear) {
    updating = true;
    show_loading_indicator();
    $('#form-error').hide();

    $.ajax({
        url: $(form).attr('action'),
        data: $(form).serialize(),
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.status == 'ok' && clear) {
                clear_form(form);
            } else if (data.status == 'error') {
                $('#form-error span').text('Kies een degelijke datum of zo. Eén in de toekomst bijvoorbeeld');
                $('#form-error').show();
            }

            hide_loading_indicator();
            updating = false;
            refresh_todolist();
        }
    });
    return false;
}

function clear_form(form) {
    $(form).children('input[type=text]').attr('value', '');
}
