define(["jquery", "underscore", "backbone-relational", "mustache", "views/todo"],
function($,        _,            Backbone,              Mustache, ToDoView) {
  return Backbone.View.extend({
    events: {
      "click .remove-list": "remove_list",
      "click .toggle-todos": "toggle_todos",
      "dblclick .name": "rename_list"
    },
    initialize: function (options) {
      this.model.on("destroy", this.remove, this)
      this.model.on("change:name", this.update_name_label, this)
      this.model.on("add:" + this.model.id, this.onAddTodo, this)
      this.model.on("reset:" + this.model.id, this.onAddTodo, this)
    },
    remove_list: function () {
      console.log("ToDoList_View::remove_list")
      this.model.destroy()
    },
    rename_list: function (e) {
      console.log("ToDoList_View::rename_list")
      var view = this
      var $modal = $("#edit-list-name-modal")
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
      })
    },
    render: function () {
      console.log("ToDoList_View::render", "this.template", this.template, "this.model.attributes",
        this.model.attributes)
      var partials = {todo: $("#partial_todo").text()}
      var self = this
      this.model.fetchRelated("todos", {success: function () {
        _.each(self.model.attributes.todos.models, function (todo) {
          var todo_view = new ToDoView({model: todo})
          self.$el.find(".todos").append(todo_view.render().el)
        })
      }})
      this.setElement(Mustache.render(this.template, this.model.attributes, partials))
      return this
    },
    toggle_todos: function () {
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
