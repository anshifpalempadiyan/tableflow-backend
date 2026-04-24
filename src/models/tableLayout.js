import mongoose from "mongoose";

const tableLayoutSchema = new mongoose.Schema(
    {
        userId : {
            type : String,
            required : true,
            unique : true
        },
        row : {
            type : Number,
            required : true
        },
        column : {
            type : Number,
            required : true
        },
        disabledSections : {
            type : [String],
            default : []

        }
    },
    { 
        timestamps : true 
    }
)

const TableLayout =  mongoose.model( "TableLayout" , tableLayoutSchema )

export default TableLayout