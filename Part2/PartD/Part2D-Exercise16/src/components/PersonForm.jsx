

const PersonForm = ({name,setName,number,setNumber,submit}) => {
  return (
      <form onSubmit={submit}>
        <div>
          name: <input value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div>
          number: <input value={number} onChange={(e)=>setNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  );
}

export default PersonForm;