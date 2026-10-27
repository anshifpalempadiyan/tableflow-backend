import TableLayout from "../../models/tableLayout.js"



const floorPlanGet = async (req, res) => {
    try {

        const { id } = req.body
        // const id = String(req.body.id)

        const findUser = await TableLayout.findOne({ userId: id })

        if (findUser) {
            return res.status(200).json({ status: true, msg: "Welcome", findUser })
        } else {
            return res.status(404).json({ status: false, msg: "User not found" })
        }

    } catch (error) {
        console.log("Error in the ", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }


}

export default floorPlanGet