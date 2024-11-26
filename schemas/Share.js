const MusicEntityPackSchema = require("./MusicEntityPack"); // Import MusicEntityPack schema

// Share schema (including MusicEntityPack)
const ShareSchema = {
  type: "object",
  properties: {
    shareID: { type: "integer", format: "int64"},
    userID: { type: "integer", format: "int64"},
    musicEntity: MusicEntityPackSchema, // Reference MusicEntityPack schema here
    text: { type: "string"}
  },
  required: ["shareID","userID", "musicEntity", "text"]
};

module.exports = ShareSchema;
