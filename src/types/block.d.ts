interface BlockAttributes {
  title: string;
  caption: string;
  loop: boolean;
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
