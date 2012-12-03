define(["jquery", "when", "views/todo", "models/todolist", "models/todo"],
function($,        when,   ToDoView,     todolist_model,     todo_model) {
  buster.testCase("views todo", {
    setUp: function() {
      todolist = new todolist_model()
      todo = new todo_model({text: "lorem ipsum", list: todolist})
      this.view = new ToDoView({model: todo})
    },
    make_done: {
      setUp:function() {
        template_text = "<div id='buster_test'><input type='checkbox' class='done'><label>{{text}}</label></div>"
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
      }
    },
    "test remove view on model removal": function () {
      this.spy(this.view, "remove")
      this.view.model.trigger("destroy", this.view.model)
      buster.assert.calledOnce(this.view.remove)
    }
  })
})