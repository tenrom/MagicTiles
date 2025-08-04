

function AddFriend(user1,friendcode2){
    UpdateDB((content)=>{
        let user2=""
        for (let i in content.accounts){
            console.log(content.accounts[i].friendcode)
            if (content.accounts[i].friendcode===friendcode2){
                if (!content.accounts[i].friends.includes(user1)){
                    content.accounts[i].friends.push(user1)
                }
                user2=i
            }
        }
        if (!content.accounts[user1].friends.includes(user2)){
            content.accounts[user1].friends.push(user2)
        }
        
        console.log(content)
        if (user2){
            return content
        }else{
            return 0
        }
    })
}

function AddMusicToPlaylist(id,title,author,user){
    UpdateDB((content)=>{
        content.allytmusic[id]={"title":encodeURI(title),"author":encodeURI(author),"wr":0}
        content.accounts[user].musics.push({"ytid":id,"pb":0,"favorites":0})
        return content
    })
}

function AddMusicToUser(id,user){
    UpdateDB((content)=>{
        content.accounts[user].musics.push({"ytid":id,"pb":0,"favorites":0})
        return content
    })
}

function AddUser(user,pass){
    UpdateDB((content)=>{
        if (!content.accounts[user]){
            content.accounts[user]={
                "friendcode": GenerateFriendCode(user),
                "friends": [],
                "friendrequests":[],
                "password": HashPassword(pass),
                "preferences": {
                    "vibrationsStrength": 50
                },
                "musics": []
            }
        }else{
            return 0
        }
        
        return content
    })
}