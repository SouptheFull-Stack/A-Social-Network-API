const { Schema, model } = require("mongoose");

const validateEmail = function (email) {
  const regexMatch = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return regexMatch.test(email);
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // can possibly replace regex with function name?? tutor notes
      validate: [validateEmail, "Oopsie! Please provide a valid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    // adding virtual property to schema; similar to foreign key links in SQL where
    // it will add the virtual property to the JSON object when we do a get request
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// creating a virtual property that gets the user's friends
userSchema.virtual("friendCount").get(function () {
  // accessing full array/list using friends.length
  return this.friends.length;
});

// initialise the User model
const User = mongoose.model("User", userSchema);

// exporting this file to use in other files
module.exports = User;
