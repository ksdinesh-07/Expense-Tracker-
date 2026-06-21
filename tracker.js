const balance=document.querySelector('#balance');
const description=document.querySelector('#desc');
const amount=document.querySelector('#amount');
const income=document.querySelector('#inc-amt')
const expense=document.querySelector('#exp-amt')
const trans=document.querySelector('#trans')
const form=document.querySelector('#form')

const local_storage=JSON.parse(localStorage.getItem("ls_trans"))

// const dummy=[
//   {id:1,description:"Flower",amount:-20},
//   {id:2,description:"Salary",amount:35000},
//   {id:3,description:"Book",amount:-10},
//   {id:4,description:"Camera",amount:150},
//   {id:5,description:"Petrol",amount:-250}

// ];

let transaction=localStorage.getItem("ls_trans")!==null ? local_storage : [];

function load_trans(transaction){
  //console.log(transaction.id)
  const sign=transaction.amount < 0 ? "-" :"+";
  //console.log(sign)
  const item=document.createElement('li')
  item.classList.add(transaction.amount<0 ? "t-exp" : "t-inc");
  trans.appendChild(item)
  item.innerHTML=`${transaction.description}<span>${sign} ${Math.abs(transaction.amount)} 
  </span> <button class="btn-del" onclick="remove_trans(${transaction.id})" >x</button>`;

}

function config(){
  trans.innerHTML='';
  transaction.forEach((load_trans))
  upadate_amt();
}


window.addEventListener("load",function(){
  config();
})

function remove_trans(id){
  if (confirm("Are you sure you want to delete the Transcation?")){
    transaction=transaction.filter((transaction)=>
      transaction.id!=id);
      config();
      update_local_storage()
    }
  else{
    return;
  }
}

function upadate_amt(){
  const amt=transaction.map((transaction)=>transaction.amount)
  const tot=amt.reduce((acc,item)=>(acc+item),0).toFixed(2);
  balance.innerHTML=`$ ${tot}`

  const tot_inc=amt.filter((amt)=>amt>0).reduce((acc,item)=>(acc+item),0).toFixed(2);
  income.innerHTML=`$ ${tot_inc}`

  const tot_exp=amt.filter((amt)=>amt<0).reduce((acc,item)=>(acc+item),0).toFixed(2);
  expense.innerHTML=`$ ${Math.abs(tot_exp)}`
}

form.addEventListener("submit",add_trans)

function add_trans(e){
  e.preventDefault();
  if (description.value.trim()=="" || amount.value.trim()=="" ){
    alert('Please enter description and amount')
  }
  else{
    const trans={
      id:unique_id(),
      description:description.value,
      amount:Number(amount.value)
    }
    transaction.push(trans)
    load_trans(trans)
    description.value='';
    amount.value='';
    upadate_amt()
    update_local_storage();
  }

}

function update_local_storage(){
  localStorage.setItem("ls_trans",JSON.stringify(transaction))
}

function unique_id(){
  return Math.floor(Math.random()*10000)
}