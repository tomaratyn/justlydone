define( ["jquery", "underscore", "collections/todolist", "views/todolist"],
function ($,        _,            ToDoList_List, ToDoList_View){
  return Backbone.View.extend({
    collection: new ToDoList_List(),
    el: ".todolist_list",
    events: {
      "click .refresh": "refresh",
      "click .add_new_list": "add_new_list"
    },
    add_new_list: function (e) {
      var $btn = $(e.currentTarget)
      var $label = $btn.parents("div").find("input.new_list_name")
      var new_list_name = $label.val()
      if (new_list_name.length > 0) {
        this.collection.create({name: new_list_name})
      }
      $label.val("")
    },
    initialize: function () {
      console.log("initializing ToDoList_List_View")
      this.collection.on("add", this.render_new_single_list, this)
      this.collection.on("reset", this.render_new_many_lists, this)
      this.collection.fetch()
    },
    render_new_many_lists: function () {
      console.log("ToDoList_List_View::render_new_many_lists")
      this.$el.find("ul").html("")
      var self = this
      _.each(this.collection.models, function (model) {
        self.render_new_single_list(model)
      })
    },
    refresh: function (e) {
      console.log("called refresh()")
      this.collection.fetch()
    },
    render_new_single_list: function (new_todo_list) {
      console.log("ToDoList_List_View::render_new_list", new_todo_list)
      var view = new ToDoList_View({model: new_todo_list})
      $(this.el).find(".todolists").append(view.render().el)
    }
  })
})