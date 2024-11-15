const getstore=async()=>{
  const token=localStorage.getItem('token');
  const url='http://localhost:5005/store';
  const response = await fetch(url, {
    method:"GET",
    headers:{
      "Content-type":"application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
  if(response.ok){
    const data = await response.json();
    return data;
  }
        
}

const putstore=async(store)=>{
  const token=localStorage.getItem('token');
  const url='http://localhost:5005/store';
  const response = await fetch(url, {
    method:"PUT",
    body:JSON.stringify({
      store,
    }),
    headers:{
      "Content-type":"application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
  if(response.ok){
    const data = await response.json();
    return data;
  }
}
export {getstore,putstore};