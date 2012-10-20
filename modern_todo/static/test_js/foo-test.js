define(["models/todo"], function(todo_model) {
  buster.testCase("todo models tests", {
    "one": function() {
      var todo = new todo_model({id:1})
      var rc = todo.save()
      assert(rc)
    }
  })
});

