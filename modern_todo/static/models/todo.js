define(["backbone-relational", "urls"],
  function(BackBone,              urls) {
    var ToDo_model = Backbone.RelationalModel.extend({
      defaults: {
        text: ""
      },
      urlRoot: urls.TODO_URL
    })
    return ToDo_model
  })
