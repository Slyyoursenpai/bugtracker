const list = document.getElementById("bug-list") as HTMLUListElement;

if(!list){
    throw new Error("Could not find #bug-list in the page");
}

list.textContent = "App loaded"; 