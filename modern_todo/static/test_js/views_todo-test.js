define(["jquery", "when", "views/todo", "models/todo"],
function($,        when,         ToDoView,     todo_model) {
  buster.testCase("views todo", {
    setUp: function() {
      todo = new todo_model({text: "lorem ipsum"})
      this.view = new ToDoView({model: todo})
    },
    with_template: {
      setUp:function() {
        template_text = "<div id='buster_test'><input type='checkbox' class='done'><label>{{text}}</label><button class='delete-todo'>X</button></div>"
        this.useFakeServer()
        this.view.template = template_text
        $("body").append(this.view.render().el)
      },
      tearDown: function() {
        this.view.$el.remove()
      },
      "test click delete todo destroys todo model": function() {
        var deferred = when.defer()
        this.view.model.on("destroy", function() {
          buster.assert("true")
          deferred.resolver.resolve()
        }, 100)
        this.view.$el.find(".delete-todo").click()
        return deferred.promise
      }
    },
  })
})