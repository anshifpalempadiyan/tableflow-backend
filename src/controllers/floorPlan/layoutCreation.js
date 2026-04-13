import TableLayout from "../../models/tableLayout.js"





const layoutCreation = async (req, res) => {
    try {
        const { row, column, id } = req.body

        const findUser = await TableLayout.findOne({ userId: id })

        if (findUser) {
            res.json({ status: false, msg: "Already have a layout", findUser })
        } else {
            const newLayout = await new TableLayout({ userId: id, row, column }).save()
            res.status(200).json({ status: true, msg: "Floor layout created", newLayout })

        }
    } catch (error) {
        console.log("Error in the signup", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }


}


export default layoutCreation