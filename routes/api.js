'use strict';
const Library = require('../controllers/controller');

module.exports = function (app) {

  app.route('/api/books')
    .get(Library.getAllBooks)
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...])
    
    .post(Library.addBook)
    
    .delete(Library.deleteAllBooks);
      //if successful response will be 'complete delete successful'



  app.route('/api/books/:id')
    .get(Library.getBook)
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    
    .post(Library.addComment)
    
    .delete(Library.deleteBook)      //if successful response will be 'delete successful'
  
};
