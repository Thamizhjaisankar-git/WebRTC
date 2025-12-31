function Avatar({ name }) {
  return (
    <div className="avatar">
      <div className="circle">
        {name.charAt(0).toUpperCase()}
      </div>
      <p>{name}</p>
    </div>
  );
}

export default Avatar;
