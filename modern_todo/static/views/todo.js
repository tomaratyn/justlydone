define( ["jquery", "mustache", "views/AbstractTodoView", "humane"],
function ($,        Mustache,   AbstractTodoView) {
  return AbstractTodoView.extend({
    events: {
      "change .done": "make_done",
      "click .delete-todo": "click_delete_todo"
    },
    make_done: function () {
      if (this.$el.find(".done").is(":checked")) {
        this.model.attributes.complete = true
      }
      else {
        this.model.attributes.complete = false
      }
      this.model.save()
    },
    render: function () {
      this.setElement(Mustache.render(this.template, this.model.attributes))
      this.humanize_times()
      return this
    },
    template: $("script#todo_template").text()
  })
})
