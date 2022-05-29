//add to database
const username = document.getElementById("name");
const emailid = document.getElementById("email");
const phone = document.getElementById("phone");

const database = firebase.database();
const usersRef = database.ref('/users');

/*document.getElementById("submitDetails").addEventListener('click', e => {
    e.preventDefault();
    usersRef.child(emailid.value).set({
        name: username.value ,
        emailId: emailid.value,
        phoneNo: phone.value
    });
});*/

//image
const image_input = document.querySelector("#photo");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

function uploadImage() {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#photo").files[0];
    const name = emailid.innerHTML + " " + new Date();
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        console.log(url);
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                user.updateProfile({
                    displayName: username.value,
                    photoURL: url
                  })
            }
        })
        
      })
      .catch(console.error);  
}

//authentucation sign-up
document.getElementById("signup-form").addEventListener("submit",(event)=>{
    event.preventDefault()
})

function signUp(){
    uploadImage();
    /*e.preventDefault();*/
    const userID = usersRef.push().key;
    usersRef.child(userID).set({
        name: username.value ,
        emailId: emailid.value,
        phoneNo: phone.value,
    });
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
    
}

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        location.replace("../public/dashboard.html");
    }
})