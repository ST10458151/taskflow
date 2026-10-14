"use strict";
(() => {
  const KEY = "taskflow.tasks.v1";
  const $ = id => document.getElementById(id);
  const allowedCategories = ["Work","Study","Personal"];
  const allowedPriorities = ["low","medium","high"];
  const state = {tasks:loadTasks(),view:"all",category:null,status:"all",priority:"all",search:"",sort:"newest"};
  let toastTimeout;
  function validTask(t) {
    return t && typeof t.id === "string" && typeof t.title === "string" && typeof t.createdAt === "string" && typeof t.completed === "boolean";
  }
  function loadTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(saved) ? saved.filter(validTask).map(t => ({
        id:t.id,title:t.title.slice(0,100),description:typeof t.description==="string"?t.description.slice(0,500):"",
        category:allowedCategories.includes(t.category)?t.category:"Personal",
        priority:allowedPriorities.includes(t.priority)?t.priority:"medium",
        due:typeof t.due==="string" && /^\d{4}-\d{2}-\d{2}$/.test(t.due)?t.due:"",
        completed:t.completed,createdAt:t.createdAt
      })) : [];
    } catch { return []; }
  }
  function persist() {
    try { localStorage.setItem(KEY,JSON.stringify(state.tasks));return true; }
    catch {notify("Couldn't save: browser storage may be unavailable.");return false;}
  }
  function notify(message) {
    const el=$("toast");el.textContent=message;el.classList.add("show");
    clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove("show"),2800);
  }
  function localDay(date=new Date()) {
    return [date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-");
  }
  const today=() => localDay();
  function formatDue(day) {
    const [y,m,d]=day.split("-").map(Number);
    return new Date(y,m-1,d).toLocaleDateString(undefined,{month:"short",day:"numeric"});
  }
  const element = (tag,cls,text) => {const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  function matching() {
    const date=today();
    const output=state.tasks.filter(t=>{
      if(state.category && t.category!==state.category)return false;
      if(state.view==="today" && (t.due!==date || t.completed))return false;
      if(state.view==="upcoming" && (!t.due || t.due<=date || t.completed))return false;
      if(state.view==="completed" && !t.completed)return false;
      if(state.status==="active" && t.completed)return false;
      if(state.status==="completed" && !t.completed)return false;
      if(state.priority!=="all" && t.priority!==state.priority)return false;
      if(state.search && !(t.title+" "+t.description+" "+t.category).toLowerCase().includes(state.search))return false;
      return true;
    });
    const priorityWeight={high:0,medium:1,low:2};
    output.sort((a,b)=>{
      if(state.sort==="priority")return priorityWeight[a.priority]-priorityWeight[b.priority] || b.createdAt.localeCompare(a.createdAt);
      if(state.sort==="due")return (a.due||"9999-12-31").localeCompare(b.due||"9999-12-31") || b.createdAt.localeCompare(a.createdAt);
      if(state.sort==="oldest")return a.createdAt.localeCompare(b.createdAt);
      return b.createdAt.localeCompare(a.createdAt);
    });
    return output;
  }
  function render() {
    const all=state.tasks.length,done=state.tasks.filter(t=>t.completed).length,active=all-done;
    $("statTotal").textContent=all;$("statActive").textContent=active;$("statDone").textContent=done;
    const pct=all?Math.round(done/all*100):0;$("statPercent").textContent=pct;$("progressFill").style.width=pct+"%";
    $("allCount").textContent=all;
    const filtered=matching();
    $("visibleCount").textContent=filtered.length;
    $("footerSummary").textContent=filtered.length+" task"+(filtered.length===1?"":"s")+" shown · "+active+" remaining overall";
    $("clearCompleted").disabled=done===0;
    const views={all:"Your tasks",today:"Due today",upcoming:"Coming up",completed:"Completed tasks"};
    const heading=state.category?state.category+" tasks":views[state.view];
    $("sectionTitle").firstChild.textContent=heading+" ";
    $("crumb").textContent=heading;
    document.querySelectorAll("[data-view]").forEach(b=>b.classList.toggle("selected",!state.category && b.dataset.view===state.view));
    document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("selected",b.dataset.category===state.category));
    document.querySelectorAll("[data-status]").forEach(b=>b.classList.toggle("active",b.dataset.status===state.status));
    const list=$("taskList");list.replaceChildren();
    filtered.forEach(t=>list.appendChild(taskNode(t)));
    $("emptyState").hidden=filtered.length>0;
    if(!filtered.length){
      const fresh=all===0;
      $("emptyHeading").textContent=fresh?"A fresh start.":"Nothing here yet.";
      $("emptyText").textContent=fresh?"Create your first task and start making progress.":"Try changing the search or filters, or create another task.";
    }
  }
  function taskNode(t) {
    const row=element("article","task-item"+(t.completed?" is-done":""));
    const check=element("input","task-check");check.type="checkbox";check.checked=t.completed;check.setAttribute("aria-label","Mark "+t.title+(t.completed?" incomplete":" complete"));
    check.addEventListener("change",()=>{t.completed=check.checked;if(persist())notify(t.completed?"Nice work — task completed!":"Task marked to do.");render();});
    row.appendChild(check);
    const body=element("div","task-copy");body.appendChild(element("p","task-name",t.title));
    if(t.description)body.appendChild(element("p","task-description",t.description));
    const meta=element("div","task-meta");
    meta.appendChild(element("span","category-label "+t.category,t.category));
    meta.appendChild(element("span","priority-label "+t.priority,t.priority[0].toUpperCase()+t.priority.slice(1)+" priority"));
    if(t.due){const overdue=t.due<today()&&!t.completed;meta.appendChild(element("span","due-label"+(overdue?" overdue":""),(overdue?"Overdue · ":"Due ")+formatDue(t.due)));}
    body.appendChild(meta);row.appendChild(body);
    const actions=element("div","task-actions");
    const edit=element("button","icon-button","✎");edit.type="button";edit.title="Edit task";edit.setAttribute("aria-label","Edit "+t.title);
    edit.addEventListener("click",()=>openForm(t));
    const del=element("button","icon-button delete","⌫");del.type="button";del.title="Delete task";del.setAttribute("aria-label","Delete "+t.title);
    del.addEventListener("click",()=>{if(window.confirm('Delete "'+t.title+'"?')){state.tasks=state.tasks.filter(x=>x.id!==t.id);persist();render();notify("Task deleted.");}});
    actions.append(edit,del);row.appendChild(actions);return row;
  }
  const dialog=$("taskDialog"),form=$("taskForm");
  function openForm(task=null) {
    form.reset();$("titleError").hidden=true;
    $("taskId").value=task?.id||"";
    $("dialogTitle").textContent=task?"Edit task":"Create a task";
    $("saveTask").textContent=task?"Save changes":"Create task";
    $("taskTitle").value=task?.title||"";
    $("taskDescription").value=task?.description||"";
    $("taskCategory").value=task?.category||state.category||"Work";
    $("taskPriority").value=task?.priority||"medium";
    $("taskDue").value=task?.due||"";
    dialog.showModal();$("taskTitle").focus();
  }
  function closeForm(){dialog.close();}
  form.addEventListener("submit",event=>{
    event.preventDefault();
    const title=$("taskTitle").value.trim();
    if(!title){$("titleError").hidden=false;$("taskTitle").focus();return;}
    $("titleError").hidden=true;
    const id=$("taskId").value;
    const input={title,description:$("taskDescription").value.trim(),category:$("taskCategory").value,
      priority:$("taskPriority").value,due:$("taskDue").value};
    if(id){const existing=state.tasks.find(t=>t.id===id);if(existing)Object.assign(existing,input);}
    else state.tasks.unshift({id:crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random(),...input,completed:false,createdAt:new Date().toISOString()});
    persist();closeForm();render();notify(id?"Task updated.":"Task added — you've got this!");
  });
  ["newTaskTop","emptyAdd"].forEach(id=>$(id).addEventListener("click",()=>openForm()));
  ["closeDialog","cancelDialog"].forEach(id=>$(id).addEventListener("click",closeForm));
  dialog.addEventListener("click",event=>{if(event.target===dialog)closeForm();});
  document.querySelectorAll("[data-view]").forEach(button=>button.addEventListener("click",()=>{
    state.view=button.dataset.view;state.category=null;state.status="all";render();closeMenu();
  }));
  document.querySelectorAll("[data-category]").forEach(button=>button.addEventListener("click",()=>{
    state.category=button.dataset.category;state.view="all";state.status="all";render();closeMenu();
  }));
  document.querySelectorAll("[data-status]").forEach(button=>button.addEventListener("click",()=>{
    state.status=button.dataset.status;render();
  }));
  $("searchInput").addEventListener("input",event=>{state.search=event.target.value.trim().toLowerCase();render();});
  $("priorityFilter").addEventListener("change",event=>{state.priority=event.target.value;render();});
  $("sortSelect").addEventListener("change",event=>{state.sort=event.target.value;render();});
  $("clearCompleted").addEventListener("click",()=>{
    const num=state.tasks.filter(t=>t.completed).length;
    if(num&&window.confirm("Remove "+num+" completed task"+(num===1?"":"s")+"?")){
      state.tasks=state.tasks.filter(t=>!t.completed);persist();render();notify("Completed tasks cleared.");
    }
  });
  const sidebar=$("sidebar"),menu=$("menuToggle");
  function closeMenu(){sidebar.classList.remove("open");menu.setAttribute("aria-expanded","false");}
  menu.addEventListener("click",()=>{const open=sidebar.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
  $("headerDate").textContent=new Date().toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric",year:"numeric"});
  render();
})();