import faker from 'faker';

export const heading = (override?: Partial<Heading>): Heading => ({
    type: 'heading',
    text: faker.lorem.sentence(),
    level: 1,
    ...override
});

export const toc = (override?: Partial<TOC>): TOC => ({
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
    authors: [author()],
    title: "Everything is Fake",
    publication: "Fake Press",
    url: "https://faker.fake/articles/2019/everything-is-fake",
    date: faker.date.past(),
    accessed_at: new Date(), // now
    ...override,
});

export const evidence = (override?: Partial<Evidence>): Evidence => ({
    type: 'evidence',
    tag: faker.lorem.sentence(),
    subtag: faker.lorem.sentence(),
    quote: faker.lorem.paragraph(),
    source: 0,
    ...override,
});

/**
 * @source https://stackoverflow.com/a/50948927
 */
// export function randomKey<K, V>(map: Map<K, V>) {
//     const key_list = Array.from(map.keys());
//     const index = Math.floor(Math.random() * map.size);
//     const key = key_list[index];
//     return key;
// }

export const brief = (): Brief => {
    // Create a pool of sources - using Maps
    // const NUMBER_OF_SOURCES = 5;
    // const sources = new Map();

    // for (let id = 0; id < NUMBER_OF_SOURCES; id++) {
    //     sources.set(id, source());
    // }

    // Create a bunch of evidence - using maps
    // const blocks = new Map();

    // blocks.set(blocks.size, heading());
    // blocks.set(blocks.size, toc());

    // const NUMBER_OF_CARDS = 10;

    // for (let id = 0; id < NUMBER_OF_CARDS; id++) {
    //     const source = randomKey(sources);
    //     blocks.set(blocks.size, evidence({ source }));
    // }

    // Create a pool of sources - using arrays
    const NUMBER_OF_SOURCES = 5;
    const sources = [];

    for (let id = 0; id < NUMBER_OF_SOURCES; id++) {
        sources.push(source());
    }

    // Create a bunch of evidence - using arrays
    const blocks: Block[] = [
        heading(),
        toc(),
    ];

    const NUMBER_OF_CARDS = 10;

    for (let id = 0; id < NUMBER_OF_CARDS; id++) {
        const source = Math.floor(Math.random() * sources.length);
        blocks.push(evidence({ source }));
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