const loadPhones = async (searchItem, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchItem}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details-container');
    phoneDetails.innerHTML=`
        <p>Brand: ${phone.brand}</p>
    `
}

const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length >10){
        phones = phones.slice(0,10);
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }
    const errorMessage = document.getElementById('err-msg');
    
    if(phones.length === 0){
        errorMessage.classList.remove('hidden');
    }else{
        errorMessage.classList.add('hidden');
    }
    
    phones.forEach(phone => {
        // console.log(phone);
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

            <!-- Details -->
            <button id="show-details-btn" class="w-9/12 bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-700" onclick="showDetails('${phone.slug}')" type="button">Details</button>

        </div>`
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}

const showDetails =async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const searchField = dataLimit =>{
    const searchItem = document.getElementById('search-bar').value;
    toggleSpinner(true);
    loadPhones(searchItem, dataLimit);
}

document.getElementById('search-btn').addEventListener('click', ()=>{
    searchField(10);
})

document.getElementById('search-bar').addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        searchField(10);
    }
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

document.getElementById('show-all-btn').addEventListener('click', ()=>{
    searchField();
})

document.getElementById('show-details-btn').addEventListener('click', ()=>{
    document.getElementById('phone-details').classList.remove('hidden');
});

document.getElementById('close-details-btn').addEventListener('click', ()=>{
    document.getElementById('phone-details').classList.add('hidden');
});

loadPhones('apple')
