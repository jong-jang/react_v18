import { useState } from 'react';
import { flushSync } from 'react-dom';

function App() {
	console.log('re-render');
	const [Count1, setCount1] = useState(0);
	const [Count2, setCount2] = useState(0);
	const [Count3, setCount3] = useState(0);

	const returnPromise = () => new Promise((res) => setTimeout(res, 500));

	const handleClick = async () => {
		await returnPromise();
		setCount1(Count1 + 1);
		// flushSync를 이용하면 특정 state변경을 batching처리에서 제외
		flushSync(() => setCount2(Count2 + 2));
		flushSync(() => setCount3(Count3 + 3));
	};

	return (
		<div className='App'>
			<button onClick={handleClick}>button</button>
			<h1>
				{Count1} - {Count2} - {Count3}
			</h1>
		</div>
	);
}

export default App;

/*
  Automatic Batching
  : 핸들러함수 안쪽에서 복수개의 state가 변경될때 해당 변경사항들을 묶어서 (batching)해서 한번만 리랜더링
	: 기존 17버전에 batching은 적용되고 있었으나 핸들러안쪽에 promise가 반환되면 batching해제되는 문제가 18에선 해결됨
*/
