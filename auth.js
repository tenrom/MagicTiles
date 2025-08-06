
// isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
// if (isMobile){
//     window.addEventListener('click',()=>{
//         if (!document.documentElement.fullscreenEnabled){
//             document.documentElement.requestFullscreen()
//         }
//     })
// }





let username
let password

getDB((json)=>{
    DB=json
    

    if (document.cookie){
        username=document.cookie.split("; ")[0].replace('username=',"")
        password=document.cookie.split("; ")[1].replace('password=',"")
        if (password===DB['accounts'][username].password){
            if (String(window.location)===String(window.location).split('/').slice(0,-1).join("/")+'/index.html'){
                document.getElementById('ConnexionDiv').style.display="none"
                LoadUserPlaylist(username)
            }
        }else{
            if (String(window.location)!==String(window.location).split('/').slice(0,-1).join("/")+'/index.html'){
                open(String(window.location).split('/').slice(0,-1).join("/")+'/index.html','_self')
            }else{
                document.getElementById('ConnexionDiv').style.display="flex"
            }
        }
    }else{
        if (String(window.location)!==String(window.location).split('/').slice(0,-1).join("/")+'/index.html'){
            open(String(window.location).split('/').slice(0,-1).join("/")+'/index.html','_self')
        }else{
            document.getElementById('ConnexionDiv').style.display="flex"
        }
    }

    if (String(window.location).includes('/shared/invitefriend.html')){
        if (window.location.search){
            const urlParams = new URLSearchParams(window.location.search);

            if (urlParams.get('code')){
                friendcode=urlParams.get('code')
                console.log(username,friendcode)
                AddFriend(username,friendcode)
                document.getElementById('InfoDiv').style.display='none'
            }
            
        }else{
            LoadUserInvitation(username)
        }
    }
})






