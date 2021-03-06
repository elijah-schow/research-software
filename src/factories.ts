import faker from 'faker';
import { nanoid } from 'nanoid';

export const heading = (override?: Partial<Heading>): Heading => ({
    id: nanoid(),
    type: 'heading',
    text: faker.lorem.sentence(),
    level: 1,
    ...override
});

export const toc = (override?: Partial<TOC>): TOC => ({
    id: nanoid(),
    type: 'toc',
    text: 'Table of Contents',
    levels: 3,
    ...override,
});

export const qualifiction = (): string => {
    return `${faker.name.title()} at ${faker.company.companyName()}`;
}

export const author = (override?: Partial<Author>): Author => ({
    name: faker.name.findName(),
    qualifictions: [
        qualifiction(),
        qualifiction(),
        qualifiction(),
    ],
    ...override,
});

export const source = (override?: Partial<Source>): Source => ({
    id: nanoid(),
    authors: [author()],
    title: faker.lorem.words(3),
    publication: faker.company.companyName(),
    url: `${faker.internet.url()}/articles/${faker.lorem.words(4).replaceAll(' ', '-')}`,
    date: faker.date.past(),
    accessed_at: new Date(), // now
    ...override,
});

export const quote = (override?: Partial<RichText>): RichText => ({
    text: faker.lorem.paragraph(),
    metadata: [],
    ...override,
});

export const evidence = (override?: Partial<Evidence>): Evidence => ({
    id: nanoid(),
    type: 'evidence',
    tag: faker.lorem.sentence(),
    subtag: faker.lorem.sentence(),
    quote: quote(),
    source: '',
    ...override,
});

export const brief = (): Brief => {

    // Create a pool of sources - using arrays
    const NUMBER_OF_SOURCES = 5;
    const sources: { [key: string]: Source } = {};

    for (let id = 0; id < NUMBER_OF_SOURCES; id++) {
        const src = source();
        sources[src.id] = src;
    }

    // Gather a bunch of evidence
    const blocks: { [key: string]: Block } = {};

    let id = nanoid();
    blocks[id] = heading({ id });

    id = nanoid();
    blocks[id] = toc({ id });

    const NUMBER_OF_SECTIONS = faker.random.number({ min: 3, max: 6 });
    for (let section = 0; section < NUMBER_OF_SECTIONS; section++) {
        const h1 = heading({ level: 1 });
        blocks[h1.id] = h1;
        const NUMBER_OF_SUBSECITONS = faker.random.number({ min: 3, max: 6 });
        for(let subsection = 0; subsection < NUMBER_OF_SUBSECITONS; subsection++) {
            const h2 = heading({ level: 2 });
            blocks[h2.id] = h2;
            const NUMBER_OF_CARDS = faker.random.number({ min: 3, max: 6 });
            for (let id = 0; id < NUMBER_OF_CARDS; id++) {
                const { id } = faker.random.objectElement(sources, "id");
                const ev = evidence({ source: id });
                blocks[ev.id] = ev;
            }
        }
    }

    return {
        id: nanoid(),
        metadata: {
            author: faker.name.findName(),
            title: faker.lorem.words(5),
            created_at: faker.date.past(),
            updated_at: new Date(),
        },
        blocks,
        sources,
    }

};

export const newBrief = (): Brief => ({
    id: nanoid(),
    metadata: {
        title: "Untitled",
        created_at: new Date(),
        updated_at: new Date(),
    },
    blocks: {},
    sources: {},
})