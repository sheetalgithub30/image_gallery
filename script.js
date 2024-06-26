const YOUR_ACCESS_KEY= "9rgcbEAWzIQ2U4lzGcnqo7JCPAj95ojrF8NtFWZPgGY";
let page_no=1;
let inputtext;

const button = document.querySelector("#search");
const resultDiv = document.querySelector("#result");
const more = document.querySelector('#more');
const paragraph = document.querySelector("paragraph");

const loader = document.querySelector("#loading");

function displayLoading(){
  loader.classList.add("display");
  setTimeout(()=>{
      loader.classList.remove("display");
  },5000);
}

function hideLoading(){
  loader.classList.remove("display");
}

async function getImage(text,page_no){
  displayLoading();
try{
const respone = await fetch(`https://api.unsplash.com/search/photos?page=${page_no}&query=${text.value}&client_id=${YOUR_ACCESS_KEY}&`);
const result = await respone.json();
console.log(result);
hideLoading();

if(result.total == 0){
  alert("nothing to show")
  return;
}


result.results.forEach((e)=>{
   const parentDiv = document.createElement("div");
   parentDiv.classList.add("parent");
   const img = document.createElement("img");
   img.src = e.urls.small;
   parentDiv.append(img);

   const para = document.createElement("p");
   para.innerHTML = e.alt_description;
   parentDiv.append(para);

   resultDiv.append(parentDiv);
})


more.style.display = "block";

}
catch(error){
    alert("An error occurred in fetching data");
}
}


button.addEventListener("click",()=>{
  resultDiv.innerHTML=' ';
  const text = document.querySelector("input");
  if(text.value == ''){
    alert("please mention a image name you want to search");
    return;
  }
  inputtext=text;
  getImage(text);
})

more.addEventListener("click",()=>{
    page_no++;
  getImage(inputtext,page_no);
})
