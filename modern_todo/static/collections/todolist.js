define([   "backbone-relational", "models/todolist", "urls"],
  function( Backbone,              ToDoList_model,    urls){
    ToDoList_List = Backbone.Collection.extend({
      model: ToDoList_model,
      url: urls.TODOLISTS_URL,
      parse: function (response) {
        return response.objects
      }
    })
    return ToDoList_List
})