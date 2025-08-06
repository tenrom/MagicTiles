let xhr = new XMLHttpRequest()

function CallAPI(url,after,method="GET"){
    xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        after(this.responseText)
    }
    }
    xhr.send()
}


const repo = "MagicTilesDB"
const owner = "tenrom"
const path = "DataBase.json"
const token = "11BUKKBDQ08OOLgZq3R3NZ_fM7nXlZmzCaWZdbvVeVZEOfdc9VibiAlCkCbVjXkREJ7MJRNAKKqdU2t17L"
let DB={}


function getDB(after){
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
            "Authorization": `Bearer ${"github_pat_"+token}`,
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(res => res.json())
    .then(data => {
        DB=data.content
        after(JSON.parse(atob(data.content)))
    })
}

function UpdateDB(mod){
    // First, get the current file SHA
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
            "Authorization": `Bearer ${"github_pat_"+token}`,
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(res => res.json())
    .then(data => {
        const sha = data.sha
        console.log(sha)
        let content=JSON.parse(atob(data.content))

        //Modify content

        let newcontent=mod(content)
        if (newcontent===0){
            return 0
        }

        DB=newcontent
        newcontent = btoa(JSON.stringify(newcontent,null,'\t')) // Base64-encoded new content

        // Now update the file
        fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            method: "PUT",
            headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "text/json; charset=iso-8859-1"
            },
            body: JSON.stringify({
            message: "Update file via API",
            content: newcontent,
            sha: sha
            })
        }).then((e)=>{
            console.log(e)
            console.log(e.status)
            // if (e.status===409){
            //     setTimeout(()=>{
            //         UpdateDB(mod)
            //     },1000)
            // }
        })
        // UpdateDB(mod)
    })
}

// AddUser('truc',"shutup") 
// AddMusicToUser('OI5RNKdJlg4',username) 


function GenerateFriendCode(name){
    return CryptoJS.SHA1(name).toString().slice(0,5)+Date.now().toString().slice(-5)
}

function GenerateQrCode(code){
    let qrcode = new QRCode(document.getElementById("qrcode"), {
        text: String(window.location).split('/').slice(0,-1).join("/")+`/shared/invitefriend.html?code=${code}`,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    }) 
}

function HashPassword(pass){
    return CryptoJS.SHA3(pass).toString()
}

function Connect(user,pass){
    if (HashPassword(pass)===DB['accounts'][user].password){
        document.getElementById('ConnexionDiv').style.display="none"
        LoadUserPlaylist(user)
        document.cookie="username="+user
        document.cookie="password="+HashPassword(pass)
        username=user
        password=pass
    }
}