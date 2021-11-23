const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name']
      }
    });
    res.json(allCategories);
  } catch (err) {
    res.json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const oneCategory = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name']
    },
  }).catch((err) => {
    res.json(err);
  });

  res.json(oneCategory)
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(newCategory => res.json(newCategory))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
