const pageFlip = new St.PageFlip(

document.getElementById("book"),

{

width:400,
height:600,

showCover:true,

usePortrait:true,

maxShadowOpacity:0.5,

mobileScrollSupport:false,

startPage:0,

drawShadow:true,

flippingTime:800,

useMouseEvents:true,

swipeDistance:30,

}

)

pageFlip.loadFromHTML(document.querySelectorAll(".page"))

document.addEventListener("keydown",e=>{

if(e.key==="ArrowLeft"){

pageFlip.flipNext()

}

if(e.key==="ArrowRight"){

pageFlip.flipPrev()

}

})
