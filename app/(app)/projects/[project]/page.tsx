import { ProjectView } from "@/views";
import axios from "axios";

import { Metadata } from "next";

interface Params {
	project: string;
}

const getPost = async (slug: string) => {
	try {
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_MAIN_URL}articles/${slug}`
		);
		return res.data;
	} catch (error) {
		console.error("Error fetching post:", error);
		return null;
	}
};

export async function generateMetadata({
	params
}: {
	params: Params;
}): Promise<Metadata> {
	const post = await getPost(params.project);

	if (!post) {
		return {
			title: "Project Not Found",
			description: "The requested project could not be found."
		};
	}
	console.log(post);

	return {
		title: post.data.title || "Project",
		description: post.data.description || post.summary || "Project details",
		openGraph: {
			title: post.data.title || "Project",
			description: post.data.summary || post.data.description || "Project details",
			images: post.data.videos?.[0]?.thumbnail
				? [{ url: post.data.videos[0].thumbnail }]
				: []
		},
		twitter: {
			title: post.data.title || "Project",
			description: post.data.summary || post.data.description || "Project details",
			images: post.data.videos?.[0]?.thumbnail
				? [{ url: post.data.videos[0].thumbnail }]
				: []
		}
	};
}

export default function ProjectPage() {
	return <ProjectView />;
}
