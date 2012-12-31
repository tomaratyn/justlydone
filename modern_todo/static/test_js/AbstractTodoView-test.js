define([ "jquery", "models/todo", "views/AbstractTodoView" ],
function( $,        TodoModel,     AbstractTodoView) {
  return buster.testCase("AbstractTodoView Test", {
    setUp: function () {
      todo = new TodoModel({text: "lorem ipsum", complete:true})
      this.view = new AbstractTodoView({model: todo})
      this.view.setElement($("<div><input type='checkbox' class='done' checked='checked'></div>"))
      this.useFakeServer()
    },
    test_make_done: function () {
      this.view.make_done()
      var $el = this.view.$el
      buster.assert($el.find(".done").is(":checked"))
      buster.assert(this.view.model.attributes.complete)
      buster.assert.same(1, this.sandbox.server.requests.length)
      this.view.$el.find(".done").removeAttr("checked")
      this.view.make_done()
      buster.refute($el.find(".done").is(":checked"))
      buster.refute(this.view.model.attributes.complete)
      buster.assert.same(2, this.sandbox.server.requests.length)
    },
    "test remove view on model removal": function () {
      this.spy(this.view, "remove")
      this.view.model.trigger("destroy", this.view.model)
      buster.assert.calledOnce(this.view.remove)
    }
  })
})