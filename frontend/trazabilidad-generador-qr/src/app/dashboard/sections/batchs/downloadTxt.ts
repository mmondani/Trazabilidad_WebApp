import { Batch } from "../../../models/batch.model";

export const downloadTxt = (batch: Batch) => {
    // Se genera el contenido del archivo txt
    let originIdentifier = batch.origin.identifier;
    let originDescription = batch.origin.description;
    let year = batch.year - 2000;
    let week = batch.week;
    let from = batch.from;
    let to = batch.to;
    let outputLines: string[] = [];

    for (let i = from; i <= to; i++) {
        outputLines.push(`${originIdentifier}${week.toString().padStart(2, "0")}${year.toString().padStart(2, "0")}${i.toString().padStart(5, "0")}`)
    }


    let file = new Blob([outputLines.join("\n")], {type: ".txt"});
    let a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = `${originDescription}_${week.toString().padStart(2, "0")}-${year.toString().padStart(2, "0")}_${from}-${to}`;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}