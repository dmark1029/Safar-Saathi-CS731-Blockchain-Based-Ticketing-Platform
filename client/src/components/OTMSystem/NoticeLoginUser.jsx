function NoticeNoUser() {
    return (
      <p>
        ⚠️ Cannot find <span className="code">User Logged In </span>.
        Please Add User to continue.
      </p>
    );
  }
  
  export default NoticeNoUser;
  
export  function DeletedUser() {
    return (
      <p>
        ⚠️ Cannot find <span className="code">User Logged In. P.S- this user has been disabled </span>.
        Please Add User to continue.
      </p>
    );
  }