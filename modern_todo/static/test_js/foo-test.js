define(["models/todo"], function(todo) {
  buster.spec.expose()
  console.log("in define'd function")
  describe('single dependency', function(){
    it('should work', function () {
      var t = new todo({id:'1'})
      t.fetch()
    });
  });
});

