const url = "Parah-01.pdf"

let pdfDoc=null
let pageNum=1
let canvas=document.getElementById("pdf-render")
let ctx=canvas.getContext("2d")

const pageNumSpan=document.getElementById("page-num")

pdfjsLib.getDocument(url).promise.then(function(pdf){

pdfDoc=pdf

renderPage(pageNum)

})

function renderPage(num){

pdfDoc.getPage(num).then(function(page){

let viewport=page.getViewport({scale:1.5})

canvas.height=viewport.height
canvas.width=viewport.width

let renderContext={
canvasContext:ctx,
viewport:viewport
}

page.render(renderContext)

pageNumSpan.textContent=num + " / " + pdfDoc.numPages

})

}

document.getElementById("next").addEventListener("click",function(){

if(pageNum>=pdfDoc.numPages) return

pageNum++

renderPage(pageNum)

})

document.getElementById("prev").addEventListener("click",function(){

if(pageNum<=1) return

pageNum--

renderPage(pageNum)

})

if('serviceWorker' in navigator){

navigator.serviceWorker.register("sw.js")


}
