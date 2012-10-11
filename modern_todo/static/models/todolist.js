define(["backbone-relational", "urls", "models/todo"],
function (Backbone, urls) {
    ToDoList_model = Backbone.RelationalModel.extend({
      defaults: {
        name:""
      },
      relations: [
        {
          type:"HasMany",
          key:"todos",
          relatedModel: "ToDo_model",
          reverseRelation:{
            key:"list"
          }
        }
      ],
      urlRoot: urls.TODOLISTS_URL
    })
    return ToDoList_model
  })