
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
      var template = $("script#list_todolist").text()
      return Mustache.render(template, value.attributes)
    }))
  }
})

todolist_view = new ToDoListView()
