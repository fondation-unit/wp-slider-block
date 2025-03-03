interface BlockAttributes {
	title: string;
	caption: string;
	mediaId: number[];
	mediaUrl: string[];
}

interface BlockMetadata {
    name: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    keywords?: string[];
    attributes: Record<string, unknown>;
}
