type ID = number;

type Brief = {
    metadata: Metadata;
    blocks: Block[];
    sources: Source[];
    custom?: Map<string, string>;
}

type Metadata = {
    title?: string;
    author?: string;
    created_at: Date;
    updated_at: Date;
}

type Source = {
    accessed_at?: Date;
    authors?: Author[];
    date?: Date;
    publication?: string;
    title?: string;
    tracking?: string;
    url?: string;
    custom?: Map<string, string>;
}

type Author = {
    name: string;
    qualifictions: string[];
}

type Block = TextBlock | Heading | TOC | Evidence;

type BaseBlock = {
    order?: number;
    type: string;
}

type TextBlock = BaseBlock & {
    type: 'text';
    text: string;
}

type Heading = BaseBlock & {
    type: 'heading';
    text: string;
    level: number;
}

type TOC = BaseBlock & {
    type: 'toc';
    text: string;
    levels: number;
}

type Evidence = BaseBlock & {
    type: 'evidence'
    tag: string;
    subtag: string;
    source?: ID;
    // quote: Inline[];
    quote: string;
}

// type Inline = {
//   text: string;
//   style?: 'emphasis';
// }