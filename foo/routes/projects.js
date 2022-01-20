import express from "express";
const router = express.Router();

import {
  getAllProjects,
  getProjectByName,
  getProjectByStatus,
  getProjectByCraft,
  createNewProject,
} from "../models/projects.js";

router.get("/", async function (req, res) {
  const { project_name, status, craft } = req.query;
  if (project_name) {
    const projectByName = await getProjectByName(project_name);
    if (projectByName.length === 0) {
      return res.json({
        success: false,
        payload: `There is no project with the name ${project_name}`,
      });
    } else {
      return res.json({ success: true, payload: projectByName });
    }
  }

  if (status) {
    const projectByStatus = await getProjectByStatus(status);
    if (projectByStatus !== undefined) {
      return res.json({ success: true, payload: projectByStatus });
    } else {
      return res.json({
        success: false,
        payload: `There is no project with the status ${status}`,
      });
    }
  }

  if (craft) {
    const projectByCraft = await getProjectByCraft(craft);
    if (projectByCraft !== undefined) {
      return res.json({ success: true, payload: projectByCraft });
    } else {
      return res.json({
        success: false,
        payload: `There is no project with the craft ${craft}`,
      });
    }
  }

  const allProjects = await getAllProjects();
  return res.json({ success: true, payload: allProjects });
});

router.post("/", async function (req, res) {
  const newProject = req.body;
  const createProject = await createNewProject(newProject);
  return res.json({ success: true, payload: newProject });
});

export default router;
