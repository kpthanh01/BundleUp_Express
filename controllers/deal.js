const express = require('express')
const router = express.Router()
const Deal = require('../models/deal'); // Import the Deal model

// Controller to create a new deal
const createDeal = async (req, res) => {
  try {
    const { author, description, bundle_number, category, joined_users, comments } = req.body;

    const newDeal = new Deal({
      author,
      description,
      bundle_number,
      category,
      joined_users,
      comments,
    });

    const savedDeal = await newDeal.save();
    res.status(201).json({ message: 'Deal created successfully', deal: savedDeal });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create deal', error: error.message });
  }
};

// Controller to fetch all deals
const getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find()
      .populate('author', 'name email')
      .populate('joined_users', 'name') 
      .populate('comments'); 
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch deals', error: error.message });
  }
};

// Controller to fetch a single deal by ID
const getDealById = async (req, res) => {
  try {
    const { id } = req.params;
    const deal = await Deal.findById(id)
      .populate('author', 'name email')
      .populate('joined_users', 'name')
      .populate('comments');

    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    res.status(200).json(deal);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch deal', error: error.message });
  }
};

// Controller to update a deal
const updateDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedDeal = await Deal.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedDeal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    res.status(200).json({ message: 'Deal updated successfully', deal: updatedDeal });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update deal', error: error.message });
  }
};

// Controller to delete a deal
const deleteDeal = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDeal = await Deal.findByIdAndDelete(id);

    if (!deletedDeal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    res.status(200).json({ message: 'Deal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete deal', error: error.message });
  }
};

// Export all controllers
module.exports = {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
};

module.exports = router