export default function Signup() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="message-signup">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid magnam
        corporis eligendi! Voluptate reiciendis rem sim
      </div>
      <form
        className="login-form bg-zinc-800 flex flex-col"
        // onSubmit={handleSubmit}
      >
        <h3>Login</h3>
        <label htmlFor="email">Email</label>
        <input
          // onChange={handleUser}
          // value={user.username}
          name="email"
          type="text"
          placeholder="Email"
          id=""
        />
        <label htmlFor="username">Username</label>
        <input
          // onChange={handleUser}
          // value={user.username}
          name="user"
          type="text"
          placeholder="Username"
          id=""
        />
        <label htmlFor="phone">Phone (Optional)</label>
        <input
          // onChange={handleUser}
          // value={user.password}
          name="phone"
          type="text"
          placeholder="+000 123 456 789"
          id=""
        />
        <label htmlFor="phone">Password</label>
        <input
          // onChange={handleUser}
          // value={user.password}
          name="password"
          type="password"
          placeholder="Password"
          id=""
        />
        <p>Error here if any</p>
        <input type="submit" value="Create account" />
        <a className="secondary-form-btn" href="/signup">
          Sign in
        </a>
      </form>
    </div>
  );
}
