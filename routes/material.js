const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Material = require("../models/Material");
const Template = require("../models/Template");
const Element = require("../models/Element");

const { cloudinary } = require('../configs/cloudinary');

// --------------------------------------------------
// GET /api/materials
// --------------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    // return all materials
    const allMaterials = await Material.find({owner: req.user._id});
    res.json( allMaterials );
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// GET /api/materials/:id
// --------------------------------------------------
router.get("/:id", async (req, res) => {
  // return 1 material with a given id
  const materialId = req.params.id;
  try {
    // create one material
    const material = await Material.findById(materialId);    
    if (!material) {
      res.status(404).json({ message: "material not found" });
    } else res.json(material);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// POST api/materials
// --------------------------------------------------
router.post("/create", async (req, res) => {
  const { info, data } = req.body;
  console.log( "CRM:" , data );
  try {
    // create one material
    const result = await Material.create(data);    
    res.json( result );
  } catch (err) {
    console.log( "CRM-ERR:", err );
    res.status(500).json(err);
  }
});


// --------------------------------------------------
// DELETE /api/materials/:id
// --------------------------------------------------
router.delete("/:id", async (req, res) => {
  const materialId = req.params.id;
  try {
    // create one material
    const result = await Material.findByIdAndDelete(materialId);    
    res.json( result );
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// PUT /api/materials/:id
// --------------------------------------------------
router.put("/:id", (req, res) => {
  const { info, data } = req.body;
  Material.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    )
    .then(material => {
      res.json(material);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


/*
  name:          { type: String, required: true },
  description:   { type: String, required: false},
  imageUrl:      { type: String, required: true, default: ""},
  imagePublicID:  { type: String, required: false  },
  
  owner:         { type: Schema.Types.ObjectId, ref: 'User'},
  template:      { type: Schema.Types.ObjectId, ref: 'Template'},
  projects:    [ { type: Schema.Types.ObjectId, ref: 'Project'} ]
  },

// --------------------------------------------------
// PUT /api/materials/:id
// --------------------------------------------------
router.put("/:id", (req, res) => {
  Material.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      imageURL: req.body.imageURL,
      publicID: req.body.publicID
    },
    { new: true }
  )
    .then(material => {
      res.json(material);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

*/

module.exports = router;