import TableLayout from "../../models/tableLayout.js"





const layoutCreation = async (req, res) => {
    try {
        // const { row, column, id } = req.body

        const rows = Number(req.body.rows)
        const columns = Number(req.body.columns)
        const seats = req.body.seats === undefined ? 4 : Number(req.body.seats)
        const userId = String(req.user.id)

        const valid = (n) => Number.isInteger(n) && n >= 1 && n <= 50 

        if ( !valid(rows) || !valid(columns) ) {
            return res.status(400).json({ status: false, msg: "Rows and columns must be whole numbers from 1 to 50" })
        }

        if ( !Number.isInteger(seats) || seats < 1 || seats > 20 ){
            return res.status(400).json({ status: false, msg: "Seats must be a whole number from 1 to 20" })
        }



        const findUser = await TableLayout.findOne({ userId })

        if (findUser) {
            res.json({ status: false, msg: "Already have a layout", findUser })
        } 
        // else {
        //     const newLayout = await new TableLayout({ userId: id, row, column }).save()
        //     res.status(200).json({ status: true, msg: "Floor layout created", newLayout })

        // }

        
    } catch (error) {
        console.log("Error in the signup", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }


}


export default layoutCreation