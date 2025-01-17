import path from "path"
import fs from "fs" 

import {src, dest, watch, series} from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);


import sharp from "sharp" 

export function js(done){

    src("src/js/app.js")
        .pipe(dest("build/js")) 
    done(); 
}

export function css(done){
    src("src/scss/**/*.scss")
        //estilo css comprimido / expandend normal
        .pipe(sass().on("error",sass.logError))
        .pipe(dest("build/css"))
 
    done();
};  



export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
} 

export function dev(){
    watch("src/scss/**/*.scss",css);     
    watch("src/js/**/*.js", js); 
};


export default series( crop,js,css,dev);  //default no tiene nombre, se cambia en el package por ningun nombre 
 