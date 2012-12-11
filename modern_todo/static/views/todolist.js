define(["jquery", "underscore", "backbone-relational", "mustache", "views/todo", "models/todo", "bootstrap"],
function($,        _,            Backbone,              Mustache, ToDoView, TodoModel) {
  return Backbone.View.extend({
    events: {
      "click .remove-list": "remove_list",
      "click .toggle-todos": "toggle_todos_display",
      "dblclick .name": "rename_list",
      "click .edit-list-name-modal .save": "save_and_close_edit_name_modal",
      "click .add-new-todo": "add_new_todo"
    },
    initialize: function (options) {
      // we wrap the call to remove in a closure so that we can spy on remove() in tests.
      this.model.on("destroy", function() { this.remove() }, this)
      this.model.on("change:name", this.update_name_label, this)
      this.model.on("add:todos", function() {this.update_todo_count() }, this)
      this.model.on("remove:todos", function() {this.update_todo_count() }, this)
    },
    add_new_todo: function() {
      var text = this.$el.find(".new-todo-text").val()
      var self = this
      if (text) {
        var new_todo = new TodoModel({text: text, list: this.model})
        new_todo.save(null, { success: function(new_todo, response, options) {
              var new_view = self.make_todo_view(new_todo)
              self.$el.find(".todos").append(new_view.render().el)
            }
        })
      }
    },
    make_todo_view: function(todo) {
      return new ToDoView({model: todo})
    },
    remove_list: function () {
      this.model.destroy()
    },
    rename_list: function (e) {
      var view = this
      var $modal = this.$el.find(".edit-list-name-modal")
      $modal.find(".list-old-name").text(this.model.attributes.name)
      $modal.find(".list-new-name").attr("placeholder", this.model.attributes.name)
      $modal.modal()
      //focus must be given after .modal() is called
      $modal.find(".list-new-name").focus()
      $modal.on("hide", function () {
        if ($modal.data("dosave")) {
          view.model.set({"name": $modal.find(".list-new-name").val()})
          view.model.save()
          $modal.data("dosave", false)
          $modal.off("hide")
        }
        $modal.find(".list-new-name").val("")
      })
    },
    render: function () {
      var self = this
      this.model.fetchRelated("todos", {
        success: function () {
          _.each(self.model.attributes.todos.models, function (todo) {
            var todo_view = self.make_todo_view(todo)
            self.$el.find(".todos").append(todo_view.render().el)
          })
        }
      })
      this.setElement(Mustache.render(this.template, this.model.attributes))
      return this
    },
    save_and_close_edit_name_modal: function() {
      var $modal = this.$el.find(".edit-list-name-modal")
      if ($modal.find(".list-new-name").val()) {
        $modal.data("dosave", 1)
      }
      $modal.modal("hide")
    },
    toggle_todos_display: function () {
      var $todos = this.$el.find(".todolist-details")
      var $toggle_icon = this.$el.find(".toggle-todos")
      if ($todos.hasClass("hide")) {
        $toggle_icon.removeClass("icon-chevron-right")
        $toggle_icon.addClass("icon-chevron-down")
        $todos.removeClass("hide")
      }
      else {
        $toggle_icon.removeClass("icon-chevron-down")
        $toggle_icon.addClass("icon-chevron-right")
        $todos.addClass("hide")
      }
    },
    template: $("script#list_todolist").text(),
    update_name_label: function () {
      this.$el.find(".name").text(this.model.attributes.name)
    },
    update_todo_count: function() {
      if (this.$el) {
        this.$el.find(".todo-count").text(this.model.attributes.todos.length)
      }
    }
  })
})
