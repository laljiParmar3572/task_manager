const express = require('express');
const mongoose = require('mongoose');
const { tokenVerify } = require('../middlevare/auth.js');
const { Task, Category } = require('../model/task.js');
const router = express();
router.use(express.json());
// router.get('/api/task-list', async (req, res) => {
//   const { user_id } = req.body
//   try {
//     const task = await Task.find({ user_id: user_id });
//     if (!task) return res.status(400).send({ success: false, message: "Not found" });
//     res.status(200).json({ success: true, data: task });
//   } catch (error) {
//     res.status(400).send({ success: false, message: "Something went wrong" });
//   }
// });



// router.post('/api/task-add', async (req, res) => {

//   const taskData = req.body;
//   if (!taskData.title || !taskData.user_id) {
//     res.status(400).json({ success: false, msg: "Please send a required field" });
//   }
//   console.log('user id', taskData['user_id']);
//   taskData['user_id'] = new mongoose.Types.ObjectId(taskData['user_id']);
//   const task = await Task.create(taskData);
//   res.status(200).json({ success: true, data: task });

// });



router.post('/api/update-task', tokenVerify, async (req, res) => {
  const { name, u_id, due_date, priority, category_id, task_status } = req.body;
});



router.post('/api/add-category', async (req, res) => {

  console.log('category is called');
  const category = req.body;
  const validUserId = new mongoose.Types.ObjectId('676d74951cfeaaedd27acbf6')
  if (!category) {
    return res.status(400).json({ success: false, msg: "Please provide category details" });
  }

  try {
    const existingCategory = await Category.findOne({ user_id: validUserId });

    if (existingCategory) {
      await existingCategory.category.push(category);
      await existingCategory.save();
      console.log('New category created:', existingCategory.category[0].name);
      res.status(200).json({ success: true, category: existingCategory });
    } else {
      const newCategory = new Category({
        user_id: validUserId,
        category: [category],
      });

      await newCategory.save(); // Save the new document
      res.status(201).json({ success: true, category: newCategory });
    }
  } catch (error) {
    console.error('Error handling category:', error);
    res.status(500).json({ success: false, msg: 'Internal Server Error', error: error.message });
  }
});

router.post('/api/update-cateogry', async (req, res) => {
  try {
    const updateCateogry = req.body;
    const userId = new mongoose.Types.ObjectId('676d74951cfeaaedd27acbf6');
    const categoryId = new mongoose.Types.ObjectId('677d41ab88e30bf800076086');
    const updatedCateogry = await Category.findOneAndUpdate({ user_id: userId, 'category._id': categoryId }, {
      $set: {
        'category.$': updateCateogry,
      },

    }, {
      new: true,
    });
    console.log('update category', updatedCateogry);
    res.status(200).json({ success: true, data: updatedCateogry })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/api/delete-category', async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId('676d74951cfeaaedd27acbf6');
    const categoryId = new mongoose.Types.ObjectId('677e8872c91b70d02d48eae8');
    const deletedCategory = await Category.findOneAndUpdate({
      user_id: userId,
    }, {
      $pull: {
        category: {
          _id: categoryId,
        }
      }
    }, {
      new: true
    });
    if (!deletedCategory) {
      res.status(400).json({ success: false, error: 'Category not found' });
    }
    res.status(200).json({ success: true, data: deletedCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});



router.post('/api/add_category', async (req, res) => {
  try {
    const { user_id, name, } = req.body;
    if (!user_id || !name) {
      return res.status(400).json({ success: false, msg: "Please fill reqired fields" });
    }
    const existingCategory = await Category.findOne({ user_id: user_id });
    if (existingCategory) {
      await existingCategory.category.push({ name: name });
      await existingCategory.save();

    } else {

      await Category.create(Category({
        user_id: user_id,
        category: [{ name: name }]
      }
      ));
    }
    res.status(200).json({ success: true, msg: "Category added successfully" });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.toString() });
  }
});

router.get('/api/get_category', async (req, res) => {
  try {
    const { user_id } = req.query;
    console.log('user_id is ', user_id);
    if (!user_id) return res.status(400).json({ success: false, msg: "Please provide a user_id" });
    const categorySchema = await Category.findOne({ user_id }); // No need for ObjectId conversion
    if (!categorySchema) return res.status(200).json({ success: false, msg: "Category not found" })
    console.log('category model ', categorySchema.toObject());
    res.status(200).json({ success: true, data: categorySchema.category });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.toString() });
  }
});

