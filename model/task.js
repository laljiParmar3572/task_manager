const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        index: true,
    },
    category: [{
        name: {
            type: String,
            index: true
        },
        create_at: {
            type: Date,
            default: Date.now,
        }
    }]

});
const Category = mongoose.model('category', CategorySchema);
const taskSchema = mongoose.Schema({
    title: {
        require: true,
        type: String
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        index: true,
        ref: 'users',
    },
    status: String,
    created_date: {
        type: Date,
        default: Date.now
    },
    due_date: Date,
    note: String,
    priority: String,
    category_id: String,
});

const Task = mongoose.model("Task", taskSchema);
module.exports = { Task, Category };