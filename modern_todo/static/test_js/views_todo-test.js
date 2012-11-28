define(["jquery", "views/todo", "models/todo"], function($, ToDoView, todo_model) {
  buster.testCase("views todo make_done()", {
    setUp:function() {
      template_text = "<div id='buster_test'><input type='checkbox' class='done'><label>{{text}}</label></div>"
      this.useFakeServer()
      todo = new todo_model({text: "lorem ipsum"})
      this.view = new ToDoView({model: todo})
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
  })
})