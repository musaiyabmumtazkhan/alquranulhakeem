let pdfDoc=null
let pageNum=1
let currentPDF="Parah-01.pdf"

const canvas=document.getElementById("pdf")
const ctx=canvas.getContext("2d")

const pageLabel=document.getElementById("page")
const parahSelect=document.getElementById("parah")

for(let i=1;i<=30;i++){

let num=i.toString().padStart(2,"0")

let opt=document.createElement("option")

opt.value=`Parah-${num}.pdf`
opt.textContent=`Parah ${i}`

parahSelect.appendChild(opt)

}

function loadPDF(file){

currentPDF=file

pdfjsLib.getDocument(file).promise.then(pdf=>{

pdfDoc=pdf

let saved=localStorage.getItem(file)

pageNum=saved?parseInt(saved):1

renderPage(pageNum)

})

}

function renderPage(num){

pdfDoc.getPage(num).then(page=>{

const viewport=page.getViewport({scale:1.7})

canvas.height=viewport.height
canvas.width=viewport.width

page.render({
canvasContext:ctx,
viewport:viewport
})

pageLabel.textContent=`${num} / ${pdfDoc.numPages}`

localStorage.setItem(currentPDF,num)

})

}

function nextPage(){

if(pageNum>=pdfDoc.numPages) return

canvas.style.transform="translateX(-80px)"

setTimeout(()=>{

canvas.style.transform="translateX(0)"

pageNum++

renderPage(pageNum)

},150)

}

let startX=0

document.addEventListener("touchstart",e=>{

startX=e.touches[0].clientX

})

document.addEventListener("touchend",e=>{

let endX=e.changedTouches[0].clientX

// Arabic reading direction
// swipe LEFT → RIGHT = next page

if(endX-startX>50){

nextPage()

}

})

parahSelect.addEventListener("change",e=>{

loadPDF(e.target.value)

})

document.getElementById("mode").onclick=()=>{

document.body.classList.toggle("dark")

}

loadPDF(currentPDF)
