import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
    {
        id : { type : String , required : true },   // row - column
        name : { type : String , required : true , trim : true , maxlength : 30 },
        row : { type : Number , required : true , min : 0 },  // row position 
        column : { type : Number , required : true , min : 0 }, // column position 
        disabled : { type : Boolean , default : false },  // is disabled or enabled 
        seats : { type : Number , default : 4 , min : 1 , max : 20 }
    },
    { _id : false }
)

const staffSchema = new mongoose.Schema(
    {
        id : { type : String , required : true  },
        name : { type : String , required : true , trim : true , maxlength : 40 },
        role : { type : String , required : true , enum : ["captain" , "waiter"] }
    },
    { _id : false }
)

const sectionSchema = new mongoose.Schema(
    {
        id : { type : String , required : true },
        name : { type : String , required : true , trim : true , maxlength : 30 },
        tablesId : { type : [String] , default : [] },
        captainId : { type : String , default : null }
    },
    { _id : false }
)

const tableLayoutSchema = new mongoose.Schema(
    {
        userId : { type : String , required : true , unique : true },
        rows : { type : Number , required : true , min : 1 , max : 50 },  // means row grid size 
        columns : { type : Number , required : true , min : 1 , max : 50, }, // means column grid size
        tables : { type : [ tableSchema ] , default : [] },
        staff : { type : [ staffSchema ] , default : [] },
        section : { type : [ sectionSchema ] , default : [] },
        setupStep : { type : Number , default : 0 , min : 0 , max : 3 }

    },
    { 
        timestamps : true 
    }
)

const TableLayout =  mongoose.model( "TableLayout" , tableLayoutSchema )

export default TableLayout