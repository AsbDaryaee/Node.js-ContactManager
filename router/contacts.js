
const express = require('express')
const router = express.Router()
const { allContacts, getContact, addContact, updateContact, deleteContact } = require('../controllers/contacts');
const tokenValidator = require("../middlewares/tokenHandler");

router.use(tokenValidator)

router.get('/', allContacts)
router.get('/:id',getContact)
router.post('/', addContact)
router.patch('/:id', updateContact)
router.delete('/:id', deleteContact)


module.exports = router