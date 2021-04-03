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
    text: faker.lorem.words(4),
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

export const evidence = (override?: Partial<Evidence>): Evidence => ({
    id: nanoid(),
    type: 'evidence',
    tag: faker.lorem.sentence(),
    subtag: faker.lorem.sentence(),
    quote: faker.lorem.paragraph(),
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

    const NUMBER_OF_CARDS = 10;

    for (let id = 0; id < NUMBER_OF_CARDS; id++) {
        const { id } = faker.random.objectElement(sources, "id");
        const ev = evidence({ source: id });
        blocks[ev.id] = ev;
    }

    return {
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