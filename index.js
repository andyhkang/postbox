//Database setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    databaseURL: "https://bulletinboard-607b3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app=initializeApp(appSettings)
const database=getDatabase(app)
const postsListInDB=ref(database, "postsList")


// Posting features
const inputEl=document.getElementById("input-el")
const submitBtn=document.getElementById("submit-btn")
const postsListEl=document.getElementById("posts-list")

submitBtn.addEventListener("click", function(){
    if (inputEl.value){
        push(postsListInDB, inputEl.value)
        inputEl.value=""
    }
})

onValue(postsListInDB, function(snapshot) {
    const data = snapshot.val()

    // Clear the posts list
    clearPostsListEl()

    if (data) {
        const itemsArray = Object.entries(data)

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            appendItemPostsLists(currentItem)
        }
    } else {
        // If there are no items, clear the list to ensure it's empty
        clearPostsListEl()
    }
})

function appendItemPostsLists(item){
    let itemID=item[0]
    let itemValue=item[1]

    let newEl=document.createElement("li")
    newEl.textContent=itemValue

    postsListEl.append(newEl)

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB=ref(database, `postsList/${itemID}`)
        remove(exactLocationOfItemInDB)

        if (postsListEl.children.length === 1) { //why does this work? in the first place, how is appenditem function activated when onvalue is not?
            clearPostsListEl();
        }
    })
}

function clearPostsListEl(){
    postsListEl.innerHTML=""
}