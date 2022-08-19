const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'mens' },
    { name: 'womens' },
    { name: 'unisex' },
  ]);

  console.log('Success! Categories are now seeded! 🥳');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Mens Item 1',
      description:
        'Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'mens1.png',
      category: categories[0]._id,
      price: 49.99,
      quantity: 100,
    },
    {
      name: 'Mens Item 2',
      description:
        'Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'mens2.png',
      category: categories[0]._id,
      price: 39.99,
      quantity: 200,
    },
    {
      name: 'Mens Item 3',
      category: categories[0]._id,
      description:
        'Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. ',
      image: 'mens3.png',
      price: 79.99,
      quantity: 100,
    },
    {
      name: 'Mens Item 4',
      category: categories[0]._id,
      description:
        'Lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'mens4.png',
      price: 49.99,
      quantity: 200,
    },
    {
      name: 'Womens Item 1',
      category: categories[1]._id,
      description:
        'Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignis imperdiet finibus.',
      image: 'womens1.png',
      price: 29.99,
      quantity: 300,
    },
    {
      name: 'Womens Item 2',
      category: categories[1]._id,
      description:
        ' Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, at sagittis risus mi a leo.',
      image: 'womens2.png',
      price: 69.99,
      quantity: 100,
    },
    {
      name: 'Womens Item 3',
      category: categories[1]._id,
      description:
        'Eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris non tempus in, sapien.',
      image: 'womens3.png',
      price: 59.99,
      quantity: 200,
    },
    {
      name: 'Womens Item 4',
      category: categories[1]._id,
      description: 'Vestibulum ornare diam quis eleifend rutrumsmod urna.',
      image: 'womens4.png',
      price: 49.99,
      quantity: 100,
    },
    {
      name: 'Womens Item 5',
      category: categories[1]._id,
      description: 'Vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'womens5.png',
      price: 29.99,
      quantity: 100,
    },
    {
      name: 'Unisex Item 1',
      category: categories[2]._id,
      description:
        'Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'unisex1.png',
      price: 39.99,
      quantity: 100,
    },
    {
      name: 'Unisex Item 2',
      category: categories[2]._id,
      description: 'Ut laoreet tellus sit amet justo bibendum ultrices.',
      image: 'unisex2.png',
      price: 49.99,
      quantity: 200,
    },
    {
      name: 'Unisex Item 3',
      category: categories[2]._id,
      description:
        'Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'unisex3.png',
      price: 59.99,
      quantity: 100,
    },
  ]);

  console.log('Success! Products are now seeded! 🥳');

  await User.deleteMany();

  await User.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@test.com',
    password: 'secret123',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@test.com',
    password: 'secret123',
  });

  console.log('Success! Users are now seeded! 🥳');

  process.exit();
});
