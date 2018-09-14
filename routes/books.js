const express = require('express')
const router = express.Router()
const Book = require('../models/Book')

router.get('/', (req, res, next) => {
  const { search } = req.query
  if (search) {
    Book.find({ title: { $regex: search, $options: 'i' } })
      .then(books => {
        res.render('books-list', { books })
      }).catch(e => next(e))
  } else {
    Book.find()
      .then(books => {
        res.render('books-list', { books })
      })
  }
})
router.get('/detail/:id', (req, res, next) => {
  const { id } = req.params
  Book.findById(id)
    .then(book => {
      res.render('book-detail', book)
    }).catch(e => {
      console.log(e)
      next(e)
    })
})
//post
router.get('/new', (req, res, next) => {
  res.render('book-form')
})
router.post('/new', (req, res, next) => {
  Book.create(req.body)
    .then(book => {
      res.redirect('/books')
    }).catch(e => next(e))
})

//update
router.get('/edit/:id', (req, res, next) => {
  const { id } = req.params
  Book.findById(id)
    .then(book => {
      res.render('book-edit-form', book)
    }).catch(e => next(e))
})

router.post('/edit/:id', (req, res, next) => {
  const { id } = req.params
  Book.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(book => {
      console.log(book)
      res.redirect(`/books/detail/${id}`)
    })
})

module.exports = router

// crear un nuevo modelo que se llama review

// enlistar nuevas rutas 





