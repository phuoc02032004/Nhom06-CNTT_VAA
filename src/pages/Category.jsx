import { useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import TableCategory from '../components/Tables/TableCategory';
import FormAddCategory from "../components/Forms/Category/AddCategory";

const Category = () => {
    const [showForm, setShowForm] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false); // Trạng thái để làm mới TableCategory

    const handleButtonClick = () => {
        setShowForm(true);
    }

    const closeForm = () => {
        setShowForm(false);
    }

    const handleCategoryAdded = () => {
        setRefreshTable(prev => !prev); // Thay đổi giá trị để làm mới TableCategory
        closeForm(); // Đóng form sau khi thêm thành công
    }

    return (
        <>
            <Breadcrumb pageName="Category" />

            <div className="flex flex-col gap-10">
                <TableCategory refreshTable={refreshTable} /> {/* Truyền prop refreshTable */}
                <div className="p-4 md:p-6 xl:p-9">
                    <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
                        <button onClick={handleButtonClick} className="inline-flex items-center justify-center rounded-md border border-meta-3 py-4 px-10 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10 fixed bottom-4 right-4" style={{ zIndex: 1000 }}>
                            Add Category
                        </button>
                    </div>
                </div>

                {showForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="relative p-6 rounded-md w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2">
                            <button onClick={closeForm} className="absolute top-2 right-2">
                                X
                            </button>
                            <FormAddCategory onCategoryAdded={handleCategoryAdded} /> {/* Truyền onCategoryAdded */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Category;
