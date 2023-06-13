let userInfo =  document.querySelector('#user_info')
let userDom =  document.querySelector('#user')
let links = document.querySelector('#links')
let uesrnamee = localStorage.getItem("uesrname")
let loguotBtnn = document.querySelector("#logout")

if (uesrnamee) {
    links.remove()
    userInfo.style.display ="flex"
    userDom.innerHTML = uesrnamee;  
}
loguotBtnn.addEventListener('click' , function(){
    localStorage.clear();
  setTimeout(()=>{
    window.location = 'register.html'
  }, 1500)
})