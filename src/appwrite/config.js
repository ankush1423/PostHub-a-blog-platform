import conf from "../conf/config.js";
import { Client , ID , Databases , Query , Storage } from "appwrite";

export class Service{
     client = new Client()
     databases
     bucket
     constructor(){
         this.client
             .setEndpoint(conf.appwriteUrl)
             .setProject(conf.appwriteProjectId)
         this.databases = new Databases(this.client)
         this.bucket = new Storage(this.client)
     }

     async createPost({title,slug,content,feturedImage,status,userId}){
           try
           {
              return await this.databases.createDocument(
                  conf.appwriteDatabaseId,
                  conf.appwriteCollectionId,
                  slug,
                  {
                     title,
                     content,
                     feturedImage,
                     status,
                     userId
                  }
              )
           }
           catch(error)
           {
              console.log("error while uploading the post...")
           }
     }

     async updatePost(slug,{title,content,feturedImage,status}){
         try
         {
           return await this.databases.updateDocument(
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 slug,
                 {
                    title,
                    content,
                    feturedImage,
                    status
                 }
            )
         }
         catch(error)
         {
            console.log("error while updating the document")
         }
     }
     
     async deletePost(slug){
        try
        {
           await this.databases.deleteDocument(
               conf.appwriteDatabaseId,
               conf.appwriteCollectionId,
               slug
           )
           return true
        }
        catch(error)
        {
           console.log("error while deleting the post ",error)
           return false 
        }
     }

     async getPost(slug){
         try
         {
            return await this.databases.getDocument(
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 slug
            )
         }
         catch(error)
         {
            console.log("error while getting the post",error)
            return false

         }
     }

     async getPosts(queries = [Query.equal("status","active")]){
            try
            {
               return await this.databases.listDocuments(
                  conf.appwriteDatabaseId,
                  conf.appwriteCollectionId,
                  queries,
               )
            }
            catch(error)
            {
               console.log("error while getting the posts",error)
               return false
            }
     }
     
     //file upload Service
     
     async uploadFile(file){
        try
        { 
           return await this.bucket.createFile(
               conf.appwriteBucketId,
               ID.unique(),
               file
           )
        }
        catch(error)
        {
           console.log("error while uploading the file ",error)
           return false
        }
     }

     async deleteFile(fileId){
        try
        {
           await this.bucket.deleteFile(
              conf.appwriteBucketId,
              fileId
           )
           return true
        }
        catch(error)
        {
           console.log("error while deleting the file ",error)
           return false
        }
     }

     getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
     }

}

const service = new Service()

export default service










