import TableLayout from "../../models/tableLayout.js"





const layoutCreation = async (req, res) => {
    try {

        const rows = Number(req.body.rows)
        const columns = Number(req.body.columns)
        const seats = req.body.seats === undefined ? 4 : Number(req.body.seats)
        const userId = String(req.user.id)

        const valid = (n) => Number.isInteger(n) && n >= 1 && n <= 20

        if (!valid(rows) || !valid(columns)) {
            return res.status(400).json({ status: false, msg: "Rows and columns must be whole numbers from 1 to 50" })
        }

        if (!Number.isInteger(seats) || seats < 1 || seats > 20) {
            return res.status(400).json({ status: false, msg: "Seats must be a whole number from 1 to 20" })
        }



        const findUser = await TableLayout.findOne({ userId })

        if (findUser) {
            return res.status(409).json({ status: false, msg: "Already have a layout", findUser })
        }

        const tables = []
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                tables.push({ id: `${r}-${c}`, name: `Table-${tables.length + 1}`, row: r, column: c, seats })
            }
        }

        const newLayout = await TableLayout.create({ userId, rows, columns, tables, setupStep: 1 })
        return res.status(201).json({ status: true, msg: "Floor layout created ", newLayout })


    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({ status: false, msg: "Already have a layout" })
        }

        console.log("Error in the layoutCreation", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }


}


export default layoutCreation