type ID = string;

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type Brief = {
    metadata: Metadata;
    blocks: {
        [key: string]: Block
    };
    sources: {
        [key: string]: Source
    };
    custom?: Map<string, string>;
}

type Metadata = {
    title?: string;
    author?: string;
    created_at: Date;
    updated_at: Date;
}

type Source = {
    id: string;
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
    id: ID;
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
    level: Level;
}

type TOC = BaseBlock & {
    type: 'toc';
    text: string;
    levels: Level;
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