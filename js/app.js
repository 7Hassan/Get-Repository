
// get elements
let input = document.getElementById("name-input");
let submitButtom = document.getElementById("submit");
let showData = document.querySelector(".data");
let fragment = document.createDocumentFragment();

// Run
submitOnClick();


// click on submit
function submitOnClick() {
    submitButtom.addEventListener('click', () => {
        if (input.value !== "") {
            showData.replaceChildren("");
            getData();
        }
        else{
             showData.replaceChildren("");
        }
    });
}


// get  Data from server
function getData(){
    fetch( "https://api.github.com/users/"+ input.value +"/repos")
    .then((res)=>{
        if (res.ok) {
            showData.classList.remove("error");
         
        }else{
            showData.classList.add("error");
            showData.innerHTML="Not found";
        }
        return res.json();
    }
)
    .then((repos)=>{
        repos.forEach(repo => {
            let divRepo = document.createElement("div");
            divRepo.className = "repo";
            let spanName = document.createElement("span");
            spanName.innerHTML = repo.name;
            let aElement = document.createElement("a");
            aElement.href = repo.svn_url;
            aElement.target = "_blank";
            aElement.rel = "noopener noreferrer";
            aElement.innerHTML = "Visit";
            divRepo.appendChild(spanName);
            divRepo.appendChild(aElement);
            fragment.appendChild(divRepo);
        });
        showData.appendChild(fragment);
    });
}
        