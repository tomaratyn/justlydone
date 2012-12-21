define(["backbone-relational", "urls", "models/todo"],
function (Backbone, urls, ToDoModel) {
    var ToDoList_model = Backbone.RelationalModel.extend({
      defaults: {
        name:""
      },
      relations: [
        {
          type:"HasMany",
          key:"todos",
          relatedModel: ToDoModel,
          reverseRelation:{
            key:"list"
          }
        }
      ],
      urlRoot: urls.TODOLISTS_URL
    })
    return ToDoList_model
  })