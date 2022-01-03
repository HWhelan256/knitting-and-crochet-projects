import query from "../index.js";
import {projects} from "../../app.js";

async function populateProjectsTable(){
    for (let i=0; i<projects.length; i++){
       const projectName = projects[i].project_name; 
       const craft = projects[i].craft;
       const pattern = projects[i].pattern;
       const status = projects[i].status;
       const yarn = projects[i].yarn;
       const notes = projects[i].notes;
       const photo = projects[i].photo;
       const res = await query(`INSERT INTO projects (project_name, craft, pattern, status, yarn, notes, photo) VALUES($1,$2,$3,$4,$5,$6,$7)`,[projectName, craft, pattern, status, yarn, notes, photo]);
        };
        };

populateProjectsTable();