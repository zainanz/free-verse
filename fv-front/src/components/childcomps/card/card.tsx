import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
export default function Card({post, onLike}: {post: Post, onLike: Function}){
  const auth = useSelector((state: RootState) => state.auth)
  return (
    <div className="border bg-zinc-900 rounded p-6 flex flex-col" style={{ width:"30rem"}} >
        <span className=" flex items-center">
          <img className="rounded-full circle" alt="D" style={{ width:'3rem', height:"3rem"}} src="./logo512.png"></img>
          <p className="px-4">Zainan Ali</p>
        </span>
        <span className="w-full h-full flex items-center my-3">
          {post.content}
        </span>
        {
          auth.isLoggedIn && (
        <div className="w-full text-gray-500">
          <FontAwesomeIcon onClick={() => onLike()} className="hover:text-white" icon={faHeart} />
          <FontAwesomeIcon className="ml-3 hover:text-white" icon={faShare} />
        </div>
          )
        }
    </div>
  )
}
