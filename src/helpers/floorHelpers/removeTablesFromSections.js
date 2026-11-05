




const removeTablesFromSections = ( layout , ids ) => {

    const gone = new Set( ids )
    const nameOf = new Map( layout.tables.map((t) => [ t.id , t.name ]))

    const notices = []
    const kept = []

    for ( const section of layout.sections ) {
        const removedHere = section.tablesId.filter((t) => gone.has( t.id ))
        const left = section.tablesId.filter((t) => !gone.has( t.id ) )

        for ( const id of removedHere ) {
            notices.push(`${nameOf.get(id) || id} was removed from ${section.name}`)
        }

        if ( removedHere.length && left.length === 0 ) {
            notices.push(`${section.name} was deleted because it has no tables left`)
            continue
        }

        const plain = section.toObject()
        plain.tablesId = left
        kept.push(plain)

    }

    layout.section = kept
    return notices

}

export default removeTablesFromSections