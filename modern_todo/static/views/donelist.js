define(["jquery", "underscore", "backbone-relational", "mustache", "views/donetodo"],
function($,        _,            Backbone,              Mustache,   DoneTodoView) {
  return Backbone.View.extend({
    initialize: function() {
      this.model.on("add:todos", this.register_donetodo_view_creator_listener, this)
    },
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
    register_donetodo_view_creator_listener: function(todoModel) {
      var self = this
      todoModel.on("change:complete", function(todoModel, isComplete, options) {
        if (isComplete) {
          if (self.$el) {
            var todoView = self.make_donetodo_view(todoModel)
            todoView.render()
            self.$el.find(".donetodos").append(todoView.$el)
          }
        }
      })
    },
    render: function() {
      this.setElement(Mustache.render(this.template, this.model.attributes))
      this.make_donetodo_views(this.model)
      var self = this
      _.each(this.model.get("todos").models, function(todo) {
        self.register_donetodo_view_creator_listener(todo)
      })
      return this
    },
    template: $("script#donetodolist_template").text()
  })
})