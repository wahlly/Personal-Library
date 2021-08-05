
module.exports = class Validator{
    static async addBook(book) {
        let error = {}
        const formatBook = book.replace(/\s+/g, '')
        if(!formatBook.length) {
            error.msg = 'missing required field title'
        }
        return {
            error,
            isValid: Object.keys(error).length === 0
        }
    }
    
    static async addComment(comment) {
        let error = {}
        const formatComment = comment.replace(/\s+/g, '')
        if(!formatComment.length) {
            error.msg = 'missing required field comment'
        }
        return {
            error,
            isValid: Object.keys(error).length === 0
        }
    }
}