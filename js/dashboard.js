var username = "";
firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("../index.html")
    }else{
        document.getElementById("user").innerHTML = "Hello, " + user.email;
        username = user.displayName;
    }
})

// Fetching the current user
//const user = firebase.auth().currentUser;


//Logout function
function logout(){
    firebase.auth().signOut()
}

