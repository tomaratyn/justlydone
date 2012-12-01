define( ["jquery", "backbone-relational", "mustache", "humane"],
function ($,        Backbone,              Mustache) {
  ToDoView = Backbone.View.extend({
    events: {
      "change .done": "make_done"
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
      this.$el.find("time").humaneDates()
      return this
    },
    template: $("script#todo_template").text()
  })
  return ToDoView
})
