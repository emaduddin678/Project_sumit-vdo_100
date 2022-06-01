const milestonesData = JSON.parse(data).data;

//load course milestones data
function loadMilestones(){
    const milestones = document.querySelector('.milestones');

    milestones.innerHTML = `${milestonesData.map(function(milestone){
        return `<div class="milestone border-b" id = "${milestone._id}">
                    <div class="flex">
                        <div class="checkbox"><input type="checkbox" onclick = "markMilestone(this, ${milestone._id})"></div>
                        <div onclick = "openMilestone(this, ${milestone._id})">
                            <p>
                                ${milestone.name}
                                <span><i class="fas fa-chevron-down"></i></span>
                            </p>
                        </div>
                    </div>
                    <div class="hidden_panel ">
                        ${milestone.modules.map(function(module){
                            return `<div class="module border-b">
                                        <p>${module.name}</p>
                                    </div>`;
                        }).join("")}
                    </div>
                </div>`;
    }).join("")}`;
    
}


function openMilestone(milestoneElement, id){
    const currentPanel = milestoneElement.parentNode.nextElementSibling;

    const shownPanel = document.querySelector(".show");
    if(!currentPanel.classList.contains("show") && shownPanel){
        shownPanel.classList.remove("show");
    }
    currentPanel.classList.toggle("show");


    const activePanel = document.querySelector(".active");
    if(activePanel && !milestoneElement.classList.contains("active")){
        activePanel.classList.remove("active");
    }
    milestoneElement.classList.toggle("active");

    showMilestones(id);
    
}
 

function showMilestones(id){
    const milestoneImage  = document.querySelector(".milestoneImage");
    const name  = document.querySelector(".title");
    const details  = document.querySelector(".details");


    milestoneImage.style.opacity = "0";
    milestoneImage.src = milestonesData[id].image;
    name.innerText = milestonesData[id].name;
    details.innerText = milestonesData[id].description;
}

// listen for image load
const milestoneImage  = document.querySelector(".milestoneImage");
milestoneImage.onload = function(){
    this.style.opacity = "1";
};

function markMilestone(checkbox, id) {
    const doneList = document.querySelector(".doneList");
    const milestoneList  = document.querySelector(".milestones");
    const item = document.getElementById(id);

    if (checkbox.checked) {
        // mark as done
        milestoneList.removeChild(item);
        doneList.appendChild(item);
      } else {
        // back to main list
        milestoneList.appendChild(item);
        doneList.removeChild(item);
    
        // task - do the sorting
        // reload list
      }
}


loadMilestones()



