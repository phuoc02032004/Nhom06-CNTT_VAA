import axios from "axios";

const getAllCategory = async () => {
    try {
        const response = await axios.get('http://localhost:3003/api/v1/categories');
        console.log(response.data);
        return response.data.map(category => ({
            id: category._id,
            name: category.name,
            description: category.description
        }))
    } catch (error) {
        console.error('Error fetching category: ', error);
        throw error;
    }
};

const createCategory = async (name, description) => {
    try {
        const response = await axios.post('http://localhost:3003/api/v1/categories', {
            name: name,
            description: description,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Category Created:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error creating Category:', error.response.data);
        } else {
            console.error('Error creating Category:', error.message);
        }
    }
};

const updateCategory = async (id, name, description) => {
    try {
        const response = await axios.put(`http://localhost:3003/api/v1/categories/${id}`, {
            name: name,
            description: description
        });
        if (response.status === 200) {
            console.log('Category updated successfully:', response.data);
            return response.data;
        }
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3003/api/v1/categories/${id}`);
        console.log('Category Deleted:', response.data);
    } catch (error) {
        console.error('Error deleting Category:', error.response ? error.response.data : error.message);
    }
}

export { createCategory, getAllCategory, updateCategory, deleteCategory };