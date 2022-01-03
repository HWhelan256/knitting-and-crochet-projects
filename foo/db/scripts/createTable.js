import query from "../index.js";

const createTableString = 'CREATE TABLE IF NOT EXISTS projects (project_name TEXT, craft TEXT, pattern TEXT, status TEXT, yarn TEXT, notes TEXT, photo TEXT)'

async function createProjectTable(){ 
    const res = await query(createTableString);
    };

createProjectTable();
