import { useState, useEffect } from 'react';
import axios from 'axios';

export const getData = async () => {
	const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
	return data;
};

export const useGetData = () => {
	const [Data, setData] = useState([]);
	useEffect(() => {
		const data = getData();
		setData(data);
	}, []);
	return Data;
};
