//添加自定义对于webpack的配置

const path = require("path")
const addPath = dir => path.join(__dirname,dir);
module.exports = {
    webpack:{
        alias:{
            "@":addPath("src")
        }
    },
}