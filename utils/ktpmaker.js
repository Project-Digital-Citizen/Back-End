const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

function makeKTP( nik, prov, kabu, name, ttl, jk, jl, rtrw, lurah, camat, agama, nikah, kerja, warga, img) {
    const apiUrl = 'https://api.lolhuman.xyz/api/ktpmaker';
    const imagePath = path.join(__dirname, 'public', 'images', `verify_${name}_${nik}.jpg`);

    const params = {
        apikey: process.env.APILOLHUMAN,
        nik,
        prov,
        kabu,
        name,
        ttl,
        jk,
        jl,
        rtrw,
        lurah,
        camat,
        agama,
        nikah,
        kerja,
        warga,
        until: 'SEUMUR HIDUP',
        img,
    };

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(apiUrl, params, {
                responseType: 'arraybuffer'
            });

            const imageBuffer = response.data;
            
            // Save the image data to a file
            await fs.writeFile(imagePath, imageBuffer);

            resolve(imagePath);
        } catch (error) {
            reject(error.response ? error.response.data : error.message);
        }
    });
}

module.exports = {
    makeKTP,
};
