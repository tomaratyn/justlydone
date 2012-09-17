
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
  collection: new ToDoList_List(),
  el: ".todolist_list",
  events: {
    "click .refresh": "refresh",
    "click .add_new_list": "add_new_list"
  },
  add_new_list: function(e) {
    var $btn = $(e.currentTarget)
    var $label = $btn.parents("div").find("input.new_list_name")
    var new_list_name = $label.val()
    if (new_list_name.length > 0) {
      var rc = this.collection.create({name:new_list_name})
      console.log(rc)
      this.render()
    }
  },
  initialize: function() {
    this.refresh()
  },
  refresh: function(e){
    var self = this
    console.log("called refresh()")
    this.collection.fetch().success(function() {self.render()})
  },
  render: function() {
    console.log(this.collection)
    var ul = $(this.el).find("ul")
    ul.find("*").remove()
    ul.append(this.collection.models.map(function(value, key, list) {
      var template = $("script#list_todolist").text()
      return Mustache.render(template, value.attributes)
    }))
  }
})

todolist_view = new ToDoListView()

$(function() {
  $("form.nosubmit").submit(function() {return false})
})