router.delete('/api/delete_category', async (req, res) => {
  try {
    const { user_id, category_id } = req.body;
    if (!user_id || !category_id) return res.status(200).json({ success: false, msg: "Please provide a required value" });
    const userIdObj = new mongoose.Types.ObjectId(user_id);
    const categoryIdObj = new mongoose.Types.ObjectId(category_id);
    await Category.updateOne({ user_id: userIdObj }, { $pull: { category: { _id: categoryIdObj } } });
    res.status(200).json({ success: true, msg: "Category deleted successfully" });

  } catch (error) {
    res.status(200).json({ success: false, msg: error.toString() });

  }
});

router.put('/api/update_category', async (req, res) => {
  try {
    const { user_id, category_id, name } = req.body;
    if (!user_id || !name) return req.status(400).json({ success: false, msg: "Please provide a required value" });
    const categoryIdObj = new mongoose.Types.ObjectId(category_id);

    await Category.updateOne({ user_id, 'category._id': categoryIdObj }
      , { $set: { 'category.$.name': name } }
    );
    res.status(200).json({ success: true, msg: "Category updated scuessfully" });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.toString() });
  }
});

router.post('/api/add_task', async (req, res) => {

  try {
    const { title, user_id, status, created_date, due_date, note, priority, category_id } = req.body;
    if (!title || !user_id) return res.status(400).json({ success: false, msg: "Please provide a required fields" });
    const taskData = await Task({ title: title, user_id: user_id, status: status, created_date: created_date, due_date: due_date, note: note, priority: priority, category_id: category_id });
    const task=await taskData.save();
    console.log('task data ', task);
    res.status(200).json({ success: true, msg: `Task created successfully` });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.toString() });
  }
});

router.get('/api/get_tasks', async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ success: false, msg: "Please provide a user_id" });
    const task = await Task.find({ user_id }).lean();
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.toString() });
  }
});
router.get('/api/get_task', async (req, res) => {
  try {
    const { _id } = req.query;
    console.log("task id", _id);

    if (!task_id) return res.status(200).json({ success: false, msg: "Please provide a required field" });

    const task = await Task.findOne({ _id }).lean();
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(200).json({ success: false, msg: error.toString() });
  }
});

router.delete('/api/delete_task', async (req, res) => {
  try {
    const { _id } = req.query;
    if (!_id) return res.status(400).json({ success: false, msg: "Please provide a task_id" });
    await Task.deleteOne({ _id });
    res.status(200).json({ success: true, msg: "Task delted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.toString() });
  }
});

router.post('/api/update_task', async (req, res) => {
  console.log("update is called");
  try {
    const data = req.body;
    if (!data['_id']) return res.status(400).json({ success: false, msg: "Please provide task_id" });
    const task_id = new mongoose.Types.ObjectId(data['_id']);
    const task = await Task.findOne({ _id: task_id }).lean();
    data['user_id'] = task['user_id'];
    await Task.updateOne({ _id: task_id }, { $set: data });
    res.status(200).json({ success: true, msg: "Task update successfully" });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.toString() });
  }
});

router.get('/api/taskss', async (req, res) => {
  try {
    const { page, user_id, last_doc_id } = req.query;

    // let skip = (page - 1) * 10;
    // if (skip < 0) {
    //   skip = 0;  // Corrected this to avoid skipping negative results
    // }
    // const tasks=await Task.find({user_id}).skip(skip).limit(10);
     const tasks=await Task.aggregate([
      { 
        $project: { 
          title: "$task_name", 
          user_id: "$u_id" 
        } 
      }
    ]);
    res.status(200).json({ success: true, data: tasks });

  } catch (error) {
    res.status(400).json({ success: false, error: error.toString() })
  }

});

module.exports = router;
