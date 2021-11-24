const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: {
        model: Product,
        key: ['id', 'product_name']
      }
    });
    res.json(allTags);
  } catch (err) {
    res.json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const oneTag = await Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name']
    }
  }).catch((err) => {
    res.json(err);
  });

  res.json(oneTag)
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(newTag => res.json(newTag))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
