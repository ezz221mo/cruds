                                                                                                                 
//inputs
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

function getTotal () {
   if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) 
    - +discount.value ;
    total.innerHTML = result ;
    total.style.background = '#040';
   }
   else {
    total.innerHTML = ' ';
    total.style.background = '#a00d02';
   }
}

let datePro;
if(localStorage.product){
    datePro = JSON.parse(localStorage.product);
    showData();
}else {
    datePro =[];
}


//creat data
submit.onclick = function (){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value !=''&&
     price.value !=''&& 
    category.value !=''
    && newPro.count < 100){
        if(mood === 'create'){
            if(newPro.count > 1 ){
                for(let i = 0 ; i< newPro.count ; i++ ){
                    datePro.push(newPro);
                }
            }else{
                datePro.push(newPro);
            }
        }else{
            datePro[  tmp ] = newPro;
            mood = 'create';
            submit.innerHTML ='create';
            count.style.display = 'block';
        }
        clearDate()
    }
   
    
    localStorage.setItem( 'product', JSON.stringify(datePro) );
    
    
    showData()
    
}

//clear data
 function clearDate(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


//read data

function showData() {
    getTotal();
    let table = '';
    for (let i = 0 ; i < datePro.length ; i++){
        table += `
                     <tr>
                        <td>
                            ${i+1}
                        </td>
                        <td>${datePro[i].title}</td>
                        <td>${datePro[i].price}</td>
                        <td>${datePro[i].taxes}</td>
                        <td>${datePro[i].ads}</td>
                        <td>${datePro[i].discount}</td>
                        <td>${datePro[i].total}</td>
                        <td>${datePro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                     <td><button onclick="delet(${i} ) " id="delete">delete</button></td>
                      </tr>
                      
        `
        
        
        
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelet = document.getElementById('deletall');
    if(datePro.length > 0) {
        btnDelet.innerHTML = 
        `<button onclick="deletAll()">delete All</button>
        `
        
    }else {
        btnDelet.innerHTML = '';
    }



}



//delet 
 function delet (i){
    datePro.splice(i,1);
    localStorage.product = JSON.stringify(datePro);
    showData()
 }

 //delet all 
function deletAll(){
    localStorage.clear()
    datePro.splice(0)
    showData()
}


//update 

function updateData(i){
    title.value = datePro[i].title;
    price.value = datePro[i].price;
    ads.value = datePro[i].ads;
    category.value = datePro[i].category;
    taxes.value = datePro[i].taxes;
    discount.value = datePro[i].discount;
    getTotal();
    count.style.display='none';
    submit.innerHTML = 'update';
    tmp = i;
    mood = 'update';
    scroll({
        top:0,
        behavior:"smooth",
    })
}


//search 
let searchMood = 'title';


function searchDate(id){
    let search = document.getElementById('search') ;
    if(id == 'searchTitle'){
         searchMood = 'title';
         
    }else {
        searchMood = 'category';
        
    }
    search.Placeholder = 'Search By ' + searchMood;
        search.focus()
        search.value = '';
        showData();
    }


function searchElment(value) {
    let table ='';
       if(searchMood == 'title') 
   {

    for(let i =0 ; i< datePro.length; i++){
        if(datePro[i].title.includes(value.toLowerCase())){
            table+=` 
             <tr>
            <td>
                ${i}
            </td>
            <td>${datePro[i].title}</td>
            <td>${datePro[i].price}</td>
            <td>${datePro[i].taxes}</td>
            <td>${datePro[i].ads}</td>
            <td>${datePro[i].discount}</td>
            <td>${datePro[i].total}</td>
            <td>${datePro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
         <td><button onclick="delet(${i} ) " id="delete">delete</button></td>
          </tr>
          `;
          
        }
    }

   }
   
   else{
    for(let i =0 ; i< datePro.length; i++){
        if(datePro[i].category.includes(value.toLowerCase())){
            table+=` 
             <tr>
            <td>
                ${i}
            </td>
            <td>${datePro[i].title}</td>
            <td>${datePro[i].price}</td>
            <td>${datePro[i].taxes}</td>
            <td>${datePro[i].ads}</td>
            <td>${datePro[i].discount}</td>
            <td>${datePro[i].total}</td>
            <td>${datePro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
         <td><button onclick="delet(${i} ) " id="delete">delete</button></td>
          </tr>
          `;
          
        }
    }
   }
   document.getElementById('tbody').innerHTML=table;

}