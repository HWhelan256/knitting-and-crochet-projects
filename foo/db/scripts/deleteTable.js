import query from "../index.js";

const deleteTableString = 'DELETE FROM projects'

async function deleteTable(){ 
    const res = await query(deleteTableString);
    };

deleteTable();
