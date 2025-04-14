// import { LearnMoreView } from "@/views";
import React, { Suspense, lazy } from "react";

const LearnMoreView = lazy(() => import("../../views/learnMoreView/LearnMoreView"));

export default function LearnMorePage() {
	return (
		<Suspense fallback={<div>Loading component...</div>}>
			<LearnMoreView />
		</Suspense>
	);
}
