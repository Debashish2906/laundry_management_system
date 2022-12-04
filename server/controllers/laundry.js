import express from "express";
import mongoose from "mongoose";

import Laundry from "../models/laundry.js";

const router = express.Router();

export const getLaundry = async (req, res) => {
  const id = req.userId;
  const userId = id;
  console.log(req.userId);
  try {
    const laundry = await Laundry.find({ userId });
    console.log(laundry, "Laundry");
    res.status(200).json(laundry);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getAllLaundry = async (req, res) => {
  try {
    const laundry = await Laundry.find();
    console.log(laundry, "Laundry");
    res.status(200).json(laundry);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createLaundry = async (req, res) => {
  const laundry = req.body;
  // console.log(laundry);
  const newLaundry = new Laundry({
    ...laundry,
    createdAt: new Date().toISOString(),
  });

  try {
    await newLaundry.save();
    console.log(laundry, "succes");
    res.status(201).json(newLaundry);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const changeStatus = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  // console.log(data.status, "fdata");

  const updateData = await Laundry.findByIdAndUpdate(
    id,
    {
      statusLaundry: data.status,
    },
    { new: true }
  );

  res.json(updateData);
};

export default router;
