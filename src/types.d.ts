type ID = string;

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type Brief = {
    id: ID;
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
    quote: RichText;
}

// TODO: continue research and consider compat with CKEditor or Quill specs
// https://ckeditor.com/docs/ckeditor5/latest/framework/guides/architecture/editing-engine.html
type RichText = {
    text: string;
    metadata: Range[]
};

type Range = {
    start: number
    end: number
    attributes: {}
}

type SelectionModes =
    | "non-contiguous"
    | "contiguous"
    | "replace";

type State = {
    brief: Brief;
    selection: ID[];
    selection_mode: SelectionModes;
}

type Action =
    | { type: "GENERATE" }
    | { type: "RESET" }
    | { type: "LOAD", state: State }
    | { type: "SET", path: string, value: unknown } // This destroys type safety :(
    | { type: "SELECT", id: ID }
    | { type: "CLEAR_SELECTION" }
    | { type: "UNSELECT", id: ID }
    | { type: "KEYDOWN", event: KeyboardEvent }
    | { type: "KEYUP", event: KeyboardEvent }
    ;

type Context = {
    state: State,
    dispatch: React.Dispatch
    throttledDispatch: React.Dispatch
}