// app/auth/error/page.tsx
"use client";

export default function AuthErrorPage() {
	//   useEffect(() => {
	//     if (error === "banned") {
	//       router.replace("/banned");
	//     }
	//   }, [error, router]);

	return (
		<div className="max-w-md mx-auto p-6 text-center mt-20">
			<h1 className="text-2xl font-bold text-red-600 mb-4">Account Banned</h1>
			<p className="text-gray-700">
				Your account has been suspended. If you believe this is a mistake,
				please contact support at{" "}
				<a
					href="mailto:support@costrad.org"
					className="text-blue-600 underline"
				>
					support@costrad.org
				</a>
				.
			</p>
		</div>
	);
}
