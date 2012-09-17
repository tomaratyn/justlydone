
ToDoList = Backbone.Model.extend({
  defaults: {
    name: ""
  }
})

ToDoList_List = Backbone.Collection.extend({
  model: ToDoList,
  url: TODOLISTS_URL,
  parse: function(response) {
    console.log("ToDoList_List::Parse", response)
    return response.objects
  }
})

ToDoList_View = Backbone.View.extend({
  template: $("script#list_todolist").text(),
  render: function() {
    this.el = Mustache.render(this.template, this.model.attributes)
    return this
  }
})

ToDoList_List_View = Backbone.View.extend({
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
      this.collection.create({name:new_list_name})
    }
  },
  initialize: function() {
    console.log("initializing ToDoList_List_View")
    this.collection.on("add", this.render_new_single_list, this)
    this.collection.on("reset", this.render_new_many_lists, this)
    this.collection.fetch()
  },
  refresh: function(e){
    var self = this
    console.log("called refresh()")
    this.collection.fetch()
  },
  render_new_many_lists: function() {
    console.log("ToDoList_List_View::render_new_many_lists")
    this.$el.find("ul").html("")
    var self = this
    _.each(this.collection.models, function(model){self.render_new_single_list(model)})
  },
  render_new_single_list: function(new_todo_list) {
    console.log("ToDoList_List_View::render_new_list", new_todo_list)
    var view = new ToDoList_View({model: new_todo_list})
    var new_todo_list_el = view.render()
    $(this.el).find("ul").append(new_todo_list_el.el)
  }
})

todolist_view = new ToDoList_List_View()

$(function() {
  $("form.nosubmit").submit(function() {return false})
})

