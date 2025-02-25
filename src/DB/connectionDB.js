
import mongoose from 'mongoose'

export const checkDbConnection =async()=> {
 //mongooseApp is the name of database i need to create or connect to 
  await mongoose.connect(process.env.URI_ONLINE).then(()=>{
    console.log('connection to mongodb done')
  }).catch((err)=>{
    console.error('failed connection',err)
  })

}
