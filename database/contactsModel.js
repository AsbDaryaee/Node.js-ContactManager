const { timeStamp } = require("console");
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    name: {
      type: String,
      required: [true, "Please Add Contact Name"],
      trim: true,
      maxlength: [50, "Name Cannot be more than 50 Characters"],
    },
    phone: {
      type: Number,
      required: [true, "Pleaase Add Contact Number"],
    },
    email: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
