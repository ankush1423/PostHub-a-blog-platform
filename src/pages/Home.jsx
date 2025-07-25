import {useEffect , useState} from 'react'
import {Container,PostCard} from '../components'
import appwriteServices from '../appwrite/config.js'
import { Link } from 'react-router-dom'

function Home() {

    const [posts,setPosts] = useState([])
    useEffect(() => {
        appwriteServices.getPosts([])
                        .then((posts) => {
                            setPosts(posts.documents)
                        })
    },[])

    if(posts?.length === 0 || posts === undefined)
    {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                   <Container>
                      <div className='flex flex-wrap items-center justify-center
                      '>
                           <Link to="/login">
                              <div className='p-2 w-full'>
                                <h1 className='text-2xl font-bold hover:text-gray-500'>
                                     Login to read Posts
                                </h1>
                             </div>
                           </Link>
                      </div>
                   </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
             <Container>
                 <div className='flex flex-wrap'>
                    {
                      posts?.map((post) => (
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

export default Home