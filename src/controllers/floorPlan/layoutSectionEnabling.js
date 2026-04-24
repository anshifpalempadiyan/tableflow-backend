import TableLayout from "../../models/tableLayout.js"



const layoutSectionEnabling = async (req, res) => {
    try {
        const { id, layoutenabled } = req.body

        const findUser = await TableLayout.findOne({ userId: id })

        if (findUser) {
            const enablingSection = await TableLayout.updateOne({ $pull : { disabledSections : { $in : layoutenabled } }})
            return res.status(400).json({ status : true , msg : "Table enabled" , enablingSection })

        } else {
            return res.status(404).json({ status: false, msg: "User not found" })

        }

    } catch (error) {
        console.log("Error in the ", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }

}

export default layoutSectionEnabling