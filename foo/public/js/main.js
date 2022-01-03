const url = "http://localhost:3000";

const projectsSection = document.querySelector("#projects");
const getProjectsButton = document.querySelector("#get-projects");
const submitButton = document.querySelector("button[type='submit']");
const projectNameInput = document.querySelector("#project-name");
const patternInput = document.querySelector("#pattern");
const yarnInput = document.querySelector("#yarn");
const notesInput = document.querySelector("#notes");
const photoInput = document.querySelector("#photo");
const knittingInput = document.querySelector("#knitting");
const crochetInput = document.querySelector("#crochet");
const inProgressInput = document.querySelector("#in-progress");
const finishedInput = document.querySelector("#finished");
const newProject = document.querySelector("#new-project");
const searchProjectNameButton = document.querySelector("#byName");
const searchProjectCraftButton = document.querySelector("#byCraft");
const searchProjectStatusButton = document.querySelector("#byStatus");
const searchProjectByName = document.querySelector("#search-project-name");
const searchProject = document.querySelector("#search-project");
const searchKnitting = document.querySelector("#search-knitting");
const searchCrochet = document.querySelector("#search-crochet");
const searchInProgress = document.querySelector("#search-in-progress");
const searchFinished = document.querySelector("#search-finished");


getProjectsButton.addEventListener("click", handleClick);
submitButton.addEventListener("click", handleSubmit);
searchProjectNameButton.addEventListener("click",searchName);
searchProjectCraftButton.addEventListener("click",searchCraft);
searchProjectStatusButton.addEventListener("click",searchStatus);

function searchName(event) {
  event.preventDefault();
  searchProjectName();
}

async function searchProjectName() {
  if(searchProjectByName.value){
    projectsSection.innerText = "";
    searchProject.lastChild.innerText = "";
    const response = await fetch(`${url}/projects/?project_name=${searchProjectByName.value}`);
    const { payload } = await response.json();
    projectsSection.innerText = "";
    if (payload === `There is no project with the name ${searchProjectByName.value}`){
      const article = document.createElement("article");
      article.innerText = payload
      projectsSection.appendChild(article)} else {
    payload.forEach(renderProject)}    
      } else {
    try {
      throw new Error("Please type a Project Name to search");
    }
    catch(e) {
      const error = document.createElement("p");
      error.innerText = `${e.name}: ${e.message}`
      error.classList = "error"
      searchProject.appendChild(error);
    }
  }
}

function searchCraft(event) {
  event.preventDefault();
  searchCraftName();
}

async function searchCraftName() {
  if(searchKnitting.checked){
    projectsSection.innerText = "";
    searchProject.lastChild.innerText = "";
    const response = await fetch(`${url}/projects/?craft=${searchKnitting.value}`);
    const { payload } = await response.json();
    projectsSection.innerText = "";
    if (payload === `There is no project with the craft ${searchKnitting.value}`){
      const article = document.createElement("article");
      article.innerText = payload
      projectsSection.appendChild(article)} else {
    payload.forEach(renderProject);
    clearFields();}    
      } else if (searchCrochet.checked) {
        projectsSection.innerText = "";
        searchProject.lastChild.innerText = "";
        const response = await fetch(`${url}/projects/?craft=${searchCrochet.value}`);
        const { payload } = await response.json();
        projectsSection.innerText = "";
        if (payload === `There is no project with the craft ${searchCrochet.value}`){
          const article = document.createElement("article");
          article.innerText = payload
          projectsSection.appendChild(article)} else {
          payload.forEach(renderProject);
          clearFields();}    
      } else { 
    try {
      throw new Error("Please select Knitting or Crochet to search");
    }
    catch(e) {
      const error = document.createElement("p");
      error.innerText = `${e.name}: ${e.message}`
      error.classList = "error"
      searchProject.appendChild(error);
    }
  }
}



function searchStatus(event) {
  event.preventDefault();
  searchStatus();
}

