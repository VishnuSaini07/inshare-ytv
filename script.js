const File = require('./models/file')
const fs = require('fs')
const connectDB = require('./config/db')
connectDB()

async function deleteData() {
    const pastDate = new Date(Date.now() - 24 * 3600 * 1000)
    const files = await File.find({ createdAt: { $lt: pastDate } })
    if(files.length) {
        for(const file of files) {
            try {
                fs.unlinkSync(file.path)
                await file.remove()
                console.log(`successfully deleted ${file.filename}`)
            } catch(err) {
                console.log(`Error while deleting file ${err}`)
            }
        }
        console.log('Job done!')
    }
}

deleteData().then(process.exit)