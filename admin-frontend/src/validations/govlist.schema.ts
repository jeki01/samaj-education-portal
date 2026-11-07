import { object, string } from "yup";

export default object({
    category: string().required(),
    subcategory: string().required(),
    subsubcategory: string().required()
})