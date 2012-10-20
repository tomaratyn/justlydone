define(["models/todo"], function(todo_model){
  buster.testCase("test todo_model's name", {
    setUp: function() {
      this.useFakeServer()
    },
    empty_by_default: function() {
      var todo = new todo_model()
      var jqXHR = todo.save()
      buster.refute.same(jqXHR, false)
      buster.assert.same(1, this.sandbox.server.requests.length)
      var request = this.sandbox.server.requests[0]
      var requestBody = JSON.parse(request.requestBody)
      buster.assert.same("", requestBody.text)
      buster.assert.same(null, requestBody.list)
    }
  })
})