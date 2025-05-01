import BookModel from "../models/bookModel.js"


const getBooks = async (req,res) => {
    const books = await BookModel.find()
    res.json(books)
}
 
export {getBooks}