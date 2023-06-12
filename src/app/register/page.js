export default function Register() {
  return (
    <div>
      <h3>Register Page</h3>
      <form className="registerForm" action="/api/auth/signup" method="POST">
        <div className="inputDiv">
          <label htmlFor="name">Name</label>
          <input name="name" className="nameInput" type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" className="emailInput" type="email" />
          <label htmlFor="password">Password</label>
          <input name="password" className="passwordInput" type="password" />
        </div>
        <button className="registerSubmitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
