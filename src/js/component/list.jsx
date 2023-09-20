import React, { useState, useEffect } from "react";


const List = () => {

const[data, setData]=useState([]);
const[tareaup, setTareaup]=useState({ label: "" });
const [invisible, setinVisible]= useState([]);
const [numTask, setNumtask]=useState("");

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
            if (JSON.stringify(tareas) !== JSON.stringify(data)) {
                setData(tareas);
              }
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
	const datoeliminar = data[position];
	//setData(data.filter(dato=>dato!=datoeliminar));
	setData(prevData => prevData.filter(dato => dato !== datoeliminar));
}
function handleChange(e){
	setTareaup({label:e.target.value, done:false})
}

function handleKeydown(e){
	console.log(e);
    
	if(e.key=="Enter"){
        const newLabel = tareaup.label.trim();
        if (newLabel !== ""){
        setData(data.filter(dato=>dato.label!="No hay tareas"));
        setData(current=>([...current, tareaup]));
        setTareaup({label:"", done:false})}
	}
}

useEffect(() => {
    
	if(data.length==0){
		updatetask([{label:"No hay tareas", done:false}]);
    
	}else{
    updatetask(data);
    numlist();
}
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

    function ondelete(ind){
        const index = ind;
        let array = []
        for(let i=0; i<data.length; i++){
            if(i==index){
                array.push(1)
            }else{array.push(0)}   
        }
        setinVisible(array)
    };
   
    function offdelete(){
        let afuera=[]
        for(let j=0; j<data.length; j++){
            afuera.push(0)        
        }
        setinVisible(afuera);
    }
    
    function numlist(){
        let num = "";
        if (data.some((item) => item.label === "No hay tareas")) {
            num = "0 item left";
            setNumtask(num);
          } else if (data.length == 0){
            num = "0 item left";
          }
          else{
            num = `${data.length} item left`;
           
          }
          setNumtask(num);
                 
    }


	return (
		<div className="cardtask">
			<input type="text" className="inputTask" placeholder="What needs to be done?" value={tareaup.label} onChange={handleChange} onKeyDown={handleKeydown}></input>
			<ul>
				{data?.map((dato, index) => <li key={index} onMouseEnter={() =>ondelete(index)}  onMouseLeave={() => offdelete}><p>{dato.label}</p><button style={{opacity:invisible.length != 0 ? invisible[index]:0 }} onClick={()=>(handledelete(index))}>X</button></li>)}
			</ul>
            <div><p>{numTask}</p></div>
			
		</div>
	);
};

export default List;