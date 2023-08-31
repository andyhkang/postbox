const nameEl=document.getElementById("name-el")
const inputEl=document.getElementById("input-el")
const sentEl=document.getElementById("sent")
const sendBtn=document.getElementById("send-btn")
let myLeads=[]
let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
let timeAndDate=[]
let timeAndDateFromLocalStorage=JSON.parse(localStorage.getItem("timeAndDate"))

if (leadsFromLocalStorage&&timeAndDateFromLocalStorage){
    myLeads=leadsFromLocalStorage
    timeAndDate=timeAndDateFromLocalStorage
    renderLeads()
}

sendBtn.addEventListener("click", function(){

    if (nameEl.value&&inputEl.value){
        myLeads.push(nameEl.value)
        myLeads.push(inputEl.value)
        inputEl.value=""
        nameEl.value=""
        const today = new Date()
        const time = today.getHours() + ":" + today.getMinutes()
        const date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()

        timeAndDate.push(time)
        timeAndDate.push(date)

        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        localStorage.setItem("timeAndDate", JSON.stringify(timeAndDate))
        renderLeads()

        console.log("Button clicked"); // Check if the button click event is triggered
        console.log(nameEl.value);
        console.log(inputEl.value);
    }


})

function renderLeads(){
    let listItem=""

    for(let i=0;i<myLeads.length;i+=2){
        listItem+=`
        <div class=textbox>
            <p>
                ${myLeads[i+1]}<br>
                ${myLeads[i]}
                ${timeAndDate[i]}
                ${timeAndDate[i+1]}
            </p>
        </div>
        `
    }
    sentEl.innerHTML=listItem
}

const deleteBtn=document.getElementById("delete-btn")
const pwEl=document.getElementById("pw-el")

deleteBtn.addEventListener("click", function(){
    if(pwEl.value=="0413"){
        myLeads=[]
        timeAndDate=[]
        localStorage.clear()
        renderLeads()
    }
    pwEl.value=""

})