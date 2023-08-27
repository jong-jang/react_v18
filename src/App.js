function App() {
	return (
		<div className='App'>
			<h1>hello</h1>
		</div>
	);
}

export default App;

/* 
  Aotomatic Batching
  : 핸들러함수 안쪽에서 복수개의 state가 변경될때 해당 변경사항들을 묶어서 (batching)해서 한번만 리랜더링
*/
