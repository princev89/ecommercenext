const {model, models,  Schema } = require("mongoose");

const UserSchema = new Schema(  {
    name: String,
    email: String, 
    password: String,
});


const User = models?.User || model( 'User',UserSchema);
export default User;