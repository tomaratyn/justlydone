
function () {
  var ToDoList = Backbone.Model.extend({
    defaults: {
      name: ""
    }
  })

  var ToDoList_List = Backbone.Collection.extend({
    model: ToDoList
  })
} ();


