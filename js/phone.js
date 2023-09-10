// load data from server site
const loadPhones = async (inputText = '13', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

// Display phones container
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-container');
  // clear previous search items
  phoneContainer.textContent = '';
  // show all button when length > 12
  const showAllitems = document.getElementById('show-all-items');
  if (phones.length > 12 && !isShowAll) {
    showAllitems.classList.remove('hidden');
  } else {
    showAllitems.classList.add('hidden');
  }
  // slice items into 12 when there are more
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
    // creat  phone card for each phones
    const phoneCard = document.createElement('div');
    // adding a classlist for phone card
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    // set inner content by template string
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" /></figure>
   <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
   <button onclick="showHandleDetail ('${phone.slug}');my_modal_5.showModal()" class="btn btn-primary">Show Details</button>
    
    `;
    // append card to the container
    phoneContainer.appendChild(phoneCard);
  });
  toggleHandler(false);
};

// gettng search input value
const clickHandler = isShowAll => {
  // show loading spinner
  toggleHandler(true);
  const inputField = document.getElementById('input-field');
  const inputText = inputField.value;
  // load phones as search text
  loadPhones(inputText, isShowAll);
};

const toggleHandler = isloading => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isloading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
};
// Show detail modal
const showHandleDetail = async id => {
  const res = await fetch(
    // load modal data
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
};

const showPhoneDetails = phone => {
  console.log(phone);
  const showPhoneName = document.getElementById('show-detail-phone');
  showPhoneName.innerText = phone.name;
  const showModalDetail = document.getElementById('show-modal-container');
  showModalDetail.innerHTML = `
  <img src="${phone.image}"/>
  <p>storage:${phone?.mainFeatures?.storage}</p>
  <p>chipSet:${phone?.mainFeatures?.chipSet}</p>
  <p>displaySize:${phone?.mainFeatures?.displaySize}</p>
  <p>releaseDate:${phone?.releaseDate}</p>
  
  `;
  my_modal_5.showModal();
};

// show all data
const showAllHandle = () => {
  clickHandler(true);
};

loadPhones();
