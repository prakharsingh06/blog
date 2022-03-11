import {GridFsStorage} from "multer-gridfs-storage";
import multer from "multer";
const storage = new GridFsStorage({
    url : 'mongodb+srv://admin:admin@blog.ve66c.mongodb.net/blog?retryWrites=true&w=majority',
    options : {useUnifiedTopology : true, useNewUrlParser : true},
    file: (request,file)=>{
        const match = ['image/png', 'image/jpg'];
        if(match.indexOf(file.memeType)=== -1)
        {
            return `${Date.now()}-blog-${file.originalname}`
        }
        return {
            bucketName : 'photos',
            filename : `${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage});