import { useGetData } from './useGetData';

function Post() {
	const data = useGetData('https://jsonplaceholder.typicode.com/posts');

	return (
		<div>
			{data &&
				data.map((post) => {
					return (
						<div key={post.id}>
							<h2>{post.title}</h2>
							<hr />
							<p>{post.body}</p>
						</div>
					);
				})}
		</div>
	);
}

export default Post;
