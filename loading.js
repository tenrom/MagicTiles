function LoadMusic(){
    let id=document.getElementById('ytid').value
    if (id) {
        open(String(window.location).split('/').slice(0,-1).join("/")+'/main.html?id='+id,'_self')
    }
}

document.getElementById('loadbtn').addEventListener('click',LoadMusic)


if (window.location.search){
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('ytid').value=urlParams.get('id')
}