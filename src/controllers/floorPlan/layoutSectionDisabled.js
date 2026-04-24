import TableLayout from "../../models/tableLayout.js"





const layoutSectionDisabled = async (req, res) => {
    try {
        // console.log(req.body,"the body ")
        const { id , layoutDisabled } = req.body

        const findUser = await TableLayout.findOne({ userId : id })

        if ( findUser ) {
            const disableingSection = await TableLayout.updateOne({ $addToSet : { disabledSections : layoutDisabled }})
            return res.status(400).json({ status : true , msg : "Table disabled" , disableingSection })

        } else {
            return res.status(404).json({ status : false , msg : "User not found"})
        }
        
    } catch (error) {
        console.log("Error in the ", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }


}


export default layoutSectionDisabled