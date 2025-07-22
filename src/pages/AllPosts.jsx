import {useState,useEffect} from 'react'
import { Container , PostCard } from '../components/index.js'
import appwriteService from '../appwrite/config.js'

function AllPosts() {
     const [posts,setPosts] = useState([])
     appwriteService.getPosts([]).then((posts) => {
         if(posts)
         {
            setPosts(posts.documents)
            
         }
     })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {
                    posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/5'>
                             <PostCard post={post}/>
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default AllPosts