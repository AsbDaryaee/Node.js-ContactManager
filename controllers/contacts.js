const asyncHandler = require('express-async-handler');
const Contact = require('../database/model');

// Completed
const allContacts = asyncHandler(async (req, res) => {
    const allContacts = await Contact.find()
    res.status(200).json({ status: "succsessful", message: allContacts })
})

// Completed
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById({ _id: contactID }).exec()
    if (contact) {
        return res.status(200).json({ Status: "Sucssesful", Contact: contact })
    } else {
        return res.status(404).json({ Status: "Succesful", Message: `Contact Not Found`, ID: contactID })
    }
})

// Completed
const addContact = asyncHandler(async (req, res) => {
    const { name: contactName, phone: contactPhone, email: contactEmail } = req.body
    if (!contactName || !contactPhone) {
        return res.status(400).json({ Status: "Failed", Message: "Please Provide Name and Phone Number" })
    }
    const contact = await Contact.findOne({ phone: contactPhone }).exec()
    if (!contact) {
        const createContact = await Contact.create({ name: contactName, phone: contactPhone, email: contactEmail });
        return res.status(201).json({ createContact })
    } else {
        return res.status(400).json({ message: "Contact Already Exists" })
    }

})

// Completed
const updateContact = asyncHandler(async (req, res) => {
    const { id: contactID } = req.params
    const contact = await Contact.findOne({ _id: contactID }).exec()
    if (!contact) {
        return res.status(404).json({ message: `Contact Not Found`, ID: contactID })
    } else {
        const update = await Contact.findOneAndUpdate({ _id: contactID }, req.body, { new: true, runValidators: true })
        return res.status(200).json({ Status: "Succsessful", contact: update })
    }
})

// Completed
const deleteContact = asyncHandler(async (req, res) => {
    const { id: contactID } = req.params
    const contact = await Contact.findOne({ _id: contactID }).exec()
    if (contact) {
        const contactDelete = await Contact.findOneAndDelete({ _id: contactID })
        return res.status(201).json({ Status: "Succsessful", message: `Contact with ${contactID} Deleted.` })
    } else {
        return res.status(404).json({ message: `Contact Not Found`, ID: contactID })
    }


}
)

module.exports = { allContacts, getContact, addContact, updateContact, deleteContact }