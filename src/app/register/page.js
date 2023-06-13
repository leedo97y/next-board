export default function Register() {
  return (
    <div>
      <h3>Register Page</h3>
      <form className="registerForm" action="/api/auth/signup" method="POST">
        <div className="inputDiv">
          <label htmlFor="name" for="name">
            Name
          </label>
          <input name="name" className="nameInput" type="text" />
          <label htmlFor="email">Email</label>
          <input id="email" name="email" className="emailInput" type="email" />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="passwordInput"
            type="password"
          />
        </div>
        <button className="registerSubmitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
