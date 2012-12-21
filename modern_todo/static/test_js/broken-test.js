define(["underscore", "jquery", "when", "models/todolist", "models/todo", "views/todolist"],
  function(_,            $,        when,   todolist_model,    ToDoModel,     todolist_view) {
    return buster.testCase("broken", {
      setUp: function() {
        var self = this
        var id = 99
        console.log("in tests with todos setUp")
        this.sandbox.server.autoRespond = true
        this.sandbox.server.autoRespondAfter = 2
        this.sandbox.server.respondWith(/todolist\/?$/, function(xhr) {
          console.log('got a create todolist request on fakeserver')
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
          console.log('got a create todo request on fakeserver', id)
          var text = JSON.stringify({
            "complete": false,
            "completion_datetime": null,
            "creation_datetime": "2012-12-15T20:24:16.415315+00:00",
            "id": ++id,
            "list": "/api/testing/todolist/88/",
            "resource_uri": "/api/testing/todo/" + id + "/",
            "text": "lorem ipsum " + id
          })
          console.log("going to return data ", text)
          xhr.respond(201, { "Content-Type": "application/json" }, text)
        })
      },
      saved_list: function() {
        var deferred = when.defer()
        var rv = this.view.model.save()
        rv.then(function() {
          self.todo1 = new ToDoModel({text:"lorem ipsum", list: self.view.model})
          self.todo1.save().then(function() {
            buster.assert(self.todo1.get("list"))
            deferred.resolver.resolve()
          })
        })
        return deferred.promise
      }
    })
  })