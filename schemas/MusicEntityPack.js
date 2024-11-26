// MusicEntityPack schema
const MusicEntityPackSchema = {
  type: "object",
  properties: {
    songs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          entityId: { type: "string" }
        }
      }
    },
    albums: {
      type: "array",
      items: {
        type: "object",
        properties: {
          entityId: { type: "string" }
        }
      }
    },
    playlists: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          songs: {
            type: "array",
            items: { type: "string" }
          },
          entityId: { type: "string" },
          creatorId: { type: "integer", format: "int64" },
          date: { type: "string", format: "date-time" }
        }
      }
    },
    artists: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          entityId: { type: "string" },
          albums: {
            type: "array",
            items: { type: "string" }
          },
          image: { type: "string", format: "byte" }
        }
      }
    }
  }
};

module.exports = MusicEntityPackSchema;
