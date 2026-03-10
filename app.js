let pdfDoc=null
let pageNum=1
let currentPDF="Parah-01.pdf"

const canvas=document.getElementById("pdf-render")
const ctx=canvas.getContext("2d")
const pageNumSpan=document.getElementById("page-num")

function loadPDF(file){

currentPDF=file
pageNum=1

pdfjsLib.getDocument(file).promise.then(pdf=>{
pdfDoc=pdf
renderPage(pageNum)
})

}

function renderPage(num){

pdfDoc.getPage(num).then(page=>{

const viewport=page.getViewport({scale:1.6})

canvas.height=viewport.height
canvas.width=viewport.width

page.render({
canvasContext:ctx,
viewport:viewport
})

pageNumSpan.textContent=num+" / "+pdfDoc.numPages

})

}

document.getElementById("next").onclick=()=>{

if(pageNum>=pdfDoc.numPages) return

canvas.style.transform="translateX(-80px)"
setTimeout(()=>{
canvas.style.transform="translateX(0)"
pageNum++
renderPage(pageNum)
},300)

}

document.getElementById("prev").onclick=()=>{

if(pageNum<=1) return

canvas.style.transform="translateX(80px)"
setTimeout(()=>{
canvas.style.transform="translateX(0)"
pageNum--
renderPage(pageNum)
},300)

}

document.getElementById("parah").addEventListener("change",e=>{

loadPDF(e.target.value)

})

loadPDF(currentPDF)
