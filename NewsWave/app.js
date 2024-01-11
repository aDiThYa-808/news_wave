const apiKey= "9e8b3fe3cc2845a2ae05be93f2705b10";
const url= "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res= await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data= await res.json();
    bindData(data.articles);
  
}

function bindData(articles){
    const cardContainer= document.getElementById("card-container");
    const cardTemplate= document.getElementById("card-template");

    cardContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone= cardTemplate.content.cloneNode(true);
        fillData(cardClone,article);
        cardContainer.appendChild(cardClone);
    });

    function fillData(cardClone,article){
        const newsImg= cardClone.querySelector('#card-image');
        const newsTitle=cardClone.querySelector('#news-title');
        const newsSource=cardClone.querySelector('#news-source');
        const newsDesc=cardClone.querySelector('#news-desc');

        newsImg.src= article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML= article.description;
        const date= new Date(article.publishedAt).toLocaleString("en-US",{ 
            TimeZone: "Asia/Jakarta",
        });
        newsSource.innerHTML=`${article.source.name} • ${date}`;
        
        cardClone.firstElementChild.addEventListener("click",()=>{
            window.open(article.url,"_blank") ;
        });
    }

} 
let selectedNavItem= null;

function clickNavItem(id){
    fetchNews(id);
    const navItem= document.getElementById(id);
    selectedNavItem?.classList.remove('active');
    selectedNavItem=navItem;
    selectedNavItem.classList.add('active');

}

const searchButton= document.getElementById('search-button');
const searchText= document.getElementById('search-text');

searchButton.addEventListener("click",()=>{
    const text= searchText.value;
    if (searchText.value==="") return;
    fetchNews(text);
    selectedNavItem.classList.remove('active');
    selectedNavItem=null;
});