db.getCollection('paneldata').find({panelId : ObjectId("56eb3d5d7c727d861b3278ec")}).forEach( function (x) {   x.panelId = x.panelId.str; db.getCollection('paneldata').save(x);})