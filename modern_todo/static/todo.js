
require (
           ["jquery", "backbone-relational",  "mustache", "urls", "bootstrap"],
  function ($,         Backbone,               Mustache,   urls) {


ToDoList_model = Backbone.RelationalModel.extend({
  defaults: {
    name: ""
  },
  relations: [{
    type: "HasMany",
    key: "todos",
    relatedModel: "ToDo_model",
    reverseRelation: {
      key: "list"
    }
  }],
  urlRoot: urls.TODOLISTS_URL
})


ToDo_model = Backbone.RelationalModel.extend({
  defaults: {
    text: ""
  },
  urlRoot: urls.TODO_URL
})


ToDoList_List = Backbone.Collection.extend({
  model: ToDoList_model,
  url: urls.TODOLISTS_URL,
  parse: function(response) {
    return response.objects
  }
})


ToDoView = Backbone.View.extend({
  events: {
    "click .done": "make_done"
  },
  make_done: function() {
    if (this.$el.find(".done").is(":checked")) {
      this.model.attributes.complete = true
    }
    else {
      this.model.attributes.complete = false
    }
    this.model.save()
  },
  render: function() {
    this.setElement(Mustache.render(this.template, this.model.attributes))
    return this
  },
  template: $("script#todo_template").text()
})


ToDoList_View = Backbone.View.extend({
  events: {
    "click .remove-list": "remove_list",
    "click .toggle-todos": "toggle_todos",
    "dblclick .name": "rename_list"
  },
  initialize: function(options) {
    this.model.on("destroy", this.remove, this)
    this.model.on("change:name", this.update_name_label, this)
    this.model.on("add:"+this.model.id, this.onAddTodo, this)
    this.model.on("reset:"+this.model.id, this.onAddTodo, this)
  },
  onAddTodo:function(addedModel, collection){
  },
  remove_list: function() {
    console.log("ToDoList_View::remove_list")
    this.model.destroy()
  },
  rename_list: function(e){
    console.log("ToDoList_View::rename_list")
    var view = this
    var $modal = $("#edit-list-name-modal")
    $modal.find(".list-old-name").text(this.model.attributes.name)
    $modal.find(".list-new-name").attr("placeholder", this.model.attributes.name)
    $modal.modal()
    $modal.on("hide", function() {
      if ($modal.data("dosave")){
        view.model.set({"name": $modal.find(".list-new-name").val()})
        view.model.save()
        $modal.data("dosave", false)
        $modal.off("hide")
      }
    })
  },
  render: function() {
    console.log("ToDoList_View::render", "this.template", this.template, "this.model.attributes", this.model.attributes)
    var partials = {todo: $("#partial_todo").text()}
    var self = this
    this.model.fetchRelated("todos", {success: function() {
      _.each(self.model.attributes.todos.models, function (todo) {
        var todo_view = new ToDoView({model: todo})
        self.$el.find(".todos").append(todo_view.render().el)
      })
    }})
    this.setElement(Mustache.render(this.template, this.model.attributes, partials))
    return this
  },
  toggle_todos: function() {
    var $todos = this.$el.find(".todos")
    var $toggle_icon = this.$el.find(".toggle-todos")
    if ($todos.hasClass("hide")) {
      $toggle_icon.removeClass("icon-chevron-right")
      $toggle_icon.addClass("icon-chevron-down")
      $todos.removeClass("hide")
    }
    else {
      $toggle_icon.removeClass("icon-chevron-down")
      $toggle_icon.addClass("icon-chevron-right")
      $todos.addClass("hide")
    }
  },
  template: $("script#list_todolist").text(),
  update_name_label: function() {
    this.$el.find(".name").text(this.model.attributes.name)
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
    $label.val("")
  },
  initialize: function() {
    console.log("initializing ToDoList_List_View")
    this.collection.on("add", this.render_new_single_list, this)
    this.collection.on("reset", this.render_new_many_lists, this)
    this.collection.fetch()
  },
  render_new_many_lists: function() {
    console.log("ToDoList_List_View::render_new_many_lists")
    this.$el.find("ul").html("")
    var self = this
    _.each(this.collection.models, function(model){self.render_new_single_list(model)})
  },
  refresh: function(e){
    console.log("called refresh()")
    this.collection.fetch()
  },
  render_new_single_list: function(new_todo_list) {
    console.log("ToDoList_List_View::render_new_list", new_todo_list)
    var view = new ToDoList_View({model: new_todo_list})
    $(this.el).find(".todolists").append(view.render().el)
  }
})


new ToDoList_List_View()


$(function() {
  $("form.nosubmit").submit(function() {return false})
  $(".modal#edit-list-name-modal .save").click(function() {
    var $modal = $(this).parents(".modal#edit-list-name-modal")
    $modal.data("dosave", true)
    $modal.modal("hide")
  })
  $(".modal#edit-list-name-modal").on("hidden", function() {
    $(this).find(".list-new-name").val("")
  })
})

})
