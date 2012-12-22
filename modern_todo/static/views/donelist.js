define(["jquery", "underscore", "backbone-relational", "mustache", "views/donetodo"],
function($,        _,            Backbone,              Mustache, DoneTodoView) {
    return Backbone.View.extend({
      make_donetodo_view: function(todo) {
        return new DoneTodoView({model:todo})
      },
      make_donetodo_views: function(todolist) {
        var self = this
        _.each(todolist.get("todos").models, function(todo) {
          if (todo.get('complete')){
            var donetodo_view = self.make_donetodo_view(todo)
            self.$el.find(".donetodos").append(donetodo_view.render().$el)
          }
        })
      },
      render: function() {
        this.setElement(Mustache.render(this.template, this.model.attributes))
        this.make_donetodo_views()
        return this
      },
      template: $("script#donetodolist_template").text()
    })
  }
)