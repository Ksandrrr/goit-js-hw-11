import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
let page = 1;
let currentSearch;
const API_KEY = `33025526-c7f8a1e0e4b08b9a5d2f6635c`;


const formSearch = document.querySelector(`#search-form`);
const searchInput = document.querySelector(`#codeInput`);  
const listCard = document.querySelector(`.list-card`);
const arrow = document.querySelector(`.fixed_btn`)
arrow.style.opacity = `0`;

const fetchPixabayAPI = (searchTerm,page) => {
  return new Promise((resolve, reject) => {
   axios.get("https://pixabay.com/api/", {
      params: {
        key: API_KEY,
        q: searchTerm,
        image_type: "photo",
        orientation: "horizontal",
       safesearch: true,
       perPage: 40,
       page: page
      }
    }).then(response => {
      if (response.status === 200) {
        resolve(response.data.hits);
      } else {
        reject(new Error("Failed to retrieve images"));
      }
    }).catch(err => {
      reject(err);
    });
  });
}

formSearch.addEventListener(`submit`, searchPixabay)

function searchPixabay(e) {

  const {
    elements: { searchQuery }
  } = e.currentTarget;
  currentSearch = searchQuery.value;
 
  e.preventDefault()
  let valueInput = searchQuery.value
  fetchPixabayAPI(valueInput)
 
   .then(images => {
    if (searchQuery.value.length === 0) {
      clearCardInterface()
     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }else if (searchQuery.value.length > 0) {
      creatCardList(images)
    }

  })
   .catch(err => {
     "Sorry, there are no images matching your search query. Please try again."
   });
}

function clearCardInterface() {
  listCard.innerHTML = ``;
}
function creatCardList(array) {
  const markupArray = array.map((image) => {
    return `
    <div class="photo-card">
        <a href="${image.largeImageURL}" onclick="return false"><img class="photo_card_small" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="200" height="152"/></a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${image.likes}
          </p>
          <p class="
          ">
            <b>Views</b>
            ${image.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${image.downloads}
          </p>
        </div>
      </div>`;
  });
  listCard.innerHTML += markupArray.join('');
  const lightbox = new SimpleLightbox('.photo-card a');
}



window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    page += 1;
    fetchPixabayAPI(currentSearch, page)
      .then(images => {
        creatCardList(images);
      })
      .catch(err => {
        console.error(err);
      });
    arrow.style.opacity = `1`;
  }
});

function clearCardInterface() {
listCard.innerHTML = ``;
}













////// *** //////
const code = ["Search images..."];
let index = 0;
let letterIndex = 0;

let currentText = "";
function updateCode() {
    currentText = code[index].substring(0, letterIndex);
    searchInput.setAttribute("placeholder", currentText);
    if (letterIndex === code[index].length) {
        if (index === code.length - 1) {
            index = 0;
        } else {
            index++;
        }
        letterIndex = 0;
        setTimeout(updateCode, 10000)
    } else {
        letterIndex++;
        setTimeout(updateCode, 80);
    }
}
updateCode();
arrow.addEventListener(`click`, () => {
  arrow.style.opacity = `0`;
})

