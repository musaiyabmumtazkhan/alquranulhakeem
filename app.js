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

let viewport=page.getViewport({scale:1})

let screenHeight=window.innerHeight-120

let scale=screenHeight/viewport.height

viewport=page.getViewport({scale:scale})

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

canvas.style.transform="translateX(-60px)"

setTimeout(()=>{

canvas.style.transform="translateX(0)"

pageNum++

renderPage(pageNum)

},120)

}

let startX=0

document.addEventListener("touchstart",e=>{

startX=e.touches[0].clientX

})

document.addEventListener("touchend",e=>{

let endX=e.changedTouches[0].clientX

if(endX-startX>60){

nextPage()

}

})

parahSelect.addEventListener("change",e=>{

loadPDF(e.target.value)

})

loadPDF(currentPDF)
