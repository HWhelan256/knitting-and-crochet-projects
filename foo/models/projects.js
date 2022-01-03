import query from "../db/index.js";

export async function getAllProjects() {
    const data = await query(`SELECT * FROM projects`); 
    return data.rows;
};

export async function getProjectByName(requestName) {  
    const data = await query(`SELECT * FROM projects WHERE project_name ILIKE $1`,[`%${requestName}%`]);
    return data.rows;
};

export async function getProjectByStatus(requestStatus) {  
    const data = await query(`SELECT * FROM projects WHERE status=$1`,[requestStatus]);
    return data.rows;
};

export async function getProjectByCraft(requestCraft) {  
    const data = await query(`SELECT * FROM projects WHERE craft=$1`,[requestCraft]);
    return data.rows;
};

export async function createNewProject(newProject) {
    const data = await query(`INSERT INTO projects (project_name, craft, pattern, status, yarn, notes, photo) VALUES($1,$2,$3,$4,$5,$6,$7)`,[newProject.project_name, newProject.craft, newProject.pattern, newProject.status, newProject.yarn, newProject.notes, newProject.photo]);
    return data.rows;
}

