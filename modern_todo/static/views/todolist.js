define(["jquery", "underscore", "backbone-relational", "mustache", "views/todo", "models/todo", "bootstrap"],
function($,        _,            Backbone,              Mustache, ToDoView, TodoModel) {
  return Backbone.View.extend({
    events: {
      "click .remove-list": "remove_list",
      "click .toggle-todos": "toggle_todos_display",
      "dblclick .name": "rename_list",
      "click .edit-list-name-modal .save": "save_and_close_edit_name_modal",
      "click .add_new_todo": "add_new_todo"
    },
    initialize: function (options) {
      this.model.on("destroy", this.remove, this)
      this.model.on("change:name", this.update_name_label, this)
      this.model.on("add:" + this.model.id, this.onAddTodo, this)
      this.model.on("reset:" + this.model.id, this.onAddTodo, this)
    },
    add_new_todo: function() {
      var text = this.$el.find(".new_todo_text").val()
      if (text) {
        var new_todo = new TodoModel({text: text, list: this.model})
        new_todo.save()
        var new_view = new ToDoView({model: new_todo})
        this.$el.find(".todos").append(new_view.render().el)
      }
    },
    remove_list: function () {
      console.log("ToDoList_View::remove_list")
      this.model.destroy()
    },
    rename_list: function (e) {
      var view = this
      var $modal = this.$el.find(".edit-list-name-modal")
      $modal.find(".list-old-name").text(this.model.attributes.name)
      $modal.find(".list-new-name").attr("placeholder", this.model.attributes.name)
      $modal.modal()
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
            var todo_view = new ToDoView({model: todo})
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
      var $todos = this.$el.find(".todos")
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
    }
  })
})
