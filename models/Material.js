const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema ({
  name:          { type: String, required: true },
  description:   { type: String, required: false},
  imageUrl:      { type: String, required: true, default: ""},
  imagePublicID:  { type: String, required: false  },
  
  owner:         { type: Schema.Types.ObjectId, ref: 'User'},
  template:      { type: Schema.Types.ObjectId, ref: 'Template'},
  projects:    [ { type: Schema.Types.ObjectId, ref: 'Project'} ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;