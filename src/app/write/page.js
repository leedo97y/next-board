export default function Write() {
  return (
    <div>
      <div className="timeTitleDiv">
        <h3>Write page</h3>
        <form className="timeTestForm" action="/api/test" method="GET">
          <button className="getTime" type="submit">
            Get Time
          </button>
        </form>
      </div>
      <form className="writeForm" action="/api/post/new" method="POST">
        <div className="inputDiv">
          <label htmlFor="title">Title</label>
          <input name="title" className="titleInput" type="text" />
          <label htmlFor="author">Author</label>
          <input name="author" className="authorInput" type="text" />
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            className="contentInput"
            cols="50"
            rows="10"
          />
        </div>
        <button className="submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
