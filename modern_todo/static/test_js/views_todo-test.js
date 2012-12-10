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
      test_make_done: function() {
        var $el = this.view.$el
        $el.find(".done").click()
        buster.assert($el.find(".done").is(":checked"))
        buster.assert(this.view.model.attributes.complete)
        buster.assert.same(1, this.sandbox.server.requests.length)
        $el.find(".done").trigger("click")
        buster.refute($el.find(".done").is(":checked"))
        buster.refute(this.view.model.attributes.complete)
        buster.assert.same(2, this.sandbox.server.requests.length)
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
    "test remove view on model removal": function () {
      this.spy(this.view, "remove")
      this.view.model.trigger("destroy", this.view.model)
      buster.assert.calledOnce(this.view.remove)
    }
  })
})