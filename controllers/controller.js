const Books = require('../src/bookSchema');
const Validator = require('../validator')

module.exports = class Library{
    static async addBook(req, res){
        try{
            const bookTitle = req.body.title
            const { isValid, error } = await Validator.addBook(bookTitle)
            if(!isValid){
                return res.status(400).json(error.msg)
            }
            const newBook = await Books.create({title: bookTitle})
            return res.status(200).json({title: newBook.title, _id: newBook.id})
        }
        catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async addComment(req, res){
        try{
            const bookId = req.params.id
            const comment = req.body.comment
            const { isValid, error } = await Validator.addComment(comment)
            if(!isValid){
                return res.status(400).json(error.msg)
            }
            const book = await Books.findOne({_id: bookId})
            if(!book){
                return res.status(404).json('no book exists')
            }
            const newComment = await Books.findOneAndUpdate({_id: bookId}, {$push: {comments: comment}}, {new: true})
            return res.status(200).json(newComment)
        }
        catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async getBook(req, res){
        try{
            const bookId = req.params.id
            const book = await Books.findOne({_id: bookId})
            if(!book){
                return res.status(404).json('no book exists')
            }
            return res.status(200).json(book)
        }
        catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async getAllBooks(req, res){
        try{
            const books = await Books.find({})
            let bookList = []
            books.forEach(book => {
                bookList.push({
                    _id: book._id,
                    title: book.title,
                    commentcount: book.comments.length
                })
            })
            return res.status(200).json(bookList)
        }
        catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async deleteBook(req, res) {
        try {
            const bookId = req.params.id
            const book = await Books.findOne({_id: bookId})
            if (!book) {
                return res.status(404).json('no book exists')
            }
            await Books.deleteOne({_id: bookId})
            return res.status(200).json('delete successful')
        }
        catch(err) {
            return res.status(500).json(err.message);
        }
    }

    static async deleteAllBooks(req, res){
        try{
            await Books.deleteMany({})
            return res.status(200).json('complete delete successful')
        }
        catch(err){
            return res.status(500).json(err.message);
        }
    }
}