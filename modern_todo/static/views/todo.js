define( ["jquery", "mustache", "views/AbstractTodoView", "humane"],
function ($,        Mustache,   AbstractTodoView) {
  return AbstractTodoView.extend({
    events: {
      "click .delete-todo": "click_delete_todo",
      "change .done": "make_done"
    },
    initialize: function() {
      var self = this
      this.__proto__.__proto__.initialize.apply(this)
      this.model.on("change:complete", function(model, isComplete, options){
        if (isComplete){
          self.remove()
        }
      })
    },
    render: function () {
      this.setElement(Mustache.render(this.template, this.model.attributes))
      this.humanize_times()
      return this
    },
    template: $("script#todo_template").text()
  })
})
