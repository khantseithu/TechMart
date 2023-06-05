import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import users from './data/users.js';
import products from './data/products.js';
import User from './models/UserModel.js';
import Product from './models/ProductModel.js';
import Order from './models/OrderModel.js';
import connectDB from './config/db.js';

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Add adminUser to each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// To import data, run the following command in the terminal:
// node backend/seeder
// To destroy data, run the following command in the terminal:
// node backend/seeder -d
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
