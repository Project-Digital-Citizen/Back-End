const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
require("dotenv").config();
__path = process.cwd();

async function makeKTP(nik, prov, kabu, name, ttl, jk, jl, rtrw, lurah, camat, agama, nikah, kerja, warga, img) {
    const apiUrl = 'https://api.lolhuman.xyz/api/ktpmaker';
    const directoryName = `verify_${nik}`;
    const imageName = `verify_${name}_${nik}.jpg`;
    const directoryPath = path.join(__path, 'public', 'images', directoryName);
    const imagePath = path.join(directoryPath, imageName);

    const apiKey = process.env.APILOLHUMAN;
    const until = 'SEUMUR HIDUP';

    const url = `${apiUrl}?apikey=${apiKey}&nik=${nik}&prov=${prov}&kabu=${kabu}&name=${encodeURIComponent(name)}&ttl=${encodeURIComponent(ttl)}&jk=${jk}&jl=${encodeURIComponent(jl)}&rtrw=${rtrw}&lurah=${encodeURIComponent(lurah)}&camat=${encodeURIComponent(camat)}&agama=${encodeURIComponent(agama)}&nikah=${encodeURIComponent(nikah)}&kerja=${encodeURIComponent(kerja)}&warga=${encodeURIComponent(warga)}&until=${encodeURIComponent(until)}&img=${encodeURIComponent(img)}`;

    return new Promise(async (resolve, reject) => {
        try {
            // Create the directory if it doesn't exist
            await fs.mkdir(directoryPath, {
                recursive: true
            });

            const response = await axios.get(url, {
                responseType: 'arraybuffer'
            });
            const imageBuffer = Buffer.from(response.data);

            // Save the image data to a file
            await fs.writeFile(imagePath, imageBuffer);

            const imageUrl = `/images/${imageName}`;
            resolve(imageUrl);

        } catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;
            const errorString = Buffer.isBuffer(errorMessage) ? errorMessage.toString('utf-8') : errorMessage;

            reject(errorString);
        }
    });
}

module.exports = {
    makeKTP,
};