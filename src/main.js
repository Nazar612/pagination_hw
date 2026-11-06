const pixabay_URL = "https://pixabay.com/api/";
const pixabay_KEY = "58456254-ff86b2af8153b0e0e10fb6049";
let page = 1;

const uploadMore = document.querySelector("#uploadMore");
const gallery_list = document.querySelector("#gallery_list");

function newRequest() {

    let params = new URLSearchParams({
        page: page,
        per_page: 5
    })

        return fetch(`${pixabay_URL}?key=${pixabay_KEY}&${params}`).then((array) => {
    if(!array.ok) {
        throw new Error(array.status)
    };
    return array.json()
}).then((data) => {
    console.log(data.hits);
    markupHTML(data.hits)
    return data
});
}

function markupHTML(req) {
    const html = req.map(({id, webformatURL, tags}) => {
        return `<li class="gallery_list_item">
        <img class="gallery_list_item_img" src="${webformatURL}" alt="${tags}" id="${id}">
    </li>`
    }).join(" ")

    gallery_list.insertAdjacentHTML("beforeend", html)
}

newRequest();

uploadMore.addEventListener("click", (e) => {
    page+=1
newRequest();

})
