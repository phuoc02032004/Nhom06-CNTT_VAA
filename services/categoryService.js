const Category = require('../models/Category');

exports.createCategory = async (categoryData) => {
    const newCategory = new Category(categoryData);
    return await newCategory.save();
};

exports.getAllCategories = async () => {
    return await Category.find();
};

exports.getCategoryById = async (id) => {
    const category = await Category.findById(id);
    if (!category) throw new Error('Danh mục không tồn tại');
    return category;
};

exports.updateCategory = async (id, categoryData) => {
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, { new: true });
    if (!updatedCategory) throw new Error('Danh mục không tồn tại');
    return updatedCategory;
};

exports.deleteCategory = async (id) => {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) throw new Error('Danh mục không tồn tại');
    return deletedCategory;
};

exports.searchCategory = async (q) => {
    if (!q) throw new Error('Search query is required.');
    return await Category.find({ name: { $regex: q, $options: 'i' } });
};