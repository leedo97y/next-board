export default function Login() {
  return (
    <div>
      <h3>Login Page</h3>
      <form className="loginForm" action="/api/login/new" method="POST">
        <div className="inputDiv">
          <label htmlFor="email">Email</label>
          <input name="email" className="emailInput" type="email" />
          <label htmlFor="password">Password</label>
          <input name="password" className="passwordInput" type="password" />
        </div>
        <button className="loginSubmitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
