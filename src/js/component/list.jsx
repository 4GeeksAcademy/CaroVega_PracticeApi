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
    const savedData = JSON.parse(localStorage.getItem('tareas'));
    setData(savedData || []);
	fetch(url, {
        method: 'GET', // or 'POST'
        headers:{
        'Content-Type': 'application/json',
        },
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
        'Content-Type': 'application/json',
        },
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
	setData(prevData => prevData.filter(dato => dato !== datoeliminar));
    numlist();
}
function handleChange(e){
	setTareaup({label:e.target.value, done:false});
}

function handleKeydown(e){
	    
	if(e.key=="Enter"){
        const newLabel = tareaup.label.trim();
        if (newLabel !== ""){
        setData(data.filter(dato=>dato.label!="No hay tareas"));
        setData(current=>([...current, tareaup]));
        setTareaup({label:"", done:false})}
        numlist();
	}
}

useEffect(() => {
    if (data.length === 0 || data.some((item) => item.label === "No hay tareas")) {
        updatetask([{ label: "No hay tareas", done: false }]);
  
	// if(data.length==0){
	// 	updatetask([{label:"No hay tareas", done:false}]);
    
	}else{
    updatetask(data);
    //numlist();
}
  }, [data]);

  const updatetask = (todos) =>{
	fetch(url, {
        method: 'PUT', // or 'POST'
		body:JSON.stringify(todos),
        headers:{
        'Content-Type': 'application/json',
        },
        })
        .then(res => {
            if (res.status>= 200 && res.status<=300){
                console.log("el request se hizo bien");
                return res.json();
            }else{
                console.log(`hubo un error ${res.status} en el request`)  
            }
        })
        .then(tareas => {
			console.log(tareas);
		}
         )
        .catch(error => console.error(error));
        numlist();
    };

    function ondelete(ind){
        const index = ind;
        let array = []
        if(data[index].label==="No hay tareas"){
            for(let i=0; i<data.length; i++){
                    array.push(0)
                }
        }else{        
            for(let i=0; i<data.length; i++){
                if(i==index){
                    array.push(1)
            }else{array.push(0)}   
        }}
        setinVisible(array);
        numlist();
    };
   
    function offdelete(){
        let afuera=[]
        for(let j=0; j<data.length; j++){
            afuera.push(0)        
        }
        setinVisible(afuera);
        numlist();
    }
    
    function numlist(){
        let num = "";
        if (data.some((item) => item.label === "No hay tareas")) {
            num = "0 item left";
            setNumtask(num);
          } else if(data.length ===1){
            num = "1 item left";
          }
          else{
            num = `${data.length} item left`;
           
          }
          setNumtask(num);
                 
    }

    function buttonclean(){
        
        setData([{ label: "No hay tareas", done: false }]);
        
    }


	return (
		<div className="cardtask">
			<input type="text" className="inputTask" placeholder="What needs to be done?" value={tareaup.label} onChange={handleChange} onKeyDown={handleKeydown}></input>
			<ul>
				{data?.map((dato, index) => <li key={index} onMouseEnter={() =>ondelete(index)}  onMouseLeave={() => offdelete()}><p>{dato.label}</p><button style={{opacity:invisible.length != 0 ? invisible[index]:0 }} onClick={()=>(handledelete(index))}>X</button></li>)}
			</ul>
            <div><p>{numTask}</p></div>
			<div><button className="button"onClick={()=>{buttonclean()}}>Clean tasks</button></div>
		</div>
	);
};

export default List;