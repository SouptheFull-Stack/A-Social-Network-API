const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    // come back to this if it doesn't end up working
    default: mongoose.Types.ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Use a getter method to format the timestamp on query
  },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // set a min and max character length
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get:
      // potentially just do default: Date.now, OR just timestamp: true. ??
    },
    username: {
      type: String,
      required: true,
    },
    // does this need object id with ref?
    reactions: [reactionSchema],
  },
  {
    // adding virtual property to schema
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// creating a virtual property that gets the thought reactions
thoughtSchema.virtual("reactionCount").get(function () {
  // accessing full array/list
  return this.reactions.length;
});

// initialise the User model
const Thought = mongoose.model("Thought", thoughtSchema);

// exporting this file to use in other files
module.exports = Thought;
