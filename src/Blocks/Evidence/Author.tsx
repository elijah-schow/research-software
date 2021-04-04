import React from 'react'

export type AuthorProps = Author;

export const Author: React.FC<AuthorProps> = ({ name, qualifictions }) => {
    // TODO: render qualifications as an inline list
    return <span className="author">
        <span className="author-name">{name}</span>
        {qualifictions.length > 0
            && <>
                {" "}
                ({qualifictions.join(', ')})
            </>}
    </span>
}

export default React.memo(Author);