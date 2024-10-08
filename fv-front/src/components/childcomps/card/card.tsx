import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faPen } from '@fortawesome/free-solid-svg-icons';
import { likePost, unlikePost, updatePost } from '../../store/postSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forceLogout } from '../../store/authSlice';

export default function Card({post, user}: {post: Post, user?:User|null}){
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [editValue, setEditValue] = useState(post.content)
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state: RootState) => state.auth)
  const handlePostEdit = () => {
    setEditing( () => true )
  }
  const handleEdit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const postData: UpdatePost = {
      updatedContent: editValue,
      post_id: post.id
    }
    try {
      await dispatch(updatePost(postData)).unwrap()
      setEditing(false)
    } catch(er) {
      dispatch(forceLogout(er))
      navigate("/login")
    }
  }

  const handleLike = () => {
    console.log(post)
    dispatch(likePost(post.id))
  }
  const handleDislike = () => {
    console.log(post)

    dispatch(unlikePost(post.id))
  }

  return (
    <div className="border bg-zinc-900 rounded p-6 flex flex-col my-5" style={{ width:"30rem", height:"fit-content"}} >
        <div className=" flex items-center justify-between">
          <div className='flex items-center'>
            <img className="rounded-full circle" alt="Avatar" style={{ width:'3rem', height:"3rem"}} src="./logo512.png"></img>
          <a href={post.user ? post.user.username : user!.username } className="no-underline text-white"><p className="px-4 hover:underline cursor-pointer" style={{textTransform:'capitalize'}}>{post.user ? post.user.username : user!.username}</p></a>
          </div>
          {
            auth.isLoggedIn && (auth.user.id === (post.user ? post.user.id : user!.id) ) && <FontAwesomeIcon onClick={ handlePostEdit } className="hover:opacity-50" icon={faPen}/>
          }
        </div>
        <div style={{width: '100%', height:"auto", overflowWrap: 'break-word'}} className="my-3">
          {
            editing ? (
            <form onSubmit={handleEdit} className=" flex flex-col items-end">
              <div className="flex w-full">
                <input name="content" onChange={(e) => setEditValue( e.target.value )} value={editValue} type="text" style={{height:"3rem"}} placeholder="Write your story.." className="mb-3 w-full border-none bg-zinc-400 px-3 rounded"/>
              </div>
              <div>
              <button onClick={() => setEditing(() => false)} className="text-zinc-800  text-white font-bold border-none" name="" style={{width:"5rem"}} id=""> Cancel </button>
              <input type="submit" className=" text-white bg-zinc-800 font-bold border-none ml-5" value="Save" name="" style={{width:"5rem"}} id="" />
              </div>
            </form>) : post.content
          }

        </div>
        {
          !editing && auth.isLoggedIn && (
        <div className="w-full text-gray-500 flex items-center">
          {
            post.post_liked_by_current_user ? (<div className='flex items-center'><span className='text-gray-500 text-sm mr-1.5'>{post.likes}</span><FontAwesomeIcon onClick={() => handleDislike()} className="text-red-500 hover:opacity-60" icon={faHeart} /></div>) :
            (<div className='flex items-center'><span className='text-gray-500 text-sm mr-1.5'>{post.likes}</span><FontAwesomeIcon onClick={() => handleLike()} className="hover:text-white" icon={faHeart} /></div>)
          }
          <FontAwesomeIcon className="ml-3 hover:text-white" icon={faShare} />
        </div>
          )
        }
    </div>
  )
}
