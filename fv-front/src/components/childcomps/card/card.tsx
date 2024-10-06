import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faPen } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useState } from 'react';
export default function Card({post, onLike}: {post: Post, onLike: Function}){
  const [editValue, setEditValue] = useState(post.content)
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state: RootState) => state.auth)
  const handlePostEdit = () => {
    setEditing( () => true )
  }
  return (
    <div className="border bg-zinc-900 rounded p-6 flex flex-col my-5" style={{ width:"30rem", height:"fit-content"}} >
        <div className=" flex items-center justify-between">
          <div className='flex items-center'>
            <img className="rounded-full circle" alt="D" style={{ width:'3rem', height:"3rem"}} src="./logo512.png"></img>
            <p className="px-4" style={{textTransform:'capitalize'}}>{auth.user.username}</p>
          </div>
          {
            auth.isLoggedIn && (auth.user.id === post.user_id) && <FontAwesomeIcon onClick={ handlePostEdit } className="hover:opacity-50" icon={faPen}/>
          }
        </div>
        <div style={{width: '100%', height:"auto", overflowWrap: 'break-word'}} className="my-3">
          {
            editing ? (
            <form>
              <input type="text" onChange={(e) => setEditValue( e.target.value )} value={editValue}/>
              <input type="submit" />
            </form>) : post.content
          }

        </div>
        {
          !editing && auth.isLoggedIn && (
        <div className="w-full text-gray-500">
          <FontAwesomeIcon onClick={() => onLike()} className="hover:text-white" icon={faHeart} />
          <FontAwesomeIcon className="ml-3 hover:text-white" icon={faShare} />
        </div>
          )
        }
    </div>
  )
}
