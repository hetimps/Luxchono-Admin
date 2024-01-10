
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonIcon from '@mui/icons-material/Person';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import QueueIcon from '@mui/icons-material/Queue';
export const Discount = [
    { value: "percentage", label: "Percentage" },
    { value: "cash", label: "Cash" },
]
export const EditStatusOption = [
    { value: "Pending", label: "Pending" },
    { value: "Shipped", label: "Shipped" },
    { value: "Out of Delivery", label: "Out of Delivery" },
    { value: "Delivered", label: "Delivered" },
    { value: "Cancelled", label: "Cancelled" },
]
export const DashboardItem = () => {
    const arr = [
        { title: "Revenue", data: "5667", Icon: AddBusinessIcon },
        { title: "Total Order", data: "766",Icon: QueueIcon },
        { title: "Total Customer", data: "4554",Icon: PersonIcon },
        { title: "Total Products", data: "543454",Icon: ProductionQuantityLimitsIcon },
    ]
    return arr;
}
