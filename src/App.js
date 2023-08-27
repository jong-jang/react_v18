import { useEffect } from 'react';
import { useGetData } from './useGetData';

function App() {
	const data = useGetData();
	useEffect(() => {
		console.log(data);
	}, [data]);
	return <div className='App'></div>;
}

export default App;

/* 
	기존의 CSR, SSR방식 차이

	예전의 SSR 작업흐름
	1. 정적인 HTML파일을 서버로부터 가져옴
	2. 추후 동적인 데이터가 필요할때마다 다시 서버쪽에 요청해서 전체파일을 full load (화면 깜빡임)
	3. 이후 ajax라는 비동기 서버통신 기술이 생기면서 전체화면을 다시 full load하지 않고 필요한 데이터만 실시간으로 호출가능
	4. 비동기 데이터를 이용해서 자바스크립트로 일일이 동적 DOM을 생성하고 관리해야되는 번거로움 발생

	CSR 작업 흐름
	1. 빈 HTML 파일을 서버로부터 가져옴
	2. 자바스크립트 파일로드 (React 파일)
	3. 리액트 컴포넌트가 로드 (Data fetching)
	4. 컴포넌트 해석후 렌더링 시작
	5. 최종화면에 동적 DOM생성 (1~4 사용자는 빈화면을 rendering)

	React18버전에서의 SSR 작업흐름
	1. 서버쪽에서 미리 static한 프리랜더링된 html파일 로드
	2. 미리 렌더링된 정적인 화면을 바로 생성 (정적화면 미리 생성)
	3. 자바스크립트 파일 로드
	4. 동적 데이터를 다루는 리액트 컴포넌트 해석
	5. 기존 정적인 화면에 동적으로 연동될 부분만 대체 (hydration) Suspense활용

	React18의 Suspense
	- 각 페이지별로 구성되어 있는 컴포넌트들을 동시에 호출하는 것이 아닌 영역별로 렌더링 시점을 동기화 처리
	- 이전 버전까지는 클라이언트 컴포넌트에서만 제한적으로 동작되는 기술이었으나 18버전부터는 SSR방식의 컴포넌트에서도 적용 가능하도록 개선
	- 활용예 : 특정 컴포넌트가 렌더링 완료되기까지 다른 컴포넌트의 렌더링을 막고 이전 렌더링 컴포넌트 완료후에만 동기적으로 렌더링 시작
	- 활용예 : 서버로부터 무거운 데이터를 fetching해야 되는 컴포넌트의 경우 해당 컴포넌트 출력전까지 자동으로 로딩바 출력

	Suspense를 사용하기 위한 조건
	- Suspense로 특정 컴포넌트를 동기화시키기 위해서는 내부에 promise 객체 상태(pending, fulfilled, rejected)을 추적할 수 있어야됨
*/
