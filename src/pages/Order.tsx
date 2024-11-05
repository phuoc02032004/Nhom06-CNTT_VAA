import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import TableOrder from '../components/Tables/TableOrder';

const Order = () => {
    return (
        <>
            <Breadcrumb pageName="Order" />

            <div className="flex flex-col gap-10">
                <TableOrder />
            </div>
        </>
    );
};

export default Order;