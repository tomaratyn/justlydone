define( ["jquery", "mustache", "views/AbstractTodoView", "humane"],
function ($,        Mustache,   AbstractTodoView) {
  return AbstractTodoView.extend({
    events: {
      "change .done": "make_done",
      "click .delete-todo": "click_delete_todo"
    },
    initialize: function() {
      // we wrap the call to remove in a closure so that we can spy on remove() in tests.
      this.model.on("destroy", function() { this.remove() }, this)
    },
    click_delete_todo: function() {
      this.model.destroy()
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
