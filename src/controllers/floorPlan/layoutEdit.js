import removeTablesFromSections from '../../helpers/floorHelpers/removeTablesFromSections.js'
import TableLayout from '../../models/tableLayout.js'




const layoutEdit = async (req, res) => {

    try {

        const rows = Number(req.body.rows)
        const columns = Number(req.body.columns)
        const userId = String(req.user.id)
        // const seats = req.body.seats === undefined ? 4 : Number(req.body.seats)

        let seats
        if (req.body.seats !== undefined) {
            seats = Number(req.body.seats)
            if (!Number.isInteger(seats) || seats < 1 || seats > 20) {
                return res.status(400).json({ status: false, msg: "Seats must be a whole number from 1 to 20" })
            }
        }


        const valid = (n) => Number.isInteger(n) && n >= 1 && n <= 20

        if (!valid(rows) || !valid(columns)) {
            return res.status(400).json({ status: false, msg: "Rows and columns must be whole numbers from 1 to 20" })
        }

        // if (!Number.isInteger(seats) || seats < 1 || seats > 20) {
        //     return res.status(400).json({ status: false, msg: "Seats must be a whole number from 1 to 20" })
        // }

        const layout = await TableLayout.findOne({ userId })

        if (!layout) {
            return res.status(404).json({ status: false, msg: "Layout not found" })
        }

        if (layout.rows === rows && layout.columns === columns) {
            return res.status(400).json({ status: false, msg: "Layout is already this size" })
        }

        const removed = layout.tables.filter((t) => t.row >= rows || t.column >= columns)

        if (removed.length && req.body.confirm !== true) {

            return res.status(409).json({
                status: false,
                needsConfirm: true,
                msg: `${removed.length} table(s) would be deleted`,
                removed: removed.map((t) => ({ id: t.id, name: t.name }))
            })
        }

        const notices = removed.length ? removeTablesFromSections(layout, removed.map((t) => t.id)) : []
        console.log("function work is done",notices)

        const existing = new Map(layout.tables.map((t) => [t.id, t]))
        const usedNames = new Set(
            layout.tables.filter((t) => t.row < rows && t.column < columns).map((t) => t.name.toLowerCase())
        )

        let counter = 1
        const newTables = []

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const id = `${r}-${c}`
                const old = existing.get(id)
                if (old) {
                    newTables.push(old.toObject())
                } else {
                    while (usedNames.has(`table-${counter}`)) counter++
                    const name = `Table-${counter}`
                    usedNames.add(name.toLocaleLowerCase())

                    const table = { id, name, row: r, column: c }
                    if ( seats !== undefined ) table.seats = seats
                    newTables.push( table )
                }

            }
        }

        layout.rows = rows
        layout.columns = columns
        layout.tables = newTables
        await layout.save()
        return res.status(200).json({ status: true, msg: "Layout updated", layout, notices })

    } catch (error) {

        console.log("Error in layoutEdit", error.message)
        return res.status(500).json({ error: "Internal Server Error" })

    }
}

export default layoutEdit