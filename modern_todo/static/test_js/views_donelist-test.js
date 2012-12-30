define(["underscore", "jquery", "when", "models/todolist", "models/todo", "views/donelist"],
function(_,            $,        when,   ToDoListModel,    ToDoModel,     DoneListView) {
    buster.testCase("view donetodolist", {
      setUp: function() {
        var deferred = when.defer()
        var self = this
        var id = 99
        var keys = ["complete", "id", "resource_uri", "creation_datetime", "text"]
        this.todolist = new ToDoListModel({name:"my todolist"})
        this.view = new DoneListView({model: this.todolist})
        this.view.template =
        "<div>" +
        "<ul class='donetodos'>" +
        "</ul>" +
        "</div>"
        this.useFakeServer()
        this.sandbox.server.autoRespond = true
        this.sandbox.server.autoRespondAfter = 2
        this.sandbox.server.respondWith(/todolist\/?$/, function(xhr) {
          xhr.respond(201, { "Content-Type": "application/json" }, JSON.stringify({
            "creation_datetime": "2012-12-20T22:37:32.580887+00:00",
            "id": "88",
            "name": "test",
            //"owner": "/api/testing/user/1/",
            "resource_uri": "/api/testing/todolist/88/",
            "todos": []
          }))
        })
        this.sandbox.server.respondWith(/todo\/?$/, function(xhr) {
          var text = JSON.stringify({
            "complete": false,
            "completion_datetime": null,
            "creation_datetime": "2012-12-15T20:24:16.415315+00:00",
            "id": ++id,
            "list": "/api/testing/todolist/88/",
            "resource_uri": "/api/testing/todo/" + id + "/",
            "text": "lorem ipsum " + id
          })
          xhr.respond(201, { "Content-Type": "application/json" }, text)
        })
        this.sandbox.server.respondWith(/todo\/set\//,function(xhr) {
          var response = JSON.stringify({
              "objects": _.map([self.todo1, self.todo2, self.todo3],
                function (todo) {
                  return _.pick(todo.attributes, keys)
                })
            }
          )
          xhr.respond(200, { "Content-Type": "application/json" }, response)
        })
        this.view.model.save().then(function() {
          self.todo1 = new ToDoModel({text:"lorem ipsum", list: self.view.model})
          self.todo1.save().then(function() {
            self.todo2 = new ToDoModel({text:"lorem ipsum", list: self.view.model})
            self.todo2.save().then(function() {
              self.todo3 = new ToDoModel({text:"lorem ipsum", list: self.view.model})
              self.todo3.save().then(function() {
                deferred.resolver.resolve()
              })
            })
          })
        })
        return deferred.promise
      },
      show_done_todos: function() {
        this.todo2.set("complete", true)
        this.todo3.set("complete", true)
        this.spy(this.view, "make_donetodo_view")
        this.view.make_donetodo_views(this.view.model)
        buster.assert.equals(2, this.view.make_donetodo_view.callCount)
      },
      register_donetodo_view_creator_listener: function() {
        this.todo1.set("complete", true)
        this.todo1.set("complete", false)
        this.view.register_donetodo_view_creator_listener(this.todo1)
        this.spy(this.view, "make_donetodo_view")
        this.todo1.set("complete", true)
        buster.assert.equals(1, this.view.make_donetodo_view.callCount)
      }
    })
  }
)