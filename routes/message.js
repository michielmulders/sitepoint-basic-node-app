var express = require('express')
var router = express.Router()
var Message = require('../models/message')

/* Method for testing the proper working of message route */
router.get('/test', function(req, res) {
    res.send("Test GET request to Message Route");
})

/**
 * Route for adding a Message Object (message, author) to MongoDB
 * @param message string: message which is send with the request body
 * @param author string: author of message
 */
router.post('/add', function(req, res) {
    
    /**
     *  Create Message Object with Message Model 
     *  Which makes it easier to execute Mongo Operations on the object
     */
    const message = new Message({
        message: req.body.message,
        author: req.body.author
    })

    /** 
     * Save message to database by calling save() method
     * Callback function will return error and result
     * If error ? return status 500 with error message 
     * Else return status 200 everything OK
     */
    message.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred with adding object to MongoDB',
                error: err
            });
        } else {
            return res.status(200).json({
                title: 'Successful added'
            });
        }
    })
})

/**
 * Route for finding all Message Objects for a particular author
 * @param author string: name of author
 */
router.get('/findByName/:author', function(req, res) {

     /**
      * Call the find method on the Scheme Message Object : built-in function 
      * First argument is object with search parameters: 
      * Author field of Message object has to match the author from our request 
      */
     Message.find({ author: req.params.author }, function(err, messages) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred when searching author in MongoDB',
                error: err
            });
        } else {
            return res.status(200).json({
                title: 'Found author',
                messages: messages
            });
        }
    });
});

/* Export router so it can be injected in app.js for adding the route */
module.exports = router;