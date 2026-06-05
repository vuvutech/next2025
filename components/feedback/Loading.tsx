const Loading = (_props: Record<string, never>) => {
	return (
		<div className="h-screen flex justify-center items-center">
			<div className="loaderAnim" />
		</div>
	);
};

export default Loading;
