export default function CreatePost(){
  return ( <div className="border flex justify-center my-9">

    <form className="bg-zinc-900 flex flex-col p-6 rounded items-end" style={{width:"30rem"}} action="">
      <div className="flex w-full">
        <img className="rounded-full circle mr-2" alt="D" style={{ width:'3rem', height:"3rem"}} src="./logo512.png"></img>
        <input type="text" style={{height:"3rem"}} placeholder="Write your story.." className="mb-3 w-full border-none bg-zinc-400 px-3 rounded"/>
      </div>
      <input type="submit" className="bg-zinc-800 text-white font-bold border-none" value="Post" name="" style={{width:"5rem"}} id="" />
    </form>
  </div>)
}