async function searchStatus() {
  if(searchInProgress.checked){
    projectsSection.innerText = "";
    searchProject.lastChild.innerText = "";
    const response = await fetch(`${url}/projects/?status=${searchInProgress.value}`);
    const { payload } = await response.json();
    projectsSection.innerText = "";
    if (payload === `There is no project with the status ${searchInProgress.value}`){
      const article = document.createElement("article");
      article.innerText = payload
      projectsSection.appendChild(article)} 
      else {payload.forEach(renderProject)
        clearFields();}    
      } else if (searchFinished.checked) {
        projectsSection.innerText = "";
        searchProject.lastChild.innerText = "";
        const response = await fetch(`${url}/projects/?status=${searchFinished.value}`);
        const { payload } = await response.json();
        projectsSection.innerText = "";
        if (payload === `There is no project with the status ${searchFinished.value}`){
          const article = document.createElement("article");
          article.innerText = payload
          projectsSection.appendChild(article)} else {
          payload.forEach(renderProject)
        clearFields()}    
      } else { 
    try {
      throw new Error("Please select In Progress or Finished to search");
    }
    catch(e) {
      const error = document.createElement("p");
      error.innerText = `${e.name}: ${e.message}`
      error.classList = "error"
      searchProject.appendChild(error);
    }
  }
}

  function handleSubmit(event) {
    event.preventDefault();
    addProjectInfo();
  }

  async function addProjectInfo() {
    if (!projectNameInput.value || !patternInput.value || !yarnInput.value || !notesInput.value || !photoInput.value){
      try {
        throw new Error("Please fill in all fields");
      }
      catch(e) {
        const error = document.createElement("p");
        error.innerText = `${e.name}: ${e.message}`
        error.classList = "error"
        newProject.appendChild(error);
      }
    } else {
      newProject.lastChild.innerText = "";
      console.log(gatherFormData());
      const response = await fetch(`${url}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gatherFormData()),
    });
    const data = await response.json();
    console.log(data);
    getProjects();
    clearFields();
  };
  };
  
  function clearFields(){
    projectNameInput.value = null;
    patternInput.value = null;
    yarnInput.value = null;
    notesInput.value = null;
    photoInput.value = null;
    knittingInput.checked = false;
    crochetInput.checked = false;
    inProgressInput.checked = false;
    finishedInput.checked = false;
    searchProjectByName.value = null;
    searchKnitting.checked = false;
    searchCrochet.checked = false;
    searchInProgress.checked = false;
    searchFinished.checked = false;
  };
  
  function gatherFormData() {
    const projectName = projectNameInput.value;
    let craft = "Not Specified";
    let status = "Not Specified";
    if (knittingInput.checked){
      craft = knittingInput.value;
    } else if (crochetInput.checked){
      craft = crochetInput.value;
    }
    if (inProgressInput.checked){
      status = inProgressInput.value;
    } else if (finishedInput.checked){
      status = finishedInput.value;
    }
    const pattern = patternInput.value;
    const yarn = yarnInput.value;
    const notes = notesInput.value;
    const photo = photoInput.value;
       return {
        "project_name": projectName,
        "craft": craft,
        "pattern": pattern,
        "status": status,
        "yarn": yarn,
        "notes": notes,
        "photo": photo,
    };
  };

  function handleClick(event) {
    event.preventDefault();
    getProjects();
     }

async function getProjects() {
    const response = await fetch(`${url}/projects`);
    const { payload } = await response.json();
    projectsSection.innerText = "";
    console.log(payload);
    payload.forEach(renderProject);
    clearFields();
  }

  function renderProject(project) {
    const article = createProjectArticle(project);
    projectsSection.appendChild(article);
  }

  function createProjectArticle({ project_name, craft, pattern, status, yarn, notes, photo }) {
    const article = document.createElement("article");
    const h2ProjectName = document.createElement("h2");
    h2ProjectName.innerText = `Project name: ${project_name}`;
    const pCraft = document.createElement("p");
    pCraft.innerHTML = `<strong>Craft:</strong> ${craft}`;
    const pPattern = document.createElement("p");
    pPattern.innerHTML = `<strong>Pattern:</strong> ${pattern}`;
    const pStatus = document.createElement("p");
    pStatus.innerHTML = `<strong>Status:</strong> ${status}`;
    const pYarn = document.createElement("p");
    pYarn.innerHTML = `<strong>Yarn:</strong> ${yarn}`;
    const pNotes = document.createElement("p");
    pNotes.innerHTML = `<strong>Notes:</strong> ${notes}`;
    const imgPhoto = document.createElement("img");
    imgPhoto.src = `${photo}`;
    imgPhoto.alt = 'Project picture'
    imgPhoto.width = '180';
    imgPhoto.classList = 'zoom';
    const line = document.createElement("hr");
    article.appendChild(h2ProjectName);
    article.appendChild(line);
    article.appendChild(pCraft);
    article.appendChild(pPattern);
    article.appendChild(pStatus);
    article.appendChild(pYarn);
    article.appendChild(pNotes);
    article.appendChild(imgPhoto);
        return article;
  }

// getProjects();