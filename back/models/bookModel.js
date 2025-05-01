import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name:{type:String, required:true},
    price:{type:String, required:true},
    author:{type:String, required:true}
}, {timestamps:true})

const BookModel = mongoose.model('books', bookSchema)

export default BookModel