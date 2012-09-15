
ToDoList = Backbone.Model.extend({
  defaults: {
    name: ""
  }
})

ToDoList_List = Backbone.Collection.extend({
  model: ToDoList,
  url: TODOLISTS_URL,
  parse: function(response) {
    return response.objects
  }
})

ToDoListView = Backbone.View.extend({
  el: "ul.todolist_list",
  collection: new ToDoList_List(),
  initialize: function() {
    var self = this
    this.collection.fetch().success(function(){self.render()})
  },
  render: function() {
    console.log(this.collection)
    $(this.el).append(this.collection.models.map(function(value, key, list) {
      return "<li>" + value.attributes.name + "</li>"
    }))
  }
})

todolist_view = new ToDoListView()
