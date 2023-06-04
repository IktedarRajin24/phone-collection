const loadPhones = async (searchItem) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchItem}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    const showAll = document.getElementById('show-all-btn');
    if(phones.length >10){
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }
    const errorMessage = document.getElementById('err-msg');
    const phoneArray = phones.slice(0,10);
    if(phoneArray.length === 0){
        errorMessage.classList.remove('hidden');
    }else{
        errorMessage.classList.add('hidden');
    }
    
    phoneArray.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add("text-center");
        phoneDiv.classList.add("h-full");
        phoneDiv.classList.add("rounded-lg");
        phoneDiv.innerHTML =
        `<div class="bg-white w-full h-full p-4 rounded-lg">
            <img class="w-1/2 mx-auto mb-2" src=${phone.image} alt=${phone.name}>
            <hr>
        
            <h1 class="lg:text-xl md:text-lg text-md font-bold mb-2">${phone.phone_name}</h1>
            <p class="mb-2"><b>Brand:</b> ${phone.brand}</p>
            <button class="w-9/12 bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-700">Details</button>
        </div>`
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}
document.getElementById('search-btn').addEventListener('click', ()=>{
    const searchItem = document.getElementById('search-bar').value;
    toggleSpinner(true);
    loadPhones(searchItem);
})

const toggleSpinner = isLoading =>{
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }

}