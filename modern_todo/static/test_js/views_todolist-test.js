define(["underscore", "jquery", "when", "models/todolist", "models/todo", "views/todolist"],
function(_,            $,        when,   todolist_model,    ToDoModel,     todolist_view) {
  buster.testCase("views todolist", {
    setUp: function() {
      this.useFakeServer()
      this.todolist = new todolist_model({name:"my todolist"})
      this.view = new todolist_view({model: this.todolist})
      this.view.template =
        "<div>" +
        "<span class='name'>{{name}}</span>" +
        "<span class='todo-count'></span>" +
        "<input type='text'class='new-todo-text'>" +
        "<button class='add-new-todo'></button>" +
        "<div class='edit-list-name-modal modal'>" +
        "<i class='list-old-name'></i>" +
        "<input class='list-new-name' type='text'>" +
        "<button class='save'></button>" +
        "</div>" +
        "<ul class='todos'>" +
        "</ul>" +
        "</div>"
      this.$el = this.view.render().$el
    },
    rename_list : {
      test_rename_list: function() {
        var self = this
        var new_name = "new name"
        var deferred = when.defer()
        this.todolist.on("change:name", function() {
          buster.assert.same(new_name, self.todolist.attributes.name)
          deferred.resolver.resolve()
        })
        this.$el.find(".name").trigger("dblclick")
        buster.assert.same(this.$el.find(".list-old-name").text(), this.todolist.attributes.name)
        this.$el.find(".list-new-name").val(new_name)
        this.$el.find(".edit-list-name-modal .save").trigger("click")
        return deferred.promise
      },
      test_modal_save_button: function() {
        var deferred = when.defer()
        var $modal = this.$el.find(".edit-list-name-modal")
        var $save = $modal.find(".save")
        var assert_called_hide = function(){
          buster.assert.same(undefined, $modal.data("dosave"))
          $modal.off("hide", assert_called_hide)
          $modal.find(".list-new-name").val("foo")
          $modal.on("hide", function() {
            buster.assert.same(1, $modal.data("dosave"))
            deferred.resolver.resolve()
          })
          $save.trigger("click")
        }
        $modal.on("hide", assert_called_hide)
        $save.trigger("click")
        return deferred.promise
      }
    },
    add_new_todo: {
      add_todo: function() {
        var self = this
        var timeout_deferred = when.defer()
        var assert_deferred = when.defer()
        var joined_deferred = when.defer()
        joined_deferred.count = 2
        var decrement_joined_deferred = function () {
          joined_deferred.count--
          if (joined_deferred.count == 0) {
            joined_deferred.resolver.resolve()
          }
        }
        timeout_deferred.promise.then(decrement_joined_deferred)
        assert_deferred.promise.then(decrement_joined_deferred)
        var new_todo_name = "Save the World"
        this.sandbox.server.autoRespond = true
        this.sandbox.server.respondWith("POST", "http://localhost:8000/api/testing/todo/", JSON.stringify({text:new_todo_name, id:99}))
        var $add_todo = this.$el.find(".add-new-todo")
        var $new_todo_textbox = this.$el.find(".new-todo-text")
        this.spy(this.view, "make_todo_view")
        var assert_todo_added = function() {
          buster.assert.same(1, self.todolist.attributes.todos.length)
          buster.assert.same(new_todo_name, self.todolist.attributes.todos.models[0].attributes.text)
          assert_deferred.resolver.resolve()
        }
        this.todolist.on("add:todos", assert_todo_added)
        $new_todo_textbox.val(new_todo_name)
        $add_todo.trigger("click")
        window.setTimeout(function() {
          buster.assert.calledOnce(self.view.make_todo_view)
          timeout_deferred.resolver.resolve()
        }, 100)
        return joined_deferred
      },
      dont_add_empty: function() {
        var deferred = when.defer()
        var $add_todo = this.$el.find(".add-new-todo")
        var assert_didnt_fire = function(){
          buster.assert(false)
        }
        this.todolist.on("add:todos", assert_didnt_fire)
        $add_todo.trigger("click")
        setTimeout(function() {
          assert(true)
          deferred.resolver.resolve()
        }, 100)
        return deferred.promise
      }
    },
    "tests with todos": {
      setUp: function() {
        var self = this
        var id = 99
        var deferred = when.defer()
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
        self.view.model.on("all", function() { console.log("listening on view.model events", arguments)})
        self.view.model.on("remove:todos", function() { debugger})
        var rv = this.view.model.save()
//        debugger
        rv.then(function() {
          self.todo1 = new ToDoModel({text:"lorem ipsum", list: self.view.model})
          //TODO why do these stop being associated with their list?
          console.log()
          self.todo1.save().then(function() {
//            debugger
            self.todo2 = new ToDoModel({text:"lorem ipsum", list: self.view.model})
            self.todo2.save().then(function() {
              self.todo3 = new ToDoModel({text:"lorem ipsum", list: self.view.model})
//              debugger
              self.todo3.save().then(function() {
//                debugger
                deferred.resolver.resolve()
              })
            })
          })
        })
        return deferred.promise
      },
      "update todo count" : {
        "on add": function() {
          var self = this
          var deferred = when.defer()
          var starting_text_todo_count = this.$el.find(".todo-count").text()
          var starting_model_todo_count = this.view.model.attributes.todos.length
          buster.assert.equals(parseInt(starting_text_todo_count), starting_model_todo_count)
          this.view.model.on("add:todos", function() {
            setTimeout(function() {
              buster.assert.equals(parseInt(self.$el.find(".todo-count").text()), self.view.model.attributes.todos.length)
              buster.assert.equals(starting_model_todo_count + 1, self.view.model.attributes.todos.length)
              deferred.resolver.resolve()
            }, 10)
          })
          new ToDoModel({text: "going to trigger the tested code", list: this.view.model})
          return deferred.promise
        },
        "on delete": function() {
          var self = this
          var deferred = when.defer()
          var starting_text_todo_count = this.$el.find(".todo-count").text()
          var starting_model_todo_count = this.view.model.attributes.todos.length
          buster.assert.equals(parseInt(starting_text_todo_count), starting_model_todo_count)
          this.view.model.on("remove:todos", function() {
            setTimeout(function() {
              buster.assert.equals(parseInt(self.$el.find(".todo-count").text()), self.view.model.attributes.todos.length)
              buster.assert.equals(starting_model_todo_count - 1, self.view.model.attributes.todos.length)
              deferred.resolver.resolve()
            }, 10)
          })
          this.todo3.destroy()
          return deferred.promise
        }
      },
      "//render only not-done todos": function () {
        console.log("todo1", this.todo1)
        var deferred = when.defer()
        var self = this
        this.spy(this.view, "make_todo_view")
        var keys = ["complete", "id", "resource_uri", "creation_datetime", "text"]
        this.sandbox.server.respondWith("GET",
          /\/todo\/set\//,
          function(xhr) {
            var response = JSON.stringify({
                "objects": _.map([self.todo1, self.todo2, self.todo3],
                  function (todo) {
                    console.log("doing picking attributes of todo ", todo)
                    return _.pick(todo.attributes, keys)
                  })
              }
            )
            console.log("served set response")
            xhr.respond(200, { "Content-Type": "application/json" }, response)
          }
        )
        this.view.render()
        setTimeout(function () {
          console.log("self.sandbox.server", self.sandbox.server)
          _.each(self.sandbox.server.requests, function (r, i) { console.log(r,"[", i, "]")})
          console.log('self.view.model.getRelation("todos")', self.view.model.getRelation("todos"), self.view.model.getRelation("todos").keyContents)
          console.log("going to assert todoview ")
          console.log(self.view.make_todo_view.printf("%n %C"), self.view.make_todo_view.callCount)
          buster.assert.equals(3, self.view.make_todo_view.callCount)
          //debugger
          deferred.resolver.resolve()
        }, 100)
        return deferred.promise
      }
    },
    "test remove view on model removal": function() {
      this.spy(this.view, "remove")
      this.view.model.trigger("destroy", this.view.model)
      buster.assert.calledOnce(this.view.remove)
    }
  })
})