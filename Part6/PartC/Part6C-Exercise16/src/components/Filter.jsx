import { setFilter,resetFilter } from "../reducers/filterSlice";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

	const handleChange = (event) => {
    if(event.target.value === ""){
      dispatch(resetFilter());
    }else{
      dispatch(setFilter(event.target.value));
    }
    
  }
	const style = {
		marginTop: 10,
		marginBottom: 10,
	};

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	);
};

export default Filter;
