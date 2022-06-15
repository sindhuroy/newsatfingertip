console.log("This is my index js");

//Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

//Create a get request
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://api.mediastack.com/v1/news?access_key=fbbed0de50a7a20428ef8cd9025f8c53&countries=in', true);

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let data = json.data;
        let newsHtml = "";
        data.forEach(function(element,index){
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                        aria-expanded="true" aria-controls="collapse${index}">
                                        <b>Breaking News ${index+1} </b>${element["title"]}
                                    </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}"
                                data-parent="#newsAccordion">
                                <div class="card-body">${element["content"]}.<a href="${element["url"]}" target="_blank">Read More</a></div>
                            </div>
                        </div>`
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some Error occured")
    }
}
xhr.send()