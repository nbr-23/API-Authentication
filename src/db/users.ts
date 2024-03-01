import mongoose from "mongoose";

/*
UserSchema: This constant defines the schema for a user in the database.
username: A field in the schema of type String that is required, meaning it must be provided when creating a new user.
email: Another field in the schema of type String that is also required.
authentication: This field is an object containing subfields related to user authentication.
password: A subfield within the authentication object that stores the user's password. It is of type String and is required. The select: false option indicates that this field should not be returned by default in queries for security reasons.
salt: Another subfield within authentication to store the salt value used in password hashing. It is of type String and also not selected by default in queries.
sessionToken: The last subfield under authentication, storing the user's session token. It is of type String and not selected by default.
*/
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required:true },
    authentification: {
        password: { type: String, required: true, select: false },
        salt :{ type: String, select: false },
        sessionToken: { type: String, select: false},
    },
});

/*
export: This keyword allows the UserModel variable to be accessed outside of this file.
UserModel: This variable holds the Mongoose model for the 'User' collection in the MongoDB database.
mongoose.model('User', UserSchema): This line creates a Mongoose model named 'UserModel' for the 'User' 
collection in the MongoDB database based on the UserSchema defined earlier.
The first argument 'User' specifies the name of the collection in the database.
The second argument UserSchema refers to the schema that defines the structure of documents in this collection.
*/
export const UserModel = mongoose.model('User', UserSchema);

//The getUsers function, when called, will execute UserModel.find() and return all users stored in the database.
export const getUsers = () => UserModel.find();
/*
(email: string) indicates that the function expects an email address as a parameter.
UserModel.findOne({email}) is a Mongoose method that searches for a single document (user) in the 'User' collection where the email field matches the provided email.
The getUserByEmail function, when called with an email address, will execute UserModel.findOne({email}) and return the user with that specific email address.
*/
export const getUserByEmail = (email: string) => UserModel.findOne({email});
 /*
 (sessionToken: string) specifies that the function expects a session token as a parameter.
UserModel.findOne({'authentification.sessionToken' : sessionToken}) is a Mongoose method that searches for a single document (user) in the 'User' collection where the sessionToken field under authentication matches the provided session token.
When getUserBySessionToken is called with a session token, it will execute UserModel.findOne({'authentification.sessionToken' : sessionToken}) and return the user associated with that specific session token.
 */
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentification.sessionToken' : sessionToken,
});
// Find and return the user associated with that specific ID. ^_^ 
export const getUserById = (id: string) => UserModel.findById({id});

/*
(values: Record<string, any>) indicates that the function expects an object (values) containing user data as a parameter.
new UserModel(values) creates a new instance of the UserModel with the provided values.
.save() is a Mongoose method that saves the newly created user to the database.
.then((user) => user.toObject()) is a promise that resolves with the newly created user object converted to a plain JavaScript object using toObject().
The function, when called with user data, will create a new user document in the 'User' collection, save it to the database, and return the user object as a plain JavaScript object.

That's it my friends :)
*/
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _d : id});

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
