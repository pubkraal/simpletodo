var todos = new Array();
var refresh_rate = 10000;

$(document).ready(function () {
    window.setInterval(refresh_todolist, 10000);
    refresh_todolist();
});

function refresh_todolist() {
    $.ajax({
        url: '/todos/list',
        dataType: 'json',
        success: update_todo_listing
        });
}

function update_todo_listing(data) {
    $("<li>"+data+"</li>").appendTo('.mylog ul');
}
