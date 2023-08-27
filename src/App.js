import { useState } from 'react';

function App() {
	const [Count, setCount] = useState(0);
	const [Items, setItems] = useState([]);

	const handleClick = () => {
		setCount(Count + 1);

		const arr = Array(10000)
			.fill(1)
			.map((_, idx) => Count + idx);
		setItems(arr);
	};

	return (
		<div className='App'>
			<button onClick={handleClick}>{Count}</button>
			<ul>
				{Items.map((num) => (
					<li key={num}>{num}</li>
				))}
			</ul>
		</div>
	);
}

export default App;

/*
  useTransition
	: 컴포넌트 렌더링시 연산의 우선순위를 줘서 좀 늦게 렌더링처리해도 될 요소를 지정
	: 기존에는 한번 렌더링 연산이 시작되면 중간에 멈추는게 불가
	: 특정 핸들러 함수에 의해서 화면을 재연산해서 렌더링해야 되는 경우 중간에 무거운 연산처리가 있으면 나머지 연산도 같이 지연이 일어남
*/
