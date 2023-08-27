import { useEffect, useState } from 'react';
import axios from 'axios';

//promise를 인수로 받아서 해당 promise상태에 따라 반환되는 값을 직접 리턴해주는 함수
const checkPromiseStatus = (promise) => {
	let status = 'pending';
	let result;

	//promise의 상태에 따라서 상태값과 반환값을 각각 status, result변수에 담아줌
	const setPromise = promise.then(
		(value) => {
			status = 'success';
			result = value;
		},
		(error) => {
			status = 'error';
			result = error;
		}
	);

	//위에서 저장되는 status값에 따라 fetching된 결과값을 반환하는 함수를 리턴
	return () => {
		switch (status) {
			case 'pending':
				throw setPromise;
			case 'success':
				return result;
			case 'error':
				return result;
			default:
				throw new Error('Unknown Status');
		}
	};
};

//컴포넌트로부터 url을 받아서 비동기데이터를 반환하는 커스텀 훅
export const useGetData = (url) => {
	const [Data, setData] = useState(null);
	useEffect(() => {
		const getData = () => {
			const promise = axios.get(url).then((res) => res.data);
			//반환된 promise를 checkPromiseStatus라는 함수의 인수로 전달해서
			//해당 promise의 변화되는 상태값을 추적하면서 결과값을 State에 담아줌
			//promise의 상태값을 같이 내보내지 않고 await나 then구문 안쪽에서 fullfield가 완료된 값을 내보내면 부모컴포넌트에서는 promise의 상태변화를 감지할 수 없기 때문에 suspense로 동기화 처리가 불가능
			setData(checkPromiseStatus(promise));
		};

		getData();
	}, [url]);

	return Data;
};
