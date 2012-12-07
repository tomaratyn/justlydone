define(["underscore", "jquery", "when", "models/todolist", "views/todolist"],
function(_,            $,        when,   todolist_model,    todolist_view) {
  buster.testCase("views todolist", {
    setUp: function() {
      this.useFakeServer()
      this.todolist = new todolist_model({name:"my todolist"})
      this.view = new todolist_view({model: this.todolist})
      this.view.template =
        "<div>" +
        "<span class='name'>{{name}}</span>" +
        "<input type='text'class='new-todo-text'>" +
        "<button class='add-new-todo'></button>" +
        "<div class='edit-list-name-modal modal'>" +
        "<i class='list-old-name'></i>" +
        "<input class='list-new-name' type='text'>" +
        "<button class='save'></button>" +
        "</div>" +
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
    "test remove view on model removal": function() {
      this.spy(this.view, "remove")
      this.view.model.trigger("destroy", this.view.model)
      buster.assert.calledOnce(this.view.remove)
    }
  })
})