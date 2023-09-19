import React from "react";

import {useState, useEffect} from "react";

const List = () => {

const[data, setData]=useState([]);
const[tareaup, setTareaup]=useState({});

const url = "https://playground.4geeks.com/apis/fake/todos/user/Holito";

useEffect(() => {
   gettasks();
  }, []);

  const gettasks = () =>{
	fetch(url, {
        method: 'GET', // or 'POST'
        headers:{
        'Content-Type': 'application/json'
        }
        })
        .then(res => {
            if (res.status>= 200 && res.status<=300){
                console.log("el request se hizo bien");
                return res.json();
            }else if (res.status ==404){
                console.log(`hubo un error ${res.status} en el request`)
                createuser();
            }
        })
        .then(tareas => {
			console.log(tareas);
			setData(tareas);
        }
         )
        .catch(error => console.error(error))
    };



  const createuser =()=>{
	fetch(url, {
        method: 'POST', // or 'POST'
		body:JSON.stringify([]),
        headers:{
        'Content-Type': 'application/json'
        }
        })
        .then(res => {
            if (res.status>= 200 && res.status<=300){
                console.log("el request se hizo bien");
                return res.json();
            }else{
                console.log(`hubo un error ${res.status} en el request`)
            }
        })
        .then(estadoUsuario => {
			console.log(estadoUsuario)
        }
         )
        .catch(error => console.error(error));
  };

  function handledelete(position){
	let datoeliminar = data[position];
	setData(data.filter(dato=>dato!=datoeliminar));
	
}
function handleChange(e){
	setTareaup({label:e.target.value, done:false})
}

function handleKeydown(e){
	console.log(e);
	if(e.key=="Enter"){
		setData(current=>([...current, tareaup]));
		setTareaup({label:"", done:false})
	}
}

useEffect(() => {
	if(data.length==0){
		updatetask([{label:"No hay tareas", done:false}])
	}else{
    updatetask(data);}
  }, [data]);

  const updatetask = (todos) =>{
	fetch(url, {
        method: 'PUT', // or 'POST'
		body:JSON.stringify(todos),
        headers:{
        'Content-Type': 'application/json'
        }
        })
        .then(res => {
            if (res.status>= 200 && res.status<=300){
                console.log("el request se hizo bien");
                return res.json();
            }else if (res.status ==404){
                console.log(`hubo un error ${res.status} en el request`)
                createuser();
            }
        })
        .then(tareas => {
			console.log(tareas);
		}
         )
        .catch(error => console.error(error))
    };


	return (
		<div className="text-center">
			<input type="text" className="inputTask" placeholder="What needs to be done?" value={tareaup.label} onChange={handleChange} onKeyDown={handleKeydown}></input>
			<ul>
				{data?.map((dato, index) => <li key={index}><p>{dato.label}</p><button onClick={()=>(handledelete(index))}>X</button></li>)}
			</ul>
			
		</div>
	);
};

export default List;