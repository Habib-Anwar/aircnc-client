import queryString from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";


const CategoryBox = ({label, icon: Icon}) => {
    const [params, setParams] = useSearchParams();
    // const value = params.get('category');
    const navigate = useNavigate();

    const handleClick = () =>{
        let currentQuery = {};
        if(params) {
            currentQuery = queryString.parse(params.toString())
        }
        const updateQuery = {
            ...currentQuery, category: label,
        }

        const url = queryString.stringifyUrl(
            {
                url: '/',
                query: updateQuery,
            },
            { skipNull: true}
        )
       navigate(url)
    }
    return (
        <div onClick={handleClick} className="flex flex-col cursor-pointer items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 border-transparent text-neutral-500">
            <Icon size={26}></Icon>
            <div className="text-sm font-medium">{label}</div>
        </div>
    );
};

export default CategoryBox;