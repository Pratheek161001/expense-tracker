// // initial variable diclaration 

// var expensenumber = document.getElementById("chooseexpensenumber");
// var Description = document.getElementById("choosdiscription");
// var Catogary = document.getElementById("choosecategory");
// var button = document.getElementById("button");
// var datalist=document.getElementById("datalist");

// // eventlistener for adding a data

// button.addEventListener("click",addingdata)

// // function for adding data 

// function addingdata(e)
// {
//     e.preventDefault();
//     const newexpense=expensenumber.value;
//     const newdis=Description.value;
//     const newcatogary=Catogary.value;

//     var newobj={
//         newexpense:newexpense,
//         newdis:newdis,
//         newcatogary:newcatogary
//     }

//     let new_obj=JSON.stringify(newobj);
//     localStorage.setItem(newexpense,new_obj);

//     // append all data to the list for displaying

//     var newlist=document.createElement("li")
//     newlist.setAttribute("id",newexpense)
//     newlist.appendChild(document.createTextNode("Expense = "))
//     newlist.appendChild(document.createTextNode(newexpense))
//     newlist.appendChild(document.createTextNode(" Description = "))
//     newlist.appendChild(document.createTextNode(newdis))
//     newlist.appendChild(document.createTextNode(" Catagory = "))
//     newlist.appendChild(document.createTextNode(newcatogary))
    
//     // function for deleting data
    
//     function deletedata(e)
//     {
//         e.preventDefault();
//         localStorage.removeItem(newexpense);
//         var removinglist=document.getElementById(newexpense)
//         console.log(removinglist)
//         datalist.removeChild(removinglist)
//     }

//     // function for editing data

//     function editdata(e)
//     {
//         e.preventDefault();
        
//     }

//     // creating delete button and into list

//     var deletebtn = document.createElement("button")
//     deletebtn.setAttribute("id","deleting")

//     // eventlistener for deleting a data

//     deletebtn.addEventListener("click",deletedata)
//     deletebtn.appendChild(document.createTextNode("Delete"))

//     // creating edit button and into list

//     var editbtn=document.createElement("button")
//     editbtn.setAttribute("id","editing")

//     // eventlistener for editing a data
//     editbtn.addEventListener("click",editdata)
//     editbtn.appendChild(document.createTextNode("Edit"))

//     // add all to ul tag in html

//     newlist.appendChild(deletebtn)
//     newlist.appendChild(editbtn)
//     datalist.appendChild(newlist)
// }






// ALTERNATIVE METHOD






// three inputs are assigned to variables 

var expensenumber = document.getElementById("chooseexpensenumber");
var description = document.getElementById("choosdiscription");
var category = document.getElementById("choosecategory");

// both the buttons and the ul is assigned to variables

var button = document.getElementById("button");
var datalist=document.getElementById("datalist");

// below we have a eventlistener whhich is performing a arrow function on domcontentloaded which basically means the data in the screen will not disapear when we load the page

window.addEventListener('DOMContentLoaded',()=>{

    //to access all the items from the local storage we use for loop

    for(let i=0;i<localStorage.length;i++){
        // below b is used as a variable for storing key in loops which means itll have each key one after another
        let b=localStorage.key(i)
        // below res is used to a variable to get the value of the key which is b as set above
        let res=localStorage.getItem(b)
        //now in res we get the values of the each key as they are saved as key value pair in localstorage but as sting and not as onject so we do the below step to convert it back to object o that we can easily access it lateron 
        let result=JSON.parse(res)
        // now we have fetched the data from localStorage so we now need a list to put it in and dispay the same so we have a function here which is showscreen which is written later on ahead
        showScreen(result)
    }
})
// this is show screen function to display the expenses after fetching it from localstorage
function showScreen(show){
    // here show is a paramete and result is the argument that is passed

    // below another variable child is defined which makes a li tag and is getting object values as show.expense and all since it now is a object and its id has to be diff every time so we have it as change for every key and it holds the values in it and also has both the buttons in them

    let child=`<li id=${show.expense}>${show.expense}--${show.des}--${show.category} 
    <input type="button" value="delete" id="delete" onclick='del(${show.expense})'>
    <input type="button" value="edit" id="edit" onclick='editExpense(${show.expense})'></li>`
    // above on click we also have two functions to run one for deletion and other for editing 

    // below we are just adding the created list to the ul i the html using its id which we have already initialised to a variable above 
    datalist.innerHTML+=child
    
}


button.onclick=async(e)=>{
    // console.log("button submit")
    e.preventDefault()
    let obj={
        expense:expensenumber.value,
        des:description.value,
        category:category.value,
    }

    localStorage.setItem(expensenumber.value,JSON.stringify(obj))

    let child=`<li id=${expensenumber.value}>${expensenumber.value}--${description.value}--${category.value} 
    <input type="button" value="delete" id="delete" onclick='del(${expensenumber.value})'>
    <input type="button" value="edit" id="edit" onclick='editExpense(${expensenumber.value})'></li>`

    datalist.innerHTML+=child
}



function editExpense(key){

    // i have fecthed the values form local storage of that perticular list
    let result=JSON.parse(localStorage.getItem(key))
    //and asignd its values to the textboxex
    expensenumber.value=result.expense
    description.value=result.des
    category.value=result.category

    // later i removed the list form the dom and local storage
    let child=document.getElementById(key)
    console.log(child)
    console.log(datalist)
    datalist.removeChild(child)
    localStorage.removeItem(key)
}

function del(key){
    let child=document.getElementById(key)
    console.log(child)
    console.log(datalist)
    datalist.removeChild(child)
    console.log(key)
    localStorage.removeItem(key)
    console.log("delete button clicked")
}


