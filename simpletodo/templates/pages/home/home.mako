<%inherit file="../../base/base.html"/>

<div class="add-todo">
    <div class="todo-mut-link shown">
        <a href="#" onclick="return toggle_add_form();">Taak toevoegen</a>
    </div>
    <div id="add-todo-form" class="well">
        <h2>Taak toevoegen</h2>
        <div id="form-error" class="alert alert-error">
            <a class="close" data-dismiss="alert" href="#">×</a>
            <strong>Hey, joh!</strong>
            <span>Niets te zien.</span>
        </div>
        <form method="post" action="/todo/store" onsubmit="return ajax_submit_form(this, true);" class="form-search">
            <input type="hidden" name="csrf" value="${session.get('csrf', '')}">
            <input type="text" name="text" placeholder="task">
            <input type="text" name="due" placeholder="dd-mm-yyyy" class="input-small">
            <button type="submit" class="btn btn-primary">Store</button>
        </form>
        <div class="todo-mut-link">
            <p><a href="#" onclick="return toggle_add_form();">Ik ben klaar met taken toevoegen, precies</a></p>
        </div>
    </div>
</div>

<div id="todo-listing">
    <ul>
    </ul>
</div>
