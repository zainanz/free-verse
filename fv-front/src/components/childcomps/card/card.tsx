import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
export default function Card({post}: {post: Post}){

  return (
    <div className="border bg-zinc-900 rounded p-6 flex flex-col" style={{height:"9rem", width:"30rem"}} >
        <span className=" flex items-center">
          <img className="bg-white rounded-full circle" alt="D" style={{ width:'3rem', height:"3rem"}} src="./logo512.png"></img>
          <p className="px-4">Zainan Ali</p>
        </span>
        <span className="w-full h-full flex items-center">
          {post.content}
        </span>
        <div className="w-full text-gray-500">
          <FontAwesomeIcon className="hover:text-white" icon={faHeart} />
          <FontAwesomeIcon className="ml-3 hover:text-white" icon={faShare} />
        </div>
    </div>
  )
}
