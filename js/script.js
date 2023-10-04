const url = " https://japceibal.github.io/japflix_api/movies-data.json"
let data = []
document.addEventListener("DOMContentLoaded", () => {
    fetch(url)
    .then(response => response.json())
        .then(json => 
            data = json)
})

const btnBuscar = document.getElementById("btnBuscar");


btnBuscar.addEventListener("click", () => {
    let pelicula = document.getElementById("inputBuscar").value.toLowerCase();
      
        let a = data.filter(info => info.title.toLowerCase().includes(pelicula)|| info.overview.toLowerCase().includes(pelicula) || info.tagline.toLowerCase().includes(pelicula) || info.genres.filter(info => info.name.toLowerCase().includes(pelicula)));
        showMoveList(a);
})        

function showMoveList(a){
    let html = "";
    for (let i=0;i<a.length-1;i++) {
            html += `
            <li>    
                <button class="btn btn-primary " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">${showButton(a[i])}</button>

                <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasTopLabel">${a[i].title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        ${a[i].overview}
                        <br><hr>
                        ${showGenres(a[i].genres)}
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            More
                        </button>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item">Year: ${showYear(a[i].release_date)}</li>
                            <li class="dropdown-item">Runtime: ${a[i].runtime} min</li>
                            <li class="dropdown-item">Budget: $${a[i].budget}</li>
                            <li class="dropdown-item">Revenue: $${a[i].revenue}</li>
                        </ul>
                    </div>
                </div>
            </li>    
            `
}   document.getElementById("lista").innerHTML = html;
    
        
    }
    
function showGenres(genres){
    let html = "";
    for (let i=0 ; i<genres.length-1; i++){
        html += `
            ${genres[i].name} -
        `
    }
    html += genres[genres.length-1].name   
   return html;
}

function showButton(a){
    let html = `
            <h3>${a.title}<h3>
            <p>${a.overview}<p>
            ${Score(a.vote_average)} 
        `
    return html;
}




function Score(n) {
    let estrella = Math.round(n)
    switch (estrella){
        case 1,2:
            estrella = 1;
        break;
        case 3,4:
            estrella = 2;
        break;
        case 5,6:
            estrella = 3;
        break;
        case 7,8:
            estrella = 4;
        break;
        case 9,10:
            estrella = 5;
    } 
    let html="";
    let x=0;
    for(let i=estrella; i>0; i--){
        html += `<span class="fa fa-star checked"></span>`;
        x++;
    };
    for (x; x<5; x++){
        html += `<span class="fa fa-star"></span>`;
    };
    return html;
};
 
function showYear(a) {
    const fecha = new Date(a)
    const soloAño = fecha.getFullYear();
    return soloAño;
}   