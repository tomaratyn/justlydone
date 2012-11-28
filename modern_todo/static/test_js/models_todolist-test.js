define(["underscore", "models/todo", "models/todolist"], function(_, todo_model, todolist_model) {
  buster.testCase("create empty", {
    setUp: function() {
      this.useFakeServer()
    },
    make_one_blank: function() {
      var todolist = new todolist_model()
      var jqXHR = todolist.save()
      buster.refute.same(jqXHR, false)
      buster.assert.same(1, this.sandbox.server.requests.length)
      var request = this.sandbox.server.requests[0]
      var requestBody = JSON.parse(request.requestBody)
      buster.assert.same("", requestBody.name)
      buster.assert.same(0, requestBody.todos.length)
    },
    make_list_with_todos: function() {
      var todolist = new todolist_model({name: "my todolist"})
      var todos =  [ new todo_model({text:"foo"}),
                     new todo_model({text:"bar"}),
                     new todo_model({text:"qux"})]
      _.each(todos, function(todo) {
        todolist.attributes.todos.models.push(todo)
      })
      todolist.save()
      buster.assert.same(1, this.sandbox.server.requests.length)
      var requestBody = JSON.parse(this.sandbox.server.requests[0].requestBody)
      buster.assert.same(todolist.attributes.name, requestBody.name)
      _.each(todos, function(todo) {
        var actual_todo = _.where(requestBody.todos, {text:todo.attributes.text})
        buster.assert.same(1, actual_todo.length)
      })
    }
  })
})
