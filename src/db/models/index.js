import Contact from "./contact.js";
import User from "./user.js";

User.hasMany(Contact, { foreignKey: "owner", onDelete: "CASCADE" });
Contact.belongsTo(User, { foreignKey: "owner", onDelete: "CASCADE" });

export { Contact, User };
