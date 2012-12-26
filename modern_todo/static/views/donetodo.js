define(["jquery", "underscore", "mustache", "views/AbstractTodoView"],
function($,        _,            Mustache, AbstractTodoView) {
    return AbstractTodoView.extend({
      render: function() {
        this.setElement(Mustache.render(this.template, this.model.attributes))
        this.humanize_times()
        return this
      },
      template: $("script#todo_template").text()
    })
  }
)